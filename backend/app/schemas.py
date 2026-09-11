"""
Pydantic schemas for request/response serialization.
"""
from pydantic import BaseModel
from datetime import datetime
from typing import Optional


# ---------------------------------------------------------------------------
# Regulation
# ---------------------------------------------------------------------------
class RegulationBase(BaseModel):
    reference_number: str
    title: str
    regulator: str
    category: str
    publication_date: Optional[str] = None
    effective_date: Optional[str] = None
    status: str = "New"
    summary: Optional[str] = None


class RegulationCreate(RegulationBase):
    pass


class RegulationOut(RegulationBase):
    id: str
    created_at: datetime
    obligations_count: Optional[int] = 0
    clauses_count: Optional[int] = 0

    class Config:
        from_attributes = True


# ---------------------------------------------------------------------------
# Clause
# ---------------------------------------------------------------------------
class ClauseOut(BaseModel):
    id: str
    regulation_id: str
    clause_no: str
    section: Optional[str] = None
    heading: Optional[str] = None
    text: str
    page_number: Optional[int] = None

    class Config:
        from_attributes = True


# ---------------------------------------------------------------------------
# Policy
# ---------------------------------------------------------------------------
class PolicyOut(BaseModel):
    id: str
    name: str
    department: str
    version: str
    section: Optional[str] = None
    text: str
    document_type: str
    status: str
    last_updated: Optional[str] = None

    class Config:
        from_attributes = True


# ---------------------------------------------------------------------------
# Obligation
# ---------------------------------------------------------------------------
class ObligationOut(BaseModel):
    id: str
    regulation_id: str
    clause_id: Optional[str] = None
    obligation_code: str
    requirement: str
    type: str
    department: str
    impact: str
    status: str
    deadline: Optional[str] = None
    confidence: Optional[float] = None
    regulation_title: Optional[str] = None
    clause_no: Optional[str] = None

    class Config:
        from_attributes = True


# ---------------------------------------------------------------------------
# Mapping
# ---------------------------------------------------------------------------
class MappingOut(BaseModel):
    id: str
    obligation_id: str
    policy_id: str
    match_score: Optional[float] = None
    mapping_status: str
    evidence: Optional[str] = None
    matched_requirements: Optional[str] = None
    missing_requirements: Optional[str] = None
    conflicting_requirements: Optional[str] = None
    ai_recommendation: Optional[str] = None
    review_status: str
    obligation: Optional[ObligationOut] = None
    policy: Optional[PolicyOut] = None

    class Config:
        from_attributes = True


class MappingReviewIn(BaseModel):
    review_status: str  # Approved | Rejected
    notes: Optional[str] = None


# ---------------------------------------------------------------------------
# Gap
# ---------------------------------------------------------------------------
class GapOut(BaseModel):
    id: str
    obligation_id: str
    description: str
    severity: str
    rationale: Optional[str] = None
    business_impact: Optional[str] = None
    status: str

    class Config:
        from_attributes = True


# ---------------------------------------------------------------------------
# Risk
# ---------------------------------------------------------------------------
class RiskOut(BaseModel):
    id: str
    gap_id: str
    level: str
    department: str
    impact_area: Optional[str] = None
    risk_description: str
    likelihood: Optional[int] = None
    severity_score: Optional[float] = None

    class Config:
        from_attributes = True


# ---------------------------------------------------------------------------
# Action
# ---------------------------------------------------------------------------
class ActionCreate(BaseModel):
    title: str
    description: Optional[str] = None
    owner: Optional[str] = None
    owner_initials: Optional[str] = None
    owner_role: Optional[str] = None
    department: str
    priority: str
    due_date: Optional[str] = None
    gap_id: Optional[str] = None
    obligation_id: Optional[str] = None
    regulation_id: Optional[str] = None


class ActionUpdate(BaseModel):
    status: Optional[str] = None
    owner: Optional[str] = None
    due_date: Optional[str] = None
    approval_state: Optional[str] = None
    priority: Optional[str] = None


class ActionOut(BaseModel):
    id: str
    action_code: str
    title: str
    description: Optional[str] = None
    owner: Optional[str] = None
    owner_initials: Optional[str] = None
    owner_role: Optional[str] = None
    department: str
    priority: str
    due_date: Optional[str] = None
    status: str
    approval_state: str
    regulation_id: Optional[str] = None
    obligation_id: Optional[str] = None
    gap_id: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True


# ---------------------------------------------------------------------------
# Provenance
# ---------------------------------------------------------------------------
class ProvenanceOut(BaseModel):
    id: str
    entity_type: str
    entity_id: str
    event: str
    source_ref: Optional[str] = None
    source_document: Optional[str] = None
    source_clause: Optional[str] = None
    source_page: Optional[int] = None
    policy_ref: Optional[str] = None
    actor: Optional[str] = None
    actor_type: Optional[str] = None
    model_version: Optional[str] = None
    confidence: Optional[float] = None
    timestamp: datetime

    class Config:
        from_attributes = True


# ---------------------------------------------------------------------------
# Ingestion Job
# ---------------------------------------------------------------------------
class IngestionJobOut(BaseModel):
    id: str
    regulation_id: Optional[str] = None
    status: str
    current_stage: Optional[str] = None
    progress: int
    pages_extracted: int
    clauses_detected: int
    obligations_identified: int
    policy_chunks_retrieved: int
    mappings_created: int
    gaps_detected: int
    actions_generated: int
    error_message: Optional[str] = None
    started_at: datetime
    completed_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# ---------------------------------------------------------------------------
# Dashboard
# ---------------------------------------------------------------------------
class DashboardSummary(BaseModel):
    new_regulations: int
    active_obligations: int
    policies_impacted: int
    critical_gaps: int
    open_actions: int


class RiskSnapshot(BaseModel):
    critical: int
    high: int
    medium: int
    low: int


class RecentActivity(BaseModel):
    id: str
    event: str
    entity_type: str
    entity_id: str
    actor: Optional[str] = None
    timestamp: datetime
    source_document: Optional[str] = None
