export interface FeedItem {
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

export type FeedCategory = 
  | "All"
  | "RBI Regulations"
  | "Banking"
  | "FinTech"
  | "Payments"
  | "NBFC"
  | "Cybersecurity";

export type ImpactLevel = "High" | "Medium" | "Low";
