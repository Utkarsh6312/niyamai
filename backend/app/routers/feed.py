"""
NiyamAI — Feed Router
Fetches RBI RSS feeds + NewsAPI and normalizes into FeedItem objects.
Responses are cached in-memory for 30 minutes to avoid hammering external APIs.
"""
import asyncio
import hashlib
import re
import time
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from typing import Optional

import httpx
from fastapi import APIRouter, Query

from app.config import get_settings

router = APIRouter(prefix="/feed", tags=["feed"])

# ─── In-memory cache (30-min TTL) ───────────────────────────────────────────
_cache: dict[str, tuple[float, list]] = {}
CACHE_TTL = 1800  # 30 minutes


def _get_cache(key: str) -> list | None:
    entry = _cache.get(key)
    if entry and (time.time() - entry[0]) < CACHE_TTL:
        return entry[1]
    return None


def _set_cache(key: str, data: list) -> None:
    _cache[key] = (time.time(), data)


def _clear_cache() -> None:
    _cache.clear()


# ─── Impact Classification ──────────────────────────────────────────────────
HIGH_KW = {
    "kyc", "aml", "penalty", "mandatory", "master direction", "framework",
    "cybersecurity", "breach", "fraud", "enforcement", "directive",
    "non-compliance", "suspension", "action required", "digital lending",
    "master circular", "systemic risk", "alert", "critical", "npa",
    "immediate effect", "provisioning", "capital adequacy", "pca",
    "prompt corrective action", "licence cancelled", "winding up",
}
MEDIUM_KW = {
    "guideline", "circular", "amendment", "clarification", "payment system",
    "revised", "regulation", "upi", "compliance", "nbfc", "notification",
    "update", "reporting", "disclosure", "threshold", "fdp", "ppi",
    "account aggregator", "liquidity", "interest rate", "lending",
}


def _classify_impact(title: str, desc: str) -> str:
    text = (title + " " + desc).lower()
    for kw in HIGH_KW:
        if kw in text:
            return "High"
    for kw in MEDIUM_KW:
        if kw in text:
            return "Medium"
    return "Low"


def _make_id(text: str) -> str:
    return hashlib.md5(text.encode("utf-8", errors="replace")).hexdigest()[:14]


def _strip_html(raw: str) -> str:
    return re.sub(r"<[^>]+>", "", raw).strip()


def _parse_date(raw: str) -> str:
    for fmt in ("%a, %d %b %Y %H:%M:%S %z", "%a, %d %b %Y %H:%M:%S GMT"):
        try:
            return datetime.strptime(raw.strip(), fmt).isoformat()
        except ValueError:
            pass
    return raw.strip() or datetime.now(timezone.utc).isoformat()


# ─── RBI RSS Feeds ──────────────────────────────────────────────────────────
RBI_FEEDS = [
    (4,  "Notifications"),
    (5,  "Press Releases"),
    (17, "Master Circulars"),
]


async def _fetch_rbi_rss(feed_id: int, category: str, client: httpx.AsyncClient) -> list[dict]:
    url = f"https://rbi.org.in/Scripts/Rss.aspx?id={feed_id}"
    try:
        resp = await client.get(
            url,
            headers={"User-Agent": "NiyamAI-Compliance/1.0"},
            timeout=15,
        )
        resp.raise_for_status()
        root = ET.fromstring(resp.content)
        items = []
        for item in root.findall(".//item")[:25]:
            title = _strip_html(item.findtext("title") or "").strip()
            link  = (item.findtext("link") or "").strip()
            desc  = _strip_html(item.findtext("description") or "")[:400]
            pub   = (item.findtext("pubDate") or "").strip()
            if not title:
                continue
            items.append({
                "id":          f"rbi-{_make_id(title + link)}",
                "title":       title,
                "summary":     desc or f"RBI {category} — {title}",
                "source":      "RBI",
                "sourceUrl":   link or "https://www.rbi.org.in",
                "publishedAt": _parse_date(pub),
                "category":    category,
                "type":        "rbi",
                "impactLevel": _classify_impact(title, desc),
                "isNew":       True,
                "isUpdated":   False,
                "imageUrl":    None,
            })
        return items
    except Exception:
        return []


async def _fetch_all_rbi() -> list[dict]:
    cached = _get_cache("rbi")
    if cached is not None:
        return cached

    async with httpx.AsyncClient(follow_redirects=True) as client:
        results = await asyncio.gather(
            *[_fetch_rbi_rss(fid, cat, client) for fid, cat in RBI_FEEDS],
            return_exceptions=True,
        )

    items: list[dict] = []
    for r in results:
        if isinstance(r, list):
            items.extend(r)

    # Dedupe by id
    seen: set[str] = set()
    unique = [i for i in items if not (i["id"] in seen or seen.add(i["id"]))]  # type: ignore
    unique.sort(key=lambda x: x["publishedAt"], reverse=True)
    _set_cache("rbi", unique)
    return unique


# ─── News Feed (NewsAPI + Fallback) ─────────────────────────────────────────
NEWS_QUERIES: dict[str, str] = {
    "Banking":      "RBI Indian banking regulation compliance",
    "FinTech":      "fintech India digital payments startup regulation",
    "Payments":     "UPI NPCI digital payments India",
    "NBFC":         "NBFC India regulation lending RBI",
    "Cybersecurity": "cybersecurity banking India RBI data breach",
}

FALLBACK_NEWS: list[dict] = [
    {
        "id": "fb-001",
        "title": "RBI Tightens Digital Lending Norms: All LSPs Must Register by December 2026",
        "summary": "The Reserve Bank of India has mandated that all Lending Service Providers operating with regulated entities must complete a fresh registration process by December 31, 2026, with enhanced disclosure requirements on fees, charges, and grievance redressal.",
        "source": "Economic Times", "sourceUrl": "https://economictimes.indiatimes.com",
        "publishedAt": "2026-09-11T06:30:00+00:00", "category": "Banking",
        "type": "news", "impactLevel": "High", "isNew": True, "isUpdated": False, "imageUrl": None,
    },
    {
        "id": "fb-002",
        "title": "UPI Crosses ₹20 Lakh Crore in Monthly Volume: NPCI August Data",
        "summary": "NPCI data shows UPI processed 14.96 billion transactions worth ₹20.64 lakh crore in August 2026, a 45% year-on-year increase. RBI has attributed growth to merchant QR adoption, credit on UPI, and cross-border expansion.",
        "source": "Mint", "sourceUrl": "https://livemint.com",
        "publishedAt": "2026-09-10T08:00:00+00:00", "category": "Payments",
        "type": "news", "impactLevel": "Medium", "isNew": True, "isUpdated": False, "imageUrl": None,
    },
    {
        "id": "fb-003",
        "title": "34 NBFCs Placed Under RBI's Enhanced Supervisory Monitoring Framework",
        "summary": "The RBI has placed 34 non-banking financial companies under its enhanced monitoring framework following concerns about asset-liability mismatches, governance gaps, and non-compliance with fair-practices codes.",
        "source": "Business Standard", "sourceUrl": "https://www.business-standard.com",
        "publishedAt": "2026-09-09T12:00:00+00:00", "category": "NBFC",
        "type": "news", "impactLevel": "High", "isNew": True, "isUpdated": False, "imageUrl": None,
    },
    {
        "id": "fb-004",
        "title": "RBI Advisory: All Scheduled Commercial Banks Must Deploy AI Fraud Detection by March 2027",
        "summary": "RBI has issued a supervisory advisory asking all scheduled commercial banks to deploy AI/ML-based fraud detection systems capable of real-time transaction monitoring, with a compliance deadline of 31 March 2027.",
        "source": "The Hindu BusinessLine", "sourceUrl": "https://www.thehindubusinessline.com",
        "publishedAt": "2026-09-08T09:15:00+00:00", "category": "Cybersecurity",
        "type": "news", "impactLevel": "High", "isNew": False, "isUpdated": True, "imageUrl": None,
    },
    {
        "id": "fb-005",
        "title": "Full PPI Interoperability Mandate: PhonePe, Paytm Must Enable Wallet-to-Bank Transfers",
        "summary": "NPCI has directed all Prepaid Payment Instrument issuers to enable full interoperability for wallet-to-bank and wallet-to-wallet transfers by January 2027, directly impacting major fintech players and requiring API infrastructure overhauls.",
        "source": "Moneycontrol", "sourceUrl": "https://www.moneycontrol.com",
        "publishedAt": "2026-09-07T14:30:00+00:00", "category": "FinTech",
        "type": "news", "impactLevel": "Medium", "isNew": False, "isUpdated": False, "imageUrl": None,
    },
    {
        "id": "fb-006",
        "title": "Ransomware Attack on Maharashtra Co-operative Bank Triggers RBI Emergency Audit",
        "summary": "Following a ransomware attack on a mid-sized urban cooperative bank, RBI has ordered an emergency IT security audit across all urban cooperative banks with assets above ₹500 crore, requiring submission of audit reports within 45 days.",
        "source": "Financial Express", "sourceUrl": "https://www.financialexpress.com",
        "publishedAt": "2026-09-06T16:00:00+00:00", "category": "Cybersecurity",
        "type": "news", "impactLevel": "High", "isNew": False, "isUpdated": True, "imageUrl": None,
    },
    {
        "id": "fb-007",
        "title": "RBI Proposes Revised LCR Norms for HFCs and NBFC-ML: Discussion Paper Released",
        "summary": "The RBI released a discussion paper proposing revised Liquidity Coverage Ratio norms for Housing Finance Companies and mid-size NBFCs, tightening buffer requirements and introducing a monthly stress-testing disclosure mandate.",
        "source": "Business Standard", "sourceUrl": "https://www.business-standard.com",
        "publishedAt": "2026-09-05T11:00:00+00:00", "category": "NBFC",
        "type": "news", "impactLevel": "Medium", "isNew": False, "isUpdated": False, "imageUrl": None,
    },
    {
        "id": "fb-008",
        "title": "Account Aggregator Ecosystem Hits 50 Million Consents Milestone",
        "summary": "India's AA framework recorded 50 million active data-sharing consents with 28 FIPs and 47 FIUs operational. RBI credits the ecosystem for transforming MSME credit assessment with cash-flow-based underwriting.",
        "source": "Mint", "sourceUrl": "https://livemint.com",
        "publishedAt": "2026-09-04T09:00:00+00:00", "category": "FinTech",
        "type": "news", "impactLevel": "Low", "isNew": False, "isUpdated": False, "imageUrl": None,
    },
    {
        "id": "fb-009",
        "title": "Credit-on-UPI Sees 300% Growth; RBI Eyes Regulation of BNPL on UPI Rail",
        "summary": "Credit card linkage on UPI crossed 12 million users in Q2 FY27, prompting RBI to examine whether Buy Now Pay Later products accessed via UPI require additional consumer-protection frameworks.",
        "source": "Economic Times", "sourceUrl": "https://economictimes.indiatimes.com",
        "publishedAt": "2026-09-03T07:45:00+00:00", "category": "Payments",
        "type": "news", "impactLevel": "Medium", "isNew": False, "isUpdated": False, "imageUrl": None,
    },
    {
        "id": "fb-010",
        "title": "RBI Grants In-Principle Approval to Three New Payment Aggregators",
        "summary": "Three fintech companies have received RBI's in-principle approval to operate as Payment Aggregators under the revised PA-PG guidelines, with a 12-month window to achieve full operational compliance.",
        "source": "The Hindu BusinessLine", "sourceUrl": "https://www.thehindubusinessline.com",
        "publishedAt": "2026-09-02T10:30:00+00:00", "category": "FinTech",
        "type": "news", "impactLevel": "Low", "isNew": False, "isUpdated": False, "imageUrl": None,
    },
]


async def _fetch_news_category(category: str, query: str, client: httpx.AsyncClient) -> list[dict]:
    settings = get_settings()
    api_key = settings.NEWS_API_KEY

    if not api_key:
        return [n for n in FALLBACK_NEWS if n["category"] == category]

    try:
        resp = await client.get(
            "https://newsapi.org/v2/everything",
            params={
                "q": query,
                "language": "en",
                "sortBy": "publishedAt",
                "pageSize": 15,
                "apiKey": api_key,
            },
            timeout=12,
        )
        resp.raise_for_status()
        data = resp.json()
        items = []
        for art in data.get("articles", []):
            title = (art.get("title") or "").strip()
            if not title or title == "[Removed]":
                continue
            items.append({
                "id":          f"news-{_make_id(title + (art.get('url') or ''))}",
                "title":       title,
                "summary":     (art.get("description") or "")[:300],
                "source":      art.get("source", {}).get("name", "News"),
                "sourceUrl":   art.get("url") or "",
                "publishedAt": art.get("publishedAt") or datetime.now(timezone.utc).isoformat(),
                "category":    category,
                "type":        "news",
                "impactLevel": _classify_impact(title, art.get("description") or ""),
                "isNew":       True,
                "isUpdated":   False,
                "imageUrl":    art.get("urlToImage"),
            })
        return items if items else [n for n in FALLBACK_NEWS if n["category"] == category]
    except Exception:
        return [n for n in FALLBACK_NEWS if n["category"] == category]


async def _fetch_all_news() -> list[dict]:
    cached = _get_cache("news")
    if cached is not None:
        return cached

    async with httpx.AsyncClient(follow_redirects=True) as client:
        results = await asyncio.gather(
            *[_fetch_news_category(cat, q, client) for cat, q in NEWS_QUERIES.items()],
            return_exceptions=True,
        )

    items: list[dict] = []
    for r in results:
        if isinstance(r, list):
            items.extend(r)

    seen: set[str] = set()
    unique = [i for i in items if not (i["id"] in seen or seen.add(i["id"]))]  # type: ignore
    unique.sort(key=lambda x: x["publishedAt"], reverse=True)
    _set_cache("news", unique)
    return unique


# ─── API Endpoints ───────────────────────────────────────────────────────────
@router.get("/rbi", summary="Fetch RBI regulatory feed (RSS)")
async def get_rbi_feed(refresh: bool = Query(False, description="Force cache refresh")):
    if refresh:
        _cache.pop("rbi", None)
    return await _fetch_all_rbi()


@router.get("/news", summary="Fetch banking & fintech news")
async def get_news_feed(
    category: Optional[str] = Query(None, description="Filter by category"),
    refresh: bool = Query(False),
):
    if refresh:
        _cache.pop("news", None)
    items = await _fetch_all_news()
    if category:
        items = [i for i in items if i["category"].lower() == category.lower()]
    return items


@router.get("/all", summary="Fetch combined RBI + news feed")
async def get_all_feed(refresh: bool = Query(False)):
    if refresh:
        _clear_cache()
    rbi, news = await asyncio.gather(_fetch_all_rbi(), _fetch_all_news())
    combined = rbi + news
    combined.sort(key=lambda x: x["publishedAt"], reverse=True)
    return combined


@router.post("/refresh", summary="Clear feed cache")
async def refresh_cache():
    _clear_cache()
    return {"status": "cache_cleared", "message": "Feed cache cleared successfully."}
