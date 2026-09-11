"""
All SQLAlchemy ORM models for NiyamAI.
Implements the full chain:
  Regulation → Clause → Obligation → Policy → Mapping → Gap → Risk → Action
  Plus: IngestionJob and Provenance
"""
import uuid
from datetime import datetime
from sqlalchemy import (
    String, Text, Integer, Float, Boolean, DateTime, ForeignKey, JSON
)
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database import Base


def new_id() -> str:
    return str(uuid.uuid4())


def now() -> datetime:
    return datetime.utcnow()


# ---------------------------------------------------------------------------
# Regulation
# ---------------------------------------------------------------------------
class Regulation(Base):
    __tablename__ = "regulations"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=new_id)
    external_id: Mapped[str | None] = mapped_column(String, nullable=True)
    reference_number: Mapped[str] = mapped_column(String, nullable=False)
    title: Mapped[str] = mapped_column(String, nullable=False)
    regulator: Mapped[str] = mapped_column(String, nullable=False)
    category: Mapped[str] = mapped_column(String, nullable=False)
    publication_date: Mapped[str | None] = mapped_column(String, nullable=True)
    effective_date: Mapped[str | None] = mapped_column(String, nullable=True)
    version: Mapped[str | None] = mapped_column(String, nullable=True)
    # Status: New | Processing | Analyzed | Action Required | Reviewed | Archived
    status: Mapped[str] = mapped_column(String, default="New")
    source_type: Mapped[str | None] = mapped_column(String, nullable=True)
    source_url: Mapped[str | None] = mapped_column(String, nullable=True)
    source_file_path: Mapped[str | None] = mapped_column(String, nullable=True)
    summary: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=now)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=now, onupdate=now)

    clauses: Mapped[list["Clause"]] = relationship(back_populates="regulation", lazy="select")
    obligations: Mapped[list["Obligation"]] = relationship(back_populates="regulation", lazy="select")
    ingestion_jobs: Mapped[list["IngestionJob"]] = relationship(back_populates="regulation", lazy="select")


# ---------------------------------------------------------------------------
# Clause
# ---------------------------------------------------------------------------
class Clause(Base):
    __tablename__ = "clauses"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=new_id)
    regulation_id: Mapped[str] = mapped_column(ForeignKey("regulations.id"), nullable=False)
    clause_no: Mapped[str] = mapped_column(String, nullable=False)
    section: Mapped[str | None] = mapped_column(String, nullable=True)
    heading: Mapped[str | None] = mapped_column(String, nullable=True)
    text: Mapped[str] = mapped_column(Text, nullable=False)
    page_number: Mapped[int | None] = mapped_column(Integer, nullable=True)
    source_reference: Mapped[str | None] = mapped_column(String, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=now)

    regulation: Mapped["Regulation"] = relationship(back_populates="clauses")
    obligations: Mapped[list["Obligation"]] = relationship(back_populates="clause", lazy="select")


# ---------------------------------------------------------------------------
# Policy
# ---------------------------------------------------------------------------
class Policy(Base):
    __tablename__ = "policies"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=new_id)
    name: Mapped[str] = mapped_column(String, nullable=False)
    department: Mapped[str] = mapped_column(String, nullable=False)
    version: Mapped[str] = mapped_column(String, nullable=False)
    section: Mapped[str | None] = mapped_column(String, nullable=True)
    text: Mapped[str] = mapped_column(Text, nullable=False)
    document_type: Mapped[str] = mapped_column(String, nullable=False)
    # Status: Active | Draft | Under Review | Superseded | Archived
    status: Mapped[str] = mapped_column(String, default="Active")
    last_updated: Mapped[str | None] = mapped_column(String, nullable=True)
    source_file_path: Mapped[str | None] = mapped_column(String, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=now)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=now, onupdate=now)

    mappings: Mapped[list["Mapping"]] = relationship(back_populates="policy", lazy="select")


# ---------------------------------------------------------------------------
# Obligation
# ---------------------------------------------------------------------------
class Obligation(Base):
    __tablename__ = "obligations"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=new_id)
    regulation_id: Mapped[str] = mapped_column(ForeignKey("regulations.id"), nullable=False)
    clause_id: Mapped[str | None] = mapped_column(ForeignKey("clauses.id"), nullable=True)
    obligation_code: Mapped[str] = mapped_column(String, nullable=False, unique=True)
    requirement: Mapped[str] = mapped_column(Text, nullable=False)
    # Type: Process | Reporting | Technical | Data | Governance | Customer | Monitoring | Documentation
    type: Mapped[str] = mapped_column(String, nullable=False)
    department: Mapped[str] = mapped_column(String, nullable=False)
    # Impact: Critical | High | Medium | Low
    impact: Mapped[str] = mapped_column(String, nullable=False)
    # Status: Not Started | In Progress | Action Required | Compliant | Overdue
    status: Mapped[str] = mapped_column(String, default="Not Started")
    deadline: Mapped[str | None] = mapped_column(String, nullable=True)
    confidence: Mapped[float | None] = mapped_column(Float, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=now)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=now, onupdate=now)

    regulation: Mapped["Regulation"] = relationship(back_populates="obligations")
    clause: Mapped["Clause | None"] = relationship(back_populates="obligations")
    mappings: Mapped[list["Mapping"]] = relationship(back_populates="obligation", lazy="select")
    gaps: Mapped[list["Gap"]] = relationship(back_populates="obligation", lazy="select")


# ---------------------------------------------------------------------------
# Mapping
# ---------------------------------------------------------------------------
class Mapping(Base):
    __tablename__ = "mappings"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=new_id)
    obligation_id: Mapped[str] = mapped_column(ForeignKey("obligations.id"), nullable=False)
    policy_id: Mapped[str] = mapped_column(ForeignKey("policies.id"), nullable=False)
    match_score: Mapped[float | None] = mapped_column(Float, nullable=True)
    # mapping_status: Full Match | Partial Match | Conflict | Unmapped | Needs Review
    mapping_status: Mapped[str] = mapped_column(String, nullable=False)
    evidence: Mapped[str | None] = mapped_column(Text, nullable=True)
    matched_requirements: Mapped[str | None] = mapped_column(Text, nullable=True)
    missing_requirements: Mapped[str | None] = mapped_column(Text, nullable=True)
    conflicting_requirements: Mapped[str | None] = mapped_column(Text, nullable=True)
    ai_recommendation: Mapped[str | None] = mapped_column(Text, nullable=True)
    # review_status: Pending | Approved | Rejected
    review_status: Mapped[str] = mapped_column(String, default="Pending")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=now)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=now, onupdate=now)

    obligation: Mapped["Obligation"] = relationship(back_populates="mappings")
    policy: Mapped["Policy"] = relationship(back_populates="mappings")
    gaps: Mapped[list["Gap"]] = relationship(back_populates="mapping", lazy="select")


# ---------------------------------------------------------------------------
# Gap
# ---------------------------------------------------------------------------
class Gap(Base):
    __tablename__ = "gaps"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=new_id)
    mapping_id: Mapped[str] = mapped_column(ForeignKey("mappings.id"), nullable=False)
    obligation_id: Mapped[str] = mapped_column(ForeignKey("obligations.id"), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    # severity: Critical | High | Medium | Low
    severity: Mapped[str] = mapped_column(String, nullable=False)
    rationale: Mapped[str | None] = mapped_column(Text, nullable=True)
    business_impact: Mapped[str | None] = mapped_column(Text, nullable=True)
    # status: Open | In Progress | Resolved
    status: Mapped[str] = mapped_column(String, default="Open")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=now)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=now, onupdate=now)

    mapping: Mapped["Mapping"] = relationship(back_populates="gaps")
    obligation: Mapped["Obligation"] = relationship(back_populates="gaps")
    risks: Mapped[list["Risk"]] = relationship(back_populates="gap", lazy="select")
    actions: Mapped[list["Action"]] = relationship(back_populates="gap", lazy="select")


# ---------------------------------------------------------------------------
# Risk
# ---------------------------------------------------------------------------
class Risk(Base):
    __tablename__ = "risks"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=new_id)
    gap_id: Mapped[str] = mapped_column(ForeignKey("gaps.id"), nullable=False)
    # level: Critical | High | Medium | Low
    level: Mapped[str] = mapped_column(String, nullable=False)
    department: Mapped[str] = mapped_column(String, nullable=False)
    impact_area: Mapped[str | None] = mapped_column(String, nullable=True)
    risk_description: Mapped[str] = mapped_column(Text, nullable=False)
    likelihood: Mapped[int | None] = mapped_column(Integer, nullable=True)
    severity_score: Mapped[float | None] = mapped_column(Float, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=now)

    gap: Mapped["Gap"] = relationship(back_populates="risks")


# ---------------------------------------------------------------------------
# Action
# ---------------------------------------------------------------------------
class Action(Base):
    __tablename__ = "actions"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=new_id)
    gap_id: Mapped[str | None] = mapped_column(ForeignKey("gaps.id"), nullable=True)
    obligation_id: Mapped[str | None] = mapped_column(ForeignKey("obligations.id"), nullable=True)
    regulation_id: Mapped[str | None] = mapped_column(ForeignKey("regulations.id"), nullable=True)
    action_code: Mapped[str] = mapped_column(String, nullable=False, unique=True)
    title: Mapped[str] = mapped_column(Text, nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    owner: Mapped[str | None] = mapped_column(String, nullable=True)
    owner_initials: Mapped[str | None] = mapped_column(String, nullable=True)
    owner_role: Mapped[str | None] = mapped_column(String, nullable=True)
    department: Mapped[str] = mapped_column(String, nullable=False)
    # priority: Critical | High | Medium | Low
    priority: Mapped[str] = mapped_column(String, nullable=False)
    due_date: Mapped[str | None] = mapped_column(String, nullable=True)
    # status: Not Started | In Progress | Review | Completed | Overdue
    status: Mapped[str] = mapped_column(String, default="Not Started")
    # approval_state: Draft | Compliance Review | Approved | Rejected
    approval_state: Mapped[str] = mapped_column(String, default="Draft")
    created_by: Mapped[str | None] = mapped_column(String, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=now)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=now, onupdate=now)
    completed_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)

    gap: Mapped["Gap | None"] = relationship(back_populates="actions")


# ---------------------------------------------------------------------------
# Provenance / Evidence
# ---------------------------------------------------------------------------
class Provenance(Base):
    __tablename__ = "provenance"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=new_id)
    entity_type: Mapped[str] = mapped_column(String, nullable=False)
    entity_id: Mapped[str] = mapped_column(String, nullable=False)
    event: Mapped[str] = mapped_column(String, nullable=False)
    source_ref: Mapped[str | None] = mapped_column(String, nullable=True)
    source_document: Mapped[str | None] = mapped_column(String, nullable=True)
    source_clause: Mapped[str | None] = mapped_column(String, nullable=True)
    source_page: Mapped[int | None] = mapped_column(Integer, nullable=True)
    policy_ref: Mapped[str | None] = mapped_column(String, nullable=True)
    actor: Mapped[str | None] = mapped_column(String, nullable=True)
    # actor_type: user | system | ai
    actor_type: Mapped[str | None] = mapped_column(String, nullable=True)
    model_version: Mapped[str | None] = mapped_column(String, nullable=True)
    confidence: Mapped[float | None] = mapped_column(Float, nullable=True)
    timestamp: Mapped[datetime] = mapped_column(DateTime, default=now)
    metadata_json: Mapped[str | None] = mapped_column(Text, nullable=True)


# ---------------------------------------------------------------------------
# Ingestion Job
# ---------------------------------------------------------------------------
class IngestionJob(Base):
    __tablename__ = "ingestion_jobs"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=new_id)
    regulation_id: Mapped[str | None] = mapped_column(ForeignKey("regulations.id"), nullable=True)
    # status: pending | running | completed | failed
    status: Mapped[str] = mapped_column(String, default="pending")
    # current_stage: document | understand | extract | retrieve | map | assess | act
    current_stage: Mapped[str | None] = mapped_column(String, nullable=True)
    progress: Mapped[int] = mapped_column(Integer, default=0)
    pages_extracted: Mapped[int] = mapped_column(Integer, default=0)
    clauses_detected: Mapped[int] = mapped_column(Integer, default=0)
    obligations_identified: Mapped[int] = mapped_column(Integer, default=0)
    policy_chunks_retrieved: Mapped[int] = mapped_column(Integer, default=0)
    mappings_created: Mapped[int] = mapped_column(Integer, default=0)
    gaps_detected: Mapped[int] = mapped_column(Integer, default=0)
    actions_generated: Mapped[int] = mapped_column(Integer, default=0)
    error_message: Mapped[str | None] = mapped_column(Text, nullable=True)
    started_at: Mapped[datetime] = mapped_column(DateTime, default=now)
    completed_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)

    regulation: Mapped["Regulation | None"] = relationship(back_populates="ingestion_jobs")
