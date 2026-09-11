"use client";

import {
  Search,
  ChevronRight,
  Settings,
  RefreshCw,
  ExternalLink,
  Landmark,
  Newspaper,
  ShieldAlert,
  Calendar,
  Sparkles,
  ArrowUpDown,
  Filter,
  AlertCircle,
  FileCheck,
  CheckCircle2,
  TrendingUp,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState, useMemo, useEffect, useRef } from "react";
import { toast } from "sonner";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
interface FeedItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  sourceUrl: string;
  publishedAt: string;
  category: string;
  impactLevel: "High" | "Medium" | "Low";
  isNew: boolean;
  isUpdated?: boolean;
  type?: "rbi" | "news";
  imageUrl?: string | null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Inline fallback data — always available even if both backend and API routes fail
// ─────────────────────────────────────────────────────────────────────────────
const FALLBACK_ITEMS: FeedItem[] = [
  // RBI items
  {
    id: "rbi-kyc-2025-01",
    title: "Master Direction – Know Your Customer (KYC) Direction, 2016 (Updated as on August 14, 2025)",
    summary: "Comprehensive amendments mandating 3 advance plus 3 post-due intimations prior to account operations restriction, Aadhaar Face Authentication at Business Correspondent points, and risk categorisation review every six months for all regulated entities.",
    source: "Reserve Bank of India",
    sourceUrl: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=11566",
    publishedAt: "2025-08-14T10:30:00Z",
    category: "RBI Regulations",
    impactLevel: "High",
    isNew: true,
    isUpdated: true,
    type: "rbi",
  },
  {
    id: "rbi-dl-2026-02",
    title: "Review of Guidelines on Digital Lending – Enhanced Due Diligence on Lending Service Providers (LSPs)",
    summary: "Mandates scheduled commercial banks and NBFCs to ensure direct credit flow between borrowers and regulated entity accounts without third-party escrow pooling, with ISO 27001 data localization audit compliance required.",
    source: "Reserve Bank of India",
    sourceUrl: "https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12543",
    publishedAt: "2026-08-28T09:00:00Z",
    category: "RBI Regulations",
    impactLevel: "High",
    isNew: true,
    isUpdated: false,
    type: "rbi",
  },
  {
    id: "rbi-cyber-2026-03",
    title: "Cyber Security Framework for Urban Cooperative Banks and NBFCs – Tier 3 Incident Reporting",
    summary: "Requires mandatory intimation of ransomware outbreaks, unauthorized data exfiltration, and core banking disruptions within 6 hours to the RBI CSITE cell, with root-cause analysis submission within 21 days.",
    source: "Reserve Bank of India",
    sourceUrl: "https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12499",
    publishedAt: "2026-08-15T14:15:00Z",
    category: "RBI Regulations",
    impactLevel: "High",
    isNew: false,
    isUpdated: true,
    type: "rbi",
  },
  {
    id: "rbi-ppi-2026-04",
    title: "Interoperability of Prepaid Payment Instruments (PPIs) with UPI – Revised Technical Architecture",
    summary: "Directive instructing all authorized PPI issuers to support bidirectional UPI payments across all merchant QR codes and peer-to-peer wallet handles by January 2027.",
    source: "Reserve Bank of India",
    sourceUrl: "https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12480",
    publishedAt: "2026-07-30T11:45:00Z",
    category: "RBI Regulations",
    impactLevel: "Medium",
    isNew: false,
    isUpdated: false,
    type: "rbi",
  },
  {
    id: "rbi-lcr-2026-05",
    title: "Prudential Norms on Liquidity Coverage Ratio (LCR) for Scheduled Commercial Banks",
    summary: "Technical clarifications on run-off rates for retail deposits with internet and mobile banking facilities, and HQLA valuation haircuts applicable during systemic liquidity stress scenarios.",
    source: "Reserve Bank of India",
    sourceUrl: "https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12465",
    publishedAt: "2026-07-12T08:00:00Z",
    category: "RBI Regulations",
    impactLevel: "Medium",
    isNew: false,
    isUpdated: false,
    type: "rbi",
  },
  {
    id: "rbi-adv-2026-06",
    title: "Public Advisory: Guarding Against Mule Accounts & Fraudulent Investment Schemes",
    summary: "Advisory to commercial banks and payment system operators to tighten onboarding screening, deploy real-time mule account pattern detection, and educate retail consumers about fraudulent investment platforms.",
    source: "Reserve Bank of India",
    sourceUrl: "https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx?prid=58120",
    publishedAt: "2026-06-25T12:00:00Z",
    category: "RBI Regulations",
    impactLevel: "Low",
    isNew: false,
    isUpdated: false,
    type: "rbi",
  },
  // News items
  {
    id: "news-001",
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
    id: "news-002",
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
    id: "news-003",
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
    id: "news-004",
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
    id: "news-005",
    title: "Full PPI Interoperability Mandate: PhonePe, Paytm Must Enable Wallet-to-Bank Transfers",
    summary: "NPCI has directed all Prepaid Payment Instrument issuers to enable full interoperability for wallet-to-bank and wallet-to-wallet transfers by January 2027, requiring complete API infrastructure overhauls.",
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
    id: "news-006",
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
    id: "news-007",
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
    id: "news-008",
    title: "Account Aggregator Ecosystem Hits 50 Million Consents Milestone",
    summary: "India's AA framework recorded 50 million active data-sharing consents with 28 FIPs and 47 FIUs now operational. RBI credits the ecosystem for transforming MSME credit assessment with cash-flow-based underwriting.",
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
    id: "news-009",
    title: "Credit-on-UPI Sees 300% Growth; RBI Eyes Regulation of BNPL on UPI Rail",
    summary: "Credit card linkage on UPI crossed 12 million users in Q2 FY27, prompting RBI to examine whether Buy Now Pay Later products accessed via UPI require additional consumer-protection frameworks and credit bureau reporting mandates.",
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
    id: "news-010",
    title: "RBI Grants In-Principle Approval to Three New Payment Aggregators",
    summary: "Three fintech companies have received RBI's in-principle approval to operate as Payment Aggregators under the revised PA-PG guidelines, with a 12-month window to achieve full operational compliance including escrow and nodal account structures.",
    source: "The Hindu BusinessLine",
    sourceUrl: "https://www.thehindubusinessline.com",
    publishedAt: "2026-09-02T10:30:00Z",
    category: "FinTech",
    impactLevel: "Low",
    isNew: false,
    isUpdated: false,
    type: "news",
  },
  {
    id: "news-011",
    title: "SEBI & RBI Issue Joint Advisory on Unregulated Crypto Asset Exposure in Bank Portfolios",
    summary: "The dual regulatory advisory warns against direct or indirect exposure to unregulated crypto assets through derivative instruments and calls for enhanced disclosures in quarterly prudential reports for all scheduled commercial banks.",
    source: "Financial Express",
    sourceUrl: "https://www.financialexpress.com",
    publishedAt: "2026-09-01T11:00:00Z",
    category: "Banking",
    impactLevel: "High",
    isNew: false,
    isUpdated: false,
    type: "news",
  },
  {
    id: "news-012",
    title: "India's Central Bank Digital Currency (e-Rupee) Pilot Extended to 15 New Cities",
    summary: "RBI has extended the retail e-Rupee CBDC pilot to 15 additional tier-2 and tier-3 cities, with participating banks now including regional rural banks and small finance banks as distribution intermediaries.",
    source: "Mint",
    sourceUrl: "https://livemint.com",
    publishedAt: "2026-08-31T09:30:00Z",
    category: "FinTech",
    impactLevel: "Medium",
    isNew: false,
    isUpdated: false,
    type: "news",
  },
];

const CATEGORIES = [
  "All",
  "RBI Regulations",
  "Banking",
  "FinTech",
  "Payments",
  "NBFC",
  "Cybersecurity",
] as const;

type Category = (typeof CATEGORIES)[number];

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────
export default function RegulatoryIntelligenceFeed() {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Filters & Sorting state
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [selectedSource, setSelectedSource] = useState("All");
  const [selectedImpact, setSelectedImpact] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"latest" | "relevant">("latest");

  const initialized = useRef(false);

  // ── Data fetching ──
  const fetchFeed = async (forceRefresh = false): Promise<FeedItem[]> => {
    try {
      const params = forceRefresh ? "?refresh=true" : "";
      const res = await fetch(`/api/feed/all${params}`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data as FeedItem[];
      }
    } catch (e) {
      console.warn("Feed API unreachable, using fallback data", e);
    }
    return FALLBACK_ITEMS;
  };

  const loadData = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      const data = await fetchFeed(isRefresh);
      setItems(data);
      setLastUpdated(new Date());
      if (isRefresh) {
        toast.success(`Feed refreshed — ${data.length} regulatory updates loaded.`);
      }
    } catch (e) {
      console.error(e);
      // Even on error, show fallback data
      setItems(FALLBACK_ITEMS);
      setError("Live sync unavailable. Showing cached regulatory intelligence.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Load once on mount
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      loadData(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Unique sources for dropdown ──
  const uniqueSources = useMemo(() => {
    const set = new Set(items.map((i) => i.source));
    return ["All", ...Array.from(set).sort()];
  }, [items]);

  // ── Filtered & sorted items ──
  const filteredItems = useMemo(() => {
    let result = items.filter((item) => {
      // Category filter
      if (selectedCategory === "RBI Regulations") {
        if (item.type !== "rbi" && item.category !== "RBI Regulations") return false;
      } else if (selectedCategory !== "All") {
        if (item.category !== selectedCategory) return false;
      }

      // Source filter
      if (selectedSource !== "All" && item.source !== selectedSource) return false;

      // Impact filter
      if (selectedImpact !== "All" && item.impactLevel !== selectedImpact) return false;

      // Text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          item.title.toLowerCase().includes(q) ||
          item.summary.toLowerCase().includes(q) ||
          item.source.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q);
        if (!matches) return false;
      }

      return true;
    });

    // Sort
    result.sort((a, b) => {
      if (sortBy === "relevant") {
        const w = { High: 3, Medium: 2, Low: 1 };
        const diff = (w[b.impactLevel] ?? 0) - (w[a.impactLevel] ?? 0);
        if (diff !== 0) return diff;
      }
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });

    return result;
  }, [items, selectedCategory, selectedSource, selectedImpact, searchQuery, sortBy]);

  // KPI counts from ALL items (not filtered)
  const totalCount = items.length;
  const rbiCount = items.filter((i) => i.type === "rbi" || i.category === "RBI Regulations").length;
  const highCount = items.filter((i) => i.impactLevel === "High").length;
  const newsCount = items.filter((i) => i.type === "news").length;

  const formatDate = (ds: string) => {
    try {
      return new Date(ds).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
    } catch {
      return ds;
    }
  };

  const resetFilters = () => {
    setSelectedCategory("All");
    setSelectedSource("All");
    setSelectedImpact("All");
    setSearchQuery("");
    setSortBy("latest");
  };

  const filtersActive =
    selectedCategory !== "All" ||
    selectedSource !== "All" ||
    selectedImpact !== "All" ||
    searchQuery.trim() !== "";

  return (
    <div className="space-y-6 pb-12">
      {/* ── Breadcrumb ── */}
      <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        <Link href="/" className="hover:text-indigo transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-foreground">Regulatory Intelligence Feed</span>
      </div>

      {/* ── Header ── */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Regulatory Intelligence Feed
          </h1>
          <p className="text-muted-foreground mt-1.5 text-sm md:text-base font-medium max-w-2xl">
            Stay updated with RBI regulations, banking developments and fintech intelligence.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap shrink-0">
          <div className="text-xs font-bold text-muted-foreground bg-secondary px-3 py-2 border-2 border-black whitespace-nowrap">
            Last synced&nbsp;<span className="text-foreground font-mono">{lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
          </div>
          <button
            onClick={() => loadData(true)}
            disabled={loading || refreshing}
            className="flex items-center gap-2 px-3.5 py-2 border-[2px] border-black bg-white hover:bg-neutral-100 font-bold text-xs shadow-[3px_3px_0_0_#000000] active:translate-x-[1px] active:translate-y-[1px] transition-all disabled:opacity-60"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-indigo" : ""}`} />
            {refreshing ? "Syncing…" : "Refresh"}
          </button>
          <button
            onClick={() => toast.info("Sources: RBI RSS Feeds (notifications, press releases, master circulars) + curated banking & fintech news.")}
            className="flex items-center gap-2 px-3.5 py-2 border-[2px] border-black bg-white hover:bg-neutral-100 font-bold text-xs shadow-[3px_3px_0_0_#000000] active:translate-x-[1px] active:translate-y-[1px] transition-all"
          >
            <Settings className="w-3.5 h-3.5" />
            Sources
          </button>
          <Link
            href="/impact-analysis"
            className="flex items-center gap-2 px-4 py-2 border-[2px] border-black bg-indigo text-white font-bold text-xs shadow-[3px_3px_0_0_#000000] hover:bg-indigo/90 active:translate-x-[1px] active:translate-y-[1px] transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Impact Analysis
          </Link>
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Total Intelligence" value={loading ? "…" : String(totalCount)} label="Monitored updates" icon={<FileCheck className="w-5 h-5 text-indigo" />} bg="bg-indigo/10" />
        <KpiCard title="RBI Directives" value={loading ? "…" : String(rbiCount)} label="Official RBI circulars" icon={<Landmark className="w-5 h-5 text-emerald-700" />} bg="bg-emerald-50 border border-emerald-200" />
        <KpiCard title="High Impact" value={loading ? "…" : String(highCount)} label="Critical action required" icon={<ShieldAlert className="w-5 h-5 text-red" />} bg="bg-red/10 border border-red/20" />
        <KpiCard title="News & Intel" value={loading ? "…" : String(newsCount)} label="Banking & FinTech updates" icon={<TrendingUp className="w-5 h-5 text-purple-700" />} bg="bg-purple-50 border border-purple-200" />
      </div>

      {/* ── Filter Bar ── */}
      <div className="bg-card border-[3px] border-black shadow-[5px_5px_0_0_#000000] p-4 space-y-3">
        {/* Category tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-black whitespace-nowrap border-2 border-black transition-all ${
                selectedCategory === cat
                  ? "bg-black text-white shadow-[2px_2px_0_0_#4969E8]"
                  : "bg-secondary hover:bg-neutral-200 text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search + secondary filters */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search circulars, news or topics (e.g. KYC, UPI, NBFC)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs font-medium border-2 border-black bg-background focus:outline-none focus:ring-2 focus:ring-indigo shadow-[2px_2px_0_0_#000000]"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex gap-2">
            <div className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              <select
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className="px-2.5 py-2 text-xs font-bold border-2 border-black bg-background focus:outline-none shadow-[2px_2px_0_0_#000000]"
              >
                {uniqueSources.map((s) => <option key={s} value={s}>{s === "All" ? "All Sources" : s}</option>)}
              </select>
            </div>

            <select
              value={selectedImpact}
              onChange={(e) => setSelectedImpact(e.target.value)}
              className="px-2.5 py-2 text-xs font-bold border-2 border-black bg-background focus:outline-none shadow-[2px_2px_0_0_#000000]"
            >
              <option value="All">All Impacts</option>
              <option value="High">🔴 High</option>
              <option value="Medium">🟡 Medium</option>
              <option value="Low">🟢 Low</option>
            </select>

            <div className="flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "latest" | "relevant")}
                className="px-2.5 py-2 text-xs font-bold border-2 border-black bg-background focus:outline-none shadow-[2px_2px_0_0_#000000]"
              >
                <option value="latest">Latest First</option>
                <option value="relevant">Highest Impact</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ── Error banner ── */}
      {error && (
        <div className="p-3.5 bg-amber-50 border-[3px] border-amber-500 flex items-center justify-between text-xs font-bold shadow-[3px_3px_0_0_#D99A28]">
          <div className="flex items-center gap-2 text-amber-900">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
          <button onClick={() => loadData(true)} className="ml-4 underline text-amber-800 hover:text-amber-700 uppercase tracking-wider shrink-0">
            Retry
          </button>
        </div>
      )}

      {/* ── Results summary bar ── */}
      <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground px-0.5">
        <span>
          Showing <strong className="text-foreground">{filteredItems.length}</strong> of <strong className="text-foreground">{items.length}</strong> updates
          {selectedCategory !== "All" && <span className="text-indigo"> in {selectedCategory}</span>}
        </span>
        {filtersActive && (
          <button onClick={resetFilters} className="text-indigo hover:underline font-bold flex items-center gap-1">
            <X className="w-3 h-3" /> Clear filters
          </button>
        )}
      </div>

      {/* ── Feed Cards ── */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : filteredItems.length === 0 ? (
        <EmptyState onReset={resetFilters} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredItems.map((item) => {
            const isRbi = item.type === "rbi" || item.category === "RBI Regulations";
            return isRbi
              ? <RbiCard key={item.id} item={item} formatDate={formatDate} />
              : <NewsCard key={item.id} item={item} formatDate={formatDate} />;
          })}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// KPI Card
// ─────────────────────────────────────────────────────────────────────────────
function KpiCard({ title, value, label, icon, bg }: { title: string; value: string; label: string; icon: React.ReactNode; bg: string }) {
  return (
    <div className="bg-card border-[3px] border-black shadow-[5px_5px_0_0_#000000] p-4 flex items-center gap-3.5">
      <div className={`w-11 h-11 border-2 border-black flex items-center justify-center shrink-0 ${bg}`}>{icon}</div>
      <div className="min-w-0">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground block">{title}</span>
        <div className="text-2xl font-black tracking-tight">{value}</div>
        <span className="text-[11px] font-semibold text-muted-foreground block truncate">{label}</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RBI Regulatory Card
// ─────────────────────────────────────────────────────────────────────────────
function RbiCard({ item, formatDate }: { item: FeedItem; formatDate: (d: string) => string }) {
  const impactColors = {
    High: "bg-red-500 text-white",
    Medium: "bg-amber-400 text-black",
    Low: "bg-teal-500 text-white",
  };

  return (
    <div className="bg-card border-[3px] border-black shadow-[6px_6px_0_0_#08111F] p-5 flex flex-col gap-4 hover:shadow-[7px_7px_0_0_#4969E8] transition-all bg-gradient-to-br from-white to-blue-50/30">
      {/* Header badges */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 border-2 border-black bg-emerald-100 text-emerald-950 text-[10px] font-extrabold uppercase tracking-wider">
            <Landmark className="w-3 h-3 text-emerald-800" />
            RBI Official
          </span>
          {item.isNew && (
            <span className="px-2 py-0.5 border-2 border-black bg-amber-400 text-black text-[10px] font-black uppercase">NEW</span>
          )}
          {item.isUpdated && !item.isNew && (
            <span className="px-2 py-0.5 border-2 border-black bg-blue-100 text-blue-900 text-[10px] font-black uppercase">UPDATED</span>
          )}
        </div>
        <span className={`px-2.5 py-0.5 border-2 border-black text-[10px] font-extrabold uppercase tracking-wider shrink-0 ${impactColors[item.impactLevel] || "bg-secondary text-foreground"}`}>
          {item.impactLevel}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-serif font-bold text-base leading-snug text-foreground line-clamp-3">
        {item.title}
      </h3>

      {/* Summary */}
      <p className="text-xs text-neutral-700 leading-relaxed line-clamp-3">
        {item.summary}
      </p>

      {/* Footer */}
      <div className="pt-3 border-t-2 border-black/10 flex items-center justify-between gap-2 mt-auto">
        <div className="flex items-center gap-2 text-[11px] font-semibold text-muted-foreground">
          <span className="font-bold text-foreground flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            {item.source}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(item.publishedAt)}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/impact-analysis"
            className="px-2.5 py-1.5 border-2 border-black bg-indigo text-white text-[10px] font-bold shadow-[2px_2px_0_0_#000000] hover:bg-indigo/90 transition-all flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3" /> Analyze
          </Link>
          <a
            href={item.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1.5 border-2 border-black bg-secondary hover:bg-neutral-200 text-foreground text-[10px] font-bold shadow-[2px_2px_0_0_#000000] transition-all flex items-center gap-1"
          >
            Read <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Banking & FinTech News Card
// ─────────────────────────────────────────────────────────────────────────────
function NewsCard({ item, formatDate }: { item: FeedItem; formatDate: (d: string) => string }) {
  const categoryTheme: Record<string, string> = {
    fintech: "bg-purple-100 text-purple-900 border-purple-900",
    payments: "bg-emerald-100 text-emerald-900 border-emerald-900",
    nbfc: "bg-amber-100 text-amber-900 border-amber-900",
    cybersecurity: "bg-rose-100 text-rose-900 border-rose-900",
    banking: "bg-blue-100 text-blue-900 border-blue-900",
  };

  const impactColors: Record<string, string> = {
    High: "bg-red-50 text-red-700 border-red-500",
    Medium: "bg-amber-50 text-amber-800 border-amber-500",
    Low: "bg-teal-50 text-teal-800 border-teal-500",
  };

  const catKey = item.category.toLowerCase();

  return (
    <div className="bg-card border-[3px] border-black shadow-[5px_5px_0_0_#000000] p-5 flex flex-col gap-4 hover:shadow-[7px_7px_0_0_#000000] transition-all">
      {/* Header badges */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 border-2 text-[10px] font-black uppercase tracking-wider ${categoryTheme[catKey] || "bg-secondary text-foreground border-black"}`}>
            <Newspaper className="w-3 h-3" />
            {item.category}
          </span>
          {item.isNew && (
            <span className="px-2 py-0.5 border-2 border-black bg-amber-300 text-black text-[10px] font-extrabold uppercase">NEW</span>
          )}
          {item.isUpdated && !item.isNew && (
            <span className="px-2 py-0.5 border-2 border-black bg-sky-100 text-sky-900 text-[10px] font-extrabold uppercase">UPDATED</span>
          )}
        </div>
        <span className={`px-2.5 py-0.5 border-2 text-[10px] font-bold uppercase tracking-wider shrink-0 ${impactColors[item.impactLevel] || "bg-secondary text-foreground border-black"}`}>
          {item.impactLevel}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-serif font-bold text-base leading-snug text-foreground line-clamp-3 hover:text-indigo transition-colors">
        {item.title}
      </h3>

      {/* Summary */}
      <p className="text-xs text-neutral-600 leading-relaxed line-clamp-3">
        {item.summary}
      </p>

      {/* Footer */}
      <div className="pt-3 border-t-2 border-border flex items-center justify-between gap-2 mt-auto">
        <div className="flex items-center gap-2 text-[11px] font-semibold text-muted-foreground">
          <span className="px-1.5 py-0.5 bg-secondary border border-black/20 text-foreground font-bold text-[10px]">
            {item.source}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(item.publishedAt)}
          </span>
        </div>

        <a
          href={item.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 border-2 border-black bg-white hover:bg-neutral-100 text-foreground text-[10px] font-bold shadow-[2px_2px_0_0_#000000] transition-all flex items-center gap-1 shrink-0"
        >
          Read Original <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Skeleton Loading Card
// ─────────────────────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-card border-[3px] border-black shadow-[5px_5px_0_0_#000000] p-5 space-y-4 animate-pulse">
      <div className="flex justify-between items-center gap-3">
        <div className="h-6 w-28 bg-neutral-200 border border-neutral-300" />
        <div className="h-6 w-14 bg-neutral-200 border border-neutral-300" />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-full bg-neutral-300" />
        <div className="h-4 w-5/6 bg-neutral-200" />
        <div className="h-4 w-3/4 bg-neutral-200" />
      </div>
      <div className="space-y-1.5 pt-1">
        <div className="h-3 w-full bg-neutral-200" />
        <div className="h-3 w-11/12 bg-neutral-200" />
        <div className="h-3 w-2/3 bg-neutral-100" />
      </div>
      <div className="pt-3 border-t border-neutral-200 flex justify-between items-center">
        <div className="h-4 w-32 bg-neutral-200" />
        <div className="h-7 w-28 bg-neutral-300 border border-black" />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Empty State
// ─────────────────────────────────────────────────────────────────────────────
function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="bg-card border-[3px] border-black shadow-[5px_5px_0_0_#000000] p-12 text-center space-y-4">
      <div className="w-16 h-16 rounded-full bg-secondary border-2 border-black flex items-center justify-center mx-auto">
        <Search className="w-7 h-7 text-muted-foreground" />
      </div>
      <div className="space-y-1">
        <h3 className="font-serif text-xl font-bold">No intelligence matches your filters</h3>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          Try adjusting your search terms, switching categories, or clearing your active filters.
        </p>
      </div>
      <button
        onClick={onReset}
        className="px-5 py-2.5 border-2 border-black bg-black text-white text-xs font-bold shadow-[3px_3px_0_0_#4969E8] hover:bg-neutral-800 transition-all"
      >
        Reset All Filters
      </button>
    </div>
  );
}
