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
} from "lucide-react";
import Link from "next/link";
import { useState, useMemo, useEffect, useCallback } from "react";
import { toast } from "sonner";

import type { FeedItem, FeedCategory } from "@/services/types";
import { fetchRbiFeed } from "@/services/regulatoryFeed";
import { fetchNewsFeed, fetchAllFeeds } from "@/services/newsFeed";

const CATEGORIES: FeedCategory[] = [
  "All",
  "RBI Regulations",
  "Banking",
  "FinTech",
  "Payments",
  "NBFC",
  "Cybersecurity",
];

export default function RegulatoryIntelligenceFeed() {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filters & Sorting state
  const [selectedCategory, setSelectedCategory] = useState<FeedCategory>("All");
  const [selectedSource, setSelectedSource] = useState<string>("All");
  const [selectedImpact, setSelectedImpact] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"latest" | "relevant">("latest");
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Load feed items via service functions
  const loadFeed = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      let data: FeedItem[] = [];
      if (selectedCategory === "RBI Regulations") {
        data = await fetchRbiFeed(isRefresh);
      } else if (selectedCategory === "All") {
        data = await fetchAllFeeds(isRefresh);
      } else {
        data = await fetchNewsFeed(selectedCategory, isRefresh);
      }

      setItems(data);
      setLastUpdated(new Date());
      if (isRefresh) {
        toast.success("Feed refreshed with the latest regulatory updates and intelligence.");
      }
    } catch (err: any) {
      console.error("Failed to load feed", err);
      setError("Unable to retrieve real-time regulatory feeds. Displaying cached records.");
      toast.error("Could not sync latest feed updates");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    loadFeed(false);
  }, [loadFeed]);

  // Unique sources for dropdown
  const uniqueSources = useMemo(() => {
    const set = new Set(items.map((i) => i.source));
    return ["All", ...Array.from(set)];
  }, [items]);

  // Filtered and sorted items
  const filteredItems = useMemo(() => {
    let result = items.filter((item) => {
      // Category filter (when in All, items are already mixed; when on a specific tab, category must match)
      if (selectedCategory !== "All") {
        if (selectedCategory === "RBI Regulations") {
          if (item.type !== "rbi" && item.category !== "RBI Regulations") return false;
        } else {
          if (item.category.toLowerCase() !== selectedCategory.toLowerCase()) return false;
        }
      }

      // Source filter
      if (selectedSource !== "All" && item.source !== selectedSource) {
        return false;
      }

      // Impact filter
      if (selectedImpact !== "All" && item.impactLevel !== selectedImpact) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(query);
        const matchSummary = item.summary.toLowerCase().includes(query);
        const matchSource = item.source.toLowerCase().includes(query);
        const matchCategory = item.category.toLowerCase().includes(query);
        if (!matchTitle && !matchSummary && !matchSource && !matchCategory) {
          return false;
        }
      }

      return true;
    });

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "relevant") {
        const impactWeight = { High: 3, Medium: 2, Low: 1 };
        const weightDiff = (impactWeight[b.impactLevel] || 0) - (impactWeight[a.impactLevel] || 0);
        if (weightDiff !== 0) return weightDiff;
      }
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });

    return result;
  }, [items, selectedCategory, selectedSource, selectedImpact, searchQuery, sortBy]);

  // Dynamic KPI counts
  const totalCount = items.length;
  const rbiCount = items.filter((i) => i.type === "rbi" || i.category === "RBI Regulations").length;
  const highImpactCount = items.filter((i) => i.impactLevel === "High").length;
  const newsCount = items.filter((i) => i.type === "news" || i.category !== "RBI Regulations").length;

  const formatLastUpdated = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const resetFilters = () => {
    setSelectedCategory("All");
    setSelectedSource("All");
    setSelectedImpact("All");
    setSearchQuery("");
    setSortBy("latest");
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Breadcrumb & Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          <Link href="/" className="hover:text-indigo transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground">Regulatory Intelligence Feed</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              Regulatory Intelligence Feed
            </h1>
            <p className="text-muted-foreground mt-1 text-sm md:text-base font-medium">
              Stay updated with RBI regulations, banking developments and fintech intelligence.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="text-xs font-bold text-muted-foreground bg-secondary px-3 py-1.5 border-2 border-black">
              Sync: <span className="text-foreground font-mono">{formatLastUpdated(lastUpdated)}</span>
            </div>

            <button
              onClick={() => loadFeed(true)}
              disabled={loading || refreshing}
              className="flex items-center gap-2 px-3.5 py-2 border-[2px] border-black bg-white hover:bg-neutral-100 text-foreground font-bold text-xs shadow-[3px_3px_0_0_#000000] active:translate-x-[1px] active:translate-y-[1px] transition-all disabled:opacity-60"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-indigo" : ""}`} />
              {refreshing ? "Refreshing…" : "Refresh"}
            </button>

            <button
              onClick={() => toast.info("Source preferences are configured for RBI RSS Feeds and Curated Banking Streams.")}
              className="flex items-center gap-2 px-3.5 py-2 border-[2px] border-black bg-white hover:bg-neutral-100 text-foreground font-bold text-xs shadow-[3px_3px_0_0_#000000] active:translate-x-[1px] active:translate-y-[1px] transition-all"
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

        {/* Metric KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total Intelligence"
            value={loading ? "…" : String(totalCount)}
            label="Monitored regulatory feeds"
            icon={<FileCheck className="w-5 h-5 text-indigo" />}
            colorBg="bg-indigo/10"
          />
          <MetricCard
            title="RBI Directives"
            value={loading ? "…" : String(rbiCount)}
            label="Master directions & circulars"
            icon={<Landmark className="w-5 h-5 text-emerald-700" />}
            colorBg="bg-emerald-50 border border-emerald-200"
          />
          <MetricCard
            title="High Impact Alerts"
            value={loading ? "…" : String(highImpactCount)}
            label="Critical compliance action"
            icon={<ShieldAlert className="w-5 h-5 text-red" />}
            colorBg="bg-red/10 border border-red/20"
          />
          <MetricCard
            title="Banking & FinTech"
            value={loading ? "…" : String(newsCount)}
            label="Sector news & policy intel"
            icon={<TrendingUp className="w-5 h-5 text-purple-700" />}
            colorBg="bg-purple-50 border border-purple-200"
          />
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-card border-[3px] border-black shadow-[5px_5px_0_0_#000000] p-4 space-y-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-bold whitespace-nowrap transition-all border-2 border-black ${
                  isActive
                    ? "bg-black text-white shadow-[2px_2px_0_0_#4969E8]"
                    : "bg-secondary hover:bg-neutral-200 text-foreground"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search and Secondary Filter Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-3 items-center">
          {/* Search bar */}
          <div className="md:col-span-5 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search circulars, keywords, or topics (e.g. KYC, UPI, LCR)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs font-medium border-2 border-black bg-background focus:outline-none focus:ring-2 focus:ring-indigo shadow-[2px_2px_0_0_#000000]"
            />
          </div>

          {/* Source filter */}
          <div className="md:col-span-3 flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className="w-full px-2.5 py-2 text-xs font-bold border-2 border-black bg-background text-foreground focus:outline-none shadow-[2px_2px_0_0_#000000]"
            >
              <option value="All">All Sources</option>
              {uniqueSources
                .filter((s) => s !== "All")
                .map((src) => (
                  <option key={src} value={src}>
                    {src}
                  </option>
                ))}
            </select>
          </div>

          {/* Impact filter */}
          <div className="md:col-span-2">
            <select
              value={selectedImpact}
              onChange={(e) => setSelectedImpact(e.target.value)}
              className="w-full px-2.5 py-2 text-xs font-bold border-2 border-black bg-background text-foreground focus:outline-none shadow-[2px_2px_0_0_#000000]"
            >
              <option value="All">All Impacts</option>
              <option value="High">High Impact</option>
              <option value="Medium">Medium Impact</option>
              <option value="Low">Low Impact</option>
            </select>
          </div>

          {/* Sorting */}
          <div className="md:col-span-2 flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "latest" | "relevant")}
              className="w-full px-2.5 py-2 text-xs font-bold border-2 border-black bg-background text-foreground focus:outline-none shadow-[2px_2px_0_0_#000000]"
            >
              <option value="latest">Latest First</option>
              <option value="relevant">Highest Impact</option>
            </select>
          </div>
        </div>
      </div>

      {/* Error Notice if any */}
      {error && (
        <div className="p-4 bg-amber-50 border-[3px] border-amber-500 flex items-center justify-between text-amber-900 text-xs font-bold shadow-[4px_4px_0_0_#D99A28]">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={() => loadFeed(true)}
            className="underline hover:text-amber-800 font-extrabold ml-4 uppercase tracking-wider"
          >
            Retry Sync
          </button>
        </div>
      )}

      {/* Active Results Summary */}
      <div className="flex items-center justify-between text-xs font-bold text-muted-foreground px-1">
        <span>
          Showing {filteredItems.length} of {items.length} updates
          {selectedCategory !== "All" && ` in ${selectedCategory}`}
          {selectedImpact !== "All" && ` • ${selectedImpact} Impact`}
        </span>
        {(selectedCategory !== "All" ||
          selectedSource !== "All" ||
          selectedImpact !== "All" ||
          searchQuery.trim() !== "") && (
          <button
            onClick={resetFilters}
            className="text-indigo hover:underline flex items-center gap-1 cursor-pointer"
          >
            Clear active filters
          </button>
        )}
      </div>

      {/* Feed Cards List / Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {Array.from({ length: 6 }).map((_, idx) => (
            <SkeletonFeedCard key={idx} />
          ))}
        </div>
      ) : filteredItems.length === 0 ? (
        /* Empty State */
        <div className="bg-card border-[3px] border-black shadow-[5px_5px_0_0_#000000] p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-secondary border-2 border-black flex items-center justify-center mx-auto text-muted-foreground">
            <Search className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-xl font-bold">No intelligence matches your filter criteria</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Try adjusting your search terms, switching categories, or resetting active filters.
            </p>
          </div>
          <button
            onClick={resetFilters}
            className="px-4 py-2 border-2 border-black bg-black text-white text-xs font-bold shadow-[3px_3px_0_0_#4969E8] hover:bg-neutral-800 transition-all"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredItems.map((item) => {
            const isRbi = item.type === "rbi" || item.category === "RBI Regulations";
            return isRbi ? (
              <RbiRegulatoryCard key={item.id} item={item} formatDate={formatDate} />
            ) : (
              <NewsIntelCard key={item.id} item={item} formatDate={formatDate} />
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Metric Card
// ─────────────────────────────────────────────────────────────────────────────
function MetricCard({
  title,
  value,
  label,
  icon,
  colorBg,
}: {
  title: string;
  value: string;
  label: string;
  icon: React.ReactNode;
  colorBg: string;
}) {
  return (
    <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] p-4 flex items-center gap-3.5">
      <div className={`w-11 h-11 border-2 border-black flex items-center justify-center shrink-0 ${colorBg}`}>
        {icon}
      </div>
      <div className="min-w-0">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground block truncate">
          {title}
        </span>
        <div className="text-2xl font-black text-foreground tracking-tight">{value}</div>
        <span className="text-[11px] font-semibold text-muted-foreground block truncate">{label}</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RBI Regulatory Update Card (Official Authority Visual Treatment)
// ─────────────────────────────────────────────────────────────────────────────
function RbiRegulatoryCard({
  item,
  formatDate,
}: {
  item: FeedItem;
  formatDate: (d: string) => string;
}) {
  const isHigh = item.impactLevel === "High";
  const isMedium = item.impactLevel === "Medium";

  return (
    <div className="relative bg-card border-[3px] border-black rounded-none shadow-[6px_6px_0_0_#08111F] p-5 flex flex-col justify-between hover:shadow-[7px_7px_0_0_#4969E8] transition-all bg-gradient-to-br from-white via-white to-blue-50/20">
      {/* Top Tag & Badges */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 border-2 border-black bg-emerald-100 text-emerald-950 text-[10px] font-extrabold uppercase tracking-wider">
              <Landmark className="w-3 h-3 text-emerald-800" />
              RBI Authority Directive
            </span>
            {item.isNew && (
              <span className="px-2 py-0.5 border-2 border-black bg-amber-400 text-black text-[10px] font-black uppercase tracking-wider shadow-[1px_1px_0_0_#000000]">
                NEW
              </span>
            )}
          </div>

          <span
            className={`px-2 py-0.5 border-2 border-black text-[10px] font-extrabold uppercase tracking-wider ${
              isHigh
                ? "bg-red-500 text-white"
                : isMedium
                ? "bg-amber-400 text-black"
                : "bg-teal-500 text-white"
            }`}
          >
            {item.impactLevel} Impact
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif font-bold text-base md:text-lg leading-snug text-foreground line-clamp-2 hover:text-indigo transition-colors mb-2">
          {item.title}
        </h3>

        {/* 2-3 line Summary */}
        <p className="text-xs text-neutral-700 leading-relaxed line-clamp-3 mb-4 font-normal">
          {item.summary}
        </p>
      </div>

      {/* Card Footer */}
      <div className="pt-3 border-t-2 border-black/15 flex items-center justify-between gap-2 mt-auto">
        <div className="flex items-center gap-2 text-[11px] font-semibold text-muted-foreground">
          <span className="font-bold text-foreground flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            {item.source}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-muted-foreground" />
            {formatDate(item.publishedAt)}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/impact-analysis"
            className="px-2.5 py-1.5 border-2 border-black bg-indigo text-white text-xs font-bold shadow-[2px_2px_0_0_#000000] hover:bg-indigo/90 active:translate-x-[1px] active:translate-y-[1px] transition-all flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3" />
            Analyze
          </Link>

          <a
            href={item.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1.5 border-2 border-black bg-secondary hover:bg-neutral-200 text-foreground text-xs font-bold shadow-[2px_2px_0_0_#000000] active:translate-x-[1px] active:translate-y-[1px] transition-all flex items-center gap-1"
          >
            <span>Read Original</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Banking & FinTech News Card (Editorial Financial Intelligence Treatment)
// ─────────────────────────────────────────────────────────────────────────────
function NewsIntelCard({
  item,
  formatDate,
}: {
  item: FeedItem;
  formatDate: (d: string) => string;
}) {
  const isHigh = item.impactLevel === "High";
  const isMedium = item.impactLevel === "Medium";

  const getCategoryTheme = (cat: string) => {
    switch (cat.toLowerCase()) {
      case "fintech":
        return "bg-purple-100 text-purple-900 border-purple-900";
      case "payments":
        return "bg-emerald-100 text-emerald-900 border-emerald-900";
      case "nbfc":
        return "bg-amber-100 text-amber-900 border-amber-900";
      case "cybersecurity":
        return "bg-rose-100 text-rose-900 border-rose-900";
      default:
        return "bg-blue-100 text-blue-900 border-blue-900";
    }
  };

  return (
    <div className="relative bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] p-5 flex flex-col justify-between hover:shadow-[7px_7px_0_0_#000000] transition-all">
      {/* Top Tag & Badges */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 border-2 text-[10px] font-black uppercase tracking-wider ${getCategoryTheme(
                item.category
              )}`}
            >
              <Newspaper className="w-3 h-3" />
              {item.category}
            </span>
            {item.isNew && (
              <span className="px-2 py-0.5 border-2 border-black bg-amber-300 text-black text-[10px] font-extrabold uppercase tracking-wider">
                NEW
              </span>
            )}
          </div>

          <span
            className={`px-2 py-0.5 border-2 border-black text-[10px] font-bold uppercase tracking-wider ${
              isHigh
                ? "bg-red-50 text-red-700 border-red-700"
                : isMedium
                ? "bg-amber-50 text-amber-800 border-amber-700"
                : "bg-teal-50 text-teal-800 border-teal-700"
            }`}
          >
            {item.impactLevel}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif font-bold text-base md:text-lg leading-snug text-foreground line-clamp-2 hover:text-indigo transition-colors mb-2">
          {item.title}
        </h3>

        {/* 2-3 line Summary */}
        <p className="text-xs text-neutral-600 leading-relaxed line-clamp-3 mb-4 font-normal">
          {item.summary}
        </p>
      </div>

      {/* Card Footer */}
      <div className="pt-3 border-t-2 border-border flex items-center justify-between gap-2 mt-auto">
        <div className="flex items-center gap-2 text-[11px] font-semibold text-muted-foreground">
          <span className="px-1.5 py-0.5 bg-secondary border border-black/20 text-foreground font-bold text-[10px]">
            {item.source}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-muted-foreground" />
            {formatDate(item.publishedAt)}
          </span>
        </div>

        <a
          href={item.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 border-2 border-black bg-white hover:bg-neutral-100 text-foreground text-xs font-bold shadow-[2px_2px_0_0_#000000] active:translate-x-[1px] active:translate-y-[1px] transition-all flex items-center gap-1 shrink-0"
        >
          <span>Read Original</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Loading Skeleton Card
// ─────────────────────────────────────────────────────────────────────────────
function SkeletonFeedCard() {
  return (
    <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] p-5 space-y-4 animate-pulse">
      <div className="flex justify-between items-center">
        <div className="h-5 w-24 bg-neutral-200 border border-neutral-300" />
        <div className="h-5 w-16 bg-neutral-200 border border-neutral-300" />
      </div>
      <div className="space-y-2">
        <div className="h-5 w-5/6 bg-neutral-300" />
        <div className="h-5 w-3/4 bg-neutral-200" />
      </div>
      <div className="space-y-1.5 pt-2">
        <div className="h-3 w-full bg-neutral-200" />
        <div className="h-3 w-11/12 bg-neutral-200" />
        <div className="h-3 w-2/3 bg-neutral-200" />
      </div>
      <div className="pt-3 border-t border-neutral-200 flex justify-between items-center">
        <div className="h-4 w-28 bg-neutral-200" />
        <div className="h-7 w-24 bg-neutral-300 border border-black" />
      </div>
    </div>
  );
}
