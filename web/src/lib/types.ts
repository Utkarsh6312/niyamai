// TypeScript definitions for NiyamAI Frontend & Backend Integration

export interface Regulation {
  id: string;
  reference_number: string;
  title: string;
  regulator: string;
  category: string;
  publication_date?: string;
  effective_date?: string;
  status: string;
  summary?: string;
  obligations_count?: number;
  clauses_count?: number;
  created_at?: string;
}

export interface Clause {
  id: string;
  regulation_id: string;
  clause_no: string;
  section?: string;
  heading?: string;
  text: string;
  page_number?: number;
}

export interface Policy {
  id: string;
  name: string;
  department: string;
  version: string;
  section?: string;
  text: string;
  document_type: string;
  status: string;
  last_updated?: string;
}

export interface Obligation {
  id: string;
  regulation_id: string;
  clause_id?: string;
  obligation_code: string;
  requirement: string;
  type: string;
  department: string;
  impact: "Critical" | "High" | "Medium" | "Low" | string;
  status: string;
  deadline?: string;
  confidence?: number;
  regulation_title?: string;
  clause_no?: string;
}

export interface Mapping {
  id: string;
  obligation_id: string;
  policy_id: string;
  match_score?: number;
  mapping_status: string;
  evidence?: string;
  matched_requirements?: string;
  missing_requirements?: string;
  conflicting_requirements?: string;
  ai_recommendation?: string;
  review_status: "Pending" | "Approved" | "Rejected" | string;
  obligation?: Obligation;
  policy?: Policy;
}

export interface Gap {
  id: string;
  obligation_id: string;
  description: string;
  severity: "Critical" | "High" | "Medium" | "Low" | string;
  rationale?: string;
  business_impact?: string;
  status: string;
}

export interface Risk {
  id: string;
  gap_id: string;
  level: "Critical" | "High" | "Medium" | "Low" | string;
  department: string;
  impact_area?: string;
  risk_description: string;
  likelihood?: number;
  severity_score?: number;
}

export interface Action {
  id: string;
  action_code: string;
  title: string;
  description?: string;
  owner?: string;
  owner_initials?: string;
  owner_role?: string;
  department: string;
  priority: "Critical" | "High" | "Medium" | "Low" | string;
  due_date?: string;
  status: "Pending" | "In Progress" | "Completed" | string;
  approval_state: string;
  regulation_id?: string;
  obligation_id?: string;
  gap_id?: string;
  created_at?: string;
}

export interface DashboardSummary {
  new_regulations: number;
  active_obligations: number;
  policies_impacted: number;
  critical_gaps: number;
  open_actions: number;
}

export interface RiskSnapshot {
  critical: number;
  high: number;
  medium: number;
  low: number;
}

export interface RecentActivity {
  id: string;
  event: string;
  entity_type: string;
  entity_id: string;
  actor?: string;
  timestamp: string;
  source_document?: string;
}

export interface IngestionJob {
  id: string;
  regulation_id?: string;
  status: "Pending" | "Processing" | "Completed" | "Failed";
  current_stage?: string;
  progress: number;
  pages_extracted: number;
  clauses_detected: number;
  obligations_identified: number;
  policy_chunks_retrieved: number;
  mappings_created: number;
  gaps_detected: number;
  actions_generated: number;
  error_message?: string;
  started_at: string;
  completed_at?: string;
}
