import { NextResponse } from "next/server";

const BACKEND = process.env.BACKEND_URL || "http://localhost:8000/api";

const FALLBACK_NEWS = [
  {
    id: "news-fb-001",
    title: "RBI Tightens Digital Lending Norms: All LSPs Must Register by December 2026",
    summary: "The Reserve Bank of India has mandated that all Lending Service Providers operating with regulated entities must complete a fresh registration process by December 31, 2026, with enhanced disclosure requirements on fees and grievance redressal.",
    source: "Economic Times",
    sourceUrl: "https://economictimes.indiatimes.com",
    publishedAt: "2026-09-11T06:30:00Z",
    category: "Banking",
    impactLevel: "High",
    isNew: true,
    isUpdated: false,
    type: "news",
  },
  {
    id: "news-fb-002",
    title: "UPI Crosses ₹20 Lakh Crore in Monthly Volume: NPCI August Data",
    summary: "NPCI data shows UPI processed 14.96 billion transactions worth ₹20.64 lakh crore in August 2026, a 45% year-on-year increase. RBI attributed growth to merchant QR adoption, credit on UPI, and international corridor expansion.",
    source: "Mint",
    sourceUrl: "https://livemint.com",
    publishedAt: "2026-09-10T08:00:00Z",
    category: "Payments",
    impactLevel: "Medium",
    isNew: true,
    isUpdated: false,
    type: "news",
  },
  {
    id: "news-fb-003",
    title: "34 NBFCs Placed Under RBI's Enhanced Supervisory Monitoring Framework",
    summary: "The RBI has placed 34 non-banking financial companies under its enhanced monitoring framework following concerns about asset-liability mismatches, governance gaps, and non-compliance with fair-practices codes.",
    source: "Business Standard",
    sourceUrl: "https://www.business-standard.com",
    publishedAt: "2026-09-09T12:00:00Z",
    category: "NBFC",
    impactLevel: "High",
    isNew: true,
    isUpdated: false,
    type: "news",
  },
  {
    id: "news-fb-004",
    title: "RBI Advisory: All Scheduled Commercial Banks Must Deploy AI Fraud Detection by March 2027",
    summary: "RBI has issued a supervisory advisory asking all scheduled commercial banks to deploy AI/ML-based fraud detection systems capable of real-time transaction monitoring, with a strict compliance deadline of 31 March 2027.",
    source: "The Hindu BusinessLine",
    sourceUrl: "https://www.thehindubusinessline.com",
    publishedAt: "2026-09-08T09:15:00Z",
    category: "Cybersecurity",
    impactLevel: "High",
    isNew: false,
    isUpdated: true,
    type: "news",
  },
  {
    id: "news-fb-005",
    title: "Full PPI Interoperability Mandate: PhonePe, Paytm Must Enable Wallet-to-Bank Transfers",
    summary: "NPCI has directed all Prepaid Payment Instrument issuers to enable full interoperability for wallet-to-bank and wallet-to-wallet transfers by January 2027, requiring API infrastructure overhauls.",
    source: "Moneycontrol",
    sourceUrl: "https://www.moneycontrol.com",
    publishedAt: "2026-09-07T14:30:00Z",
    category: "FinTech",
    impactLevel: "Medium",
    isNew: false,
    isUpdated: false,
    type: "news",
  },
  {
    id: "news-fb-006",
    title: "Ransomware Attack on Co-operative Bank Triggers RBI Emergency IT Audit",
    summary: "Following a ransomware attack on an urban cooperative bank, RBI has ordered emergency IT security audits across all institutions with assets above ₹500 crore, requiring submission of audit reports within 45 days.",
    source: "Financial Express",
    sourceUrl: "https://www.financialexpress.com",
    publishedAt: "2026-09-06T16:00:00Z",
    category: "Cybersecurity",
    impactLevel: "High",
    isNew: false,
    isUpdated: true,
    type: "news",
  },
  {
    id: "news-fb-007",
    title: "RBI Proposes Revised LCR Norms for HFCs and NBFC-ML: Discussion Paper Released",
    summary: "The RBI released a discussion paper proposing revised Liquidity Coverage Ratio norms for Housing Finance Companies and mid-size NBFCs, tightening buffer requirements and introducing monthly stress-testing disclosures.",
    source: "Business Standard",
    sourceUrl: "https://www.business-standard.com",
    publishedAt: "2026-09-05T11:00:00Z",
    category: "NBFC",
    impactLevel: "Medium",
    isNew: false,
    isUpdated: false,
    type: "news",
  },
  {
    id: "news-fb-008",
    title: "Account Aggregator Ecosystem Hits 50 Million Consents Milestone",
    summary: "India's AA framework recorded 50 million active data-sharing consents with 28 FIPs and 47 FIUs operational. RBI credits the ecosystem for transforming MSME credit assessment with cash-flow-based underwriting.",
    source: "Mint",
    sourceUrl: "https://livemint.com",
    publishedAt: "2026-09-04T09:00:00Z",
    category: "FinTech",
    impactLevel: "Low",
    isNew: false,
    isUpdated: false,
    type: "news",
  },
  {
    id: "news-fb-009",
    title: "Credit-on-UPI Sees 300% Growth; RBI Eyes Regulation of BNPL on UPI Rail",
    summary: "Credit card linkage on UPI crossed 12 million users in Q2 FY27, prompting RBI to examine whether Buy Now Pay Later products accessed via UPI require additional consumer-protection frameworks.",
    source: "Economic Times",
    sourceUrl: "https://economictimes.indiatimes.com",
    publishedAt: "2026-09-03T07:45:00Z",
    category: "Payments",
    impactLevel: "Medium",
    isNew: false,
    isUpdated: false,
    type: "news",
  },
  {
    id: "news-fb-010",
    title: "RBI Grants In-Principle Approval to Three New Payment Aggregators",
    summary: "Three fintech companies have received RBI's in-principle approval to operate as Payment Aggregators under the revised PA-PG guidelines, with a 12-month window to achieve full operational compliance.",
    source: "The Hindu BusinessLine",
    sourceUrl: "https://www.thehindubusinessline.com",
    publishedAt: "2026-09-02T10:30:00Z",
    category: "FinTech",
    impactLevel: "Low",
    isNew: false,
    isUpdated: false,
    type: "news",
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const refresh = searchParams.get("refresh") === "true";
  const category = searchParams.get("category");

  try {
    const params = new URLSearchParams();
    if (refresh) params.set("refresh", "true");
    if (category) params.set("category", category);

    const res = await fetch(`${BACKEND}/feed/news?${params.toString()}`, {
      next: { revalidate: refresh ? 0 : 1800 },
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return NextResponse.json(data, {
          headers: { "Cache-Control": "public, max-age=1800, stale-while-revalidate=300" },
        });
      }
    }
  } catch {
    // Backend offline, fallback below
  }

  let results = FALLBACK_NEWS;
  if (category && category.toLowerCase() !== "all") {
    results = results.filter(
      (item) => item.category.toLowerCase() === category.toLowerCase()
    );
  }

  return NextResponse.json(results, {
    headers: { "Cache-Control": "public, max-age=60" },
  });
}
