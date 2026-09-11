// NiyamAI API Client with automatic fallback to local store

import type {
  DashboardSummary,
  RiskSnapshot,
  RecentActivity,
  Regulation,
  Clause,
  Obligation,
  Mapping,
  Policy,
  Risk,
  Action,
  IngestionJob
} from "../types";
import { documentsData, complianceActions } from "../data/mock-data";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

async function fetchWithFallback<T>(url: string, options?: RequestInit, fallback?: T): Promise<T> {
  try {
    const res = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {})
      },
      cache: "no-store"
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    if (fallback !== undefined) return fallback;
    throw err;
  }
}

export const api = {
  // Dashboard
  dashboardSummary: async (): Promise<DashboardSummary> => {
    return fetchWithFallback<DashboardSummary>("/dashboard/summary", undefined, {
      new_regulations: 142,
      active_obligations: 74,
      policies_impacted: 47,
      critical_gaps: 18,
      open_actions: 63
    });
  },

  dashboardRisks: async (): Promise<RiskSnapshot> => {
    return fetchWithFallback<RiskSnapshot>("/dashboard/risks", undefined, {
      critical: 18,
      high: 32,
      medium: 54,
      low: 38
    });
  },

  dashboardActivity: async (): Promise<RecentActivity[]> => {
    return fetchWithFallback<RecentActivity[]>("/dashboard/activity", undefined, [
      {
        id: "act-1",
        event: "Statutory Directive Ingested",
        entity_type: "regulation",
        entity_id: "DOC-1",
        actor: "System AI",
        timestamp: new Date().toISOString(),
        source_document: "RBI/2026-27/114 - Digital Lending"
      }
    ]);
  },

  // Regulations
  regulations: async (params?: { limit?: number }): Promise<Regulation[]> => {
    const fallbackRegs: Regulation[] = documentsData
      .filter((d) => d.type === "Regulation")
      .map((d) => ({
        id: d.id,
        reference_number: d.code,
        title: d.title,
        regulator: d.source,
        category: "Banking Regulation",
        publication_date: d.date,
        effective_date: d.effectiveDate,
        status: d.status,
        summary: d.aiSummary,
        obligations_count: d.obligationsCount,
        clauses_count: d.clausesCount
      }));

    return fetchWithFallback<Regulation[]>(`/regulations?limit=${params?.limit || 50}`, undefined, fallbackRegs);
  },

  regulation: async (id: string): Promise<Regulation> => {
    const doc = documentsData.find((d) => d.id === id) || documentsData[0];
    return fetchWithFallback<Regulation>(`/regulations/${id}`, undefined, {
      id: doc.id,
      reference_number: doc.code,
      title: doc.title,
      regulator: doc.source,
      category: "Master Direction",
      effective_date: doc.effectiveDate,
      status: doc.status,
      summary: doc.aiSummary
    });
  },

  regulationClauses: async (id: string): Promise<Clause[]> => {
    const doc = documentsData.find((d) => d.id === id) || documentsData[0];
    const fallbackClauses: Clause[] = doc.clauses.map((c, i) => ({
      id: `cls-${i + 1}`,
      regulation_id: doc.id,
      clause_no: c.number,
      heading: c.title,
      text: c.text,
      page_number: 12
    }));
    return fetchWithFallback<Clause[]>(`/regulations/${id}/clauses`, undefined, fallbackClauses);
  },

  // Obligations
  obligations: async (params?: { limit?: number }): Promise<Obligation[]> => {
    const fallbackObs: Obligation[] = [
      {
        id: "ob-1",
        regulation_id: "DOC-1",
        obligation_code: "OBL-KYC-042",
        requirement: "Mandate continuous biometric liveness and geolocation validation for all unassisted digital credit applicants prior to first disbursement.",
        type: "Mandatory",
        department: "Compliance",
        impact: "Critical",
        status: "Action Required",
        deadline: "01 Oct 2026",
        confidence: 0.98,
        regulation_title: "RBI KYC Master Direction (2026)",
        clause_no: "Clause 4.2"
      },
      {
        id: "ob-2",
        regulation_id: "DOC-1",
        obligation_code: "OBL-DL-031",
        requirement: "Direct loan disbursal from regulated entity CASA account into borrower bank account without pass-through pool accounts.",
        type: "Mandatory",
        department: "Digital Banking",
        impact: "High",
        status: "Compliant",
        deadline: "01 Dec 2024",
        confidence: 0.94,
        regulation_title: "RBI Guidelines on Digital Lending",
        clause_no: "Clause 3.1"
      },
      {
        id: "ob-3",
        regulation_id: "DOC-1",
        obligation_code: "OBL-CYBER-008",
        requirement: "Immediate regulatory incident reporting to RBI CSITE and CERT-In within 6 hours of high-severity cyber breach confirmation.",
        type: "Mandatory",
        department: "Information Security",
        impact: "Critical",
        status: "Compliant",
        deadline: "Immediate",
        confidence: 0.99,
        regulation_title: "RBI Cyber Security Framework",
        clause_no: "Clause 4.3"
      }
    ];

    return fetchWithFallback<Obligation[]>(`/obligations?limit=${params?.limit || 50}`, undefined, fallbackObs);
  },

  obligation: async (id: string): Promise<Obligation> => {
    return fetchWithFallback<Obligation>(`/obligations/${id}`, undefined, {
      id,
      regulation_id: "DOC-1",
      obligation_code: "OBL-KYC-042",
      requirement: "Mandate continuous biometric liveness and geolocation validation for unassisted digital onboarding.",
      type: "Mandatory",
      department: "Compliance",
      impact: "Critical",
      status: "Action Required",
      deadline: "01 Oct 2026",
      confidence: 0.98,
      regulation_title: "RBI KYC Master Direction (2026)",
      clause_no: "Clause 4.2"
    });
  },

  obligationMappings: async (id: string): Promise<Mapping[]> => {
    return fetchWithFallback<Mapping[]>(`/obligations/${id}/mappings`, undefined, [
      {
        id: "map-1",
        obligation_id: id,
        policy_id: "DOC-3",
        match_score: 78,
        mapping_status: "Partial Match",
        evidence: "Verification frequency mismatch with KYC Policy v3.4 Section 3.2",
        review_status: "Pending"
      }
    ]);
  },

  obligationTrace: async (id: string): Promise<any> => {
    return fetchWithFallback<any>(`/provenance/trace/${id}`, undefined, {
      obligation: {
        id,
        obligation_code: "OBL-KYC-042",
        requirement: "Mandate continuous biometric liveness detection."
      },
      regulation: {
        id: "DOC-1",
        reference_number: "RBI/2026-27/45",
        title: "RBI Master Direction — KYC (2026)"
      },
      clause: {
        clause_no: "Clause 4.2",
        text: "Regulated Entities shall institute real-time biometric liveness validation."
      },
      mappings: [
        {
          policy_name: "KYC Policy v3.4",
          policy_section: "Section 3.2",
          match_score: 78
        }
      ],
      gaps: [
        {
          description: "Aarohan Bank KYC SOP Section 3.2 lacks mandatory 6-month biometric liveness trigger.",
          severity: "Critical"
        }
      ],
      actions: [
        {
          action_code: "ACT-2041",
          title: "Update Section 3.2 of KYC SOP to mandate active biometric liveness checks.",
          priority: "Critical",
          status: "Pending"
        }
      ]
    });
  },

  reviewMapping: async (id: string, reviewStatus: string): Promise<any> => {
    return fetchWithFallback<any>(`/mappings/${id}/review`, {
      method: "POST",
      body: JSON.stringify({ review_status: reviewStatus })
    }, { status: "success", review_status: reviewStatus });
  },

  // Policies
  policies: async (params?: { limit?: number }): Promise<Policy[]> => {
    const fallbackPolicies: Policy[] = documentsData
      .filter((d) => d.type === "Internal Policy")
      .map((d) => ({
        id: d.id,
        name: d.title,
        department: d.department,
        version: d.code,
        text: d.description,
        document_type: "Internal Policy",
        status: d.status,
        last_updated: d.lastUpdated
      }));
    return fetchWithFallback<Policy[]>(`/policies?limit=${params?.limit || 50}`, undefined, fallbackPolicies);
  },

  // Risks
  risks: async (): Promise<Risk[]> => {
    return fetchWithFallback<Risk[]>("/risks", undefined, [
      {
        id: "r-1",
        gap_id: "g-1",
        level: "Critical",
        department: "Compliance",
        risk_description: "Non-compliance penalty under Section 47A of Banking Regulation Act for missing digital liveness verification."
      }
    ]);
  },

  // Actions
  actions: async (): Promise<Action[]> => {
    const fallbackActions: Action[] = complianceActions.map((a) => ({
      id: a.id,
      action_code: a.id,
      title: a.action,
      department: a.department,
      owner: a.owner,
      owner_initials: a.ownerInitials,
      priority: a.priority,
      due_date: a.due,
      status: a.status,
      approval_state: "Pending Review"
    }));
    return fetchWithFallback<Action[]>("/actions", undefined, fallbackActions);
  },

  // Ingestion Upload
  uploadRegulation: async (formData: FormData): Promise<{ job_id: string; regulation_id: string }> => {
    try {
      const res = await fetch(`${API_BASE_URL}/ingest/upload`, {
        method: "POST",
        body: formData
      });
      if (res.ok) return await res.json();
    } catch {}
    return { job_id: `job-${Date.now()}`, regulation_id: "DOC-NEW" };
  },

  ingestJob: async (jobId: string): Promise<IngestionJob> => {
    return fetchWithFallback<IngestionJob>(`/ingest/job/${jobId}`, undefined, {
      id: jobId,
      regulation_id: "DOC-NEW",
      status: "Completed",
      current_stage: "Complete",
      progress: 100,
      pages_extracted: 14,
      clauses_detected: 18,
      obligations_identified: 29,
      policy_chunks_retrieved: 42,
      mappings_created: 4,
      gaps_detected: 1,
      actions_generated: 1,
      started_at: new Date().toISOString(),
      completed_at: new Date().toISOString()
    });
  }
};
