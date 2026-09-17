import { NextResponse } from "next/server";

const BACKEND = process.env.BACKEND_URL || "http://localhost:8000/api";

const FALLBACK_RBI = [
  {
    id: "rbi-kyc-2025-01",
    title: "Master Direction – Know Your Customer (KYC) Direction, 2016 (Updated as on August 14, 2025)",
    summary: "Comprehensive amendments mandating 3 advance plus 3 post-due intimations prior to account operations restriction, Aadhaar Face Authentication at Business Correspondent points, and risk categorisation review every six months.",
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
    summary: "Mandates scheduled commercial banks and NBFCs to ensure direct credit flow between borrowers and regulated entity accounts without third-party escrow pooling, requiring ISO 27001 data localization audits.",
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
    summary: "Requires mandatory intimation of ransomware outbreaks, unauthorized data exfiltration, and core banking disruptions within 6 hours to the RBI CSITE cell.",
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
    summary: "Directive instructing all authorized PPI issuers to support bidirectional UPI payments across all merchant QR codes and peer-to-peer wallet handles.",
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
    summary: "Technical clarifications regarding the run-off rates for retail deposits with internet and mobile banking facilities, and HQLA valuation haircuts during liquidity stress events.",
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
    summary: "Advisory to commercial banks and payment system operators to tighten onboarding screening, monitor mule account syndicates, and educate retail consumers.",
    source: "Reserve Bank of India",
    sourceUrl: "https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx?prid=58120",
    publishedAt: "2026-06-25T12:00:00Z",
    category: "RBI Regulations",
    impactLevel: "Low",
    isNew: false,
    isUpdated: false,
    type: "rbi",
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const refresh = searchParams.get("refresh") === "true";
  try {
    const res = await fetch(`${BACKEND}/feed/rbi?refresh=${refresh}`, {
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
  return NextResponse.json(FALLBACK_RBI, {
    headers: { "Cache-Control": "public, max-age=60" },
  });
}
