from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.database import get_db
from app.models import Regulation, Obligation, Gap, Action, Risk
from app.schemas import DashboardSummary, RiskSnapshot, RecentActivity
from app.models import Provenance

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.get("/summary", response_model=DashboardSummary)
async def get_dashboard_summary(db: AsyncSession = Depends(get_db)):
    new_regs = await db.scalar(
        select(func.count()).select_from(Regulation).where(Regulation.status.in_(["New", "Processing"]))
    )
    active_obs = await db.scalar(
        select(func.count()).select_from(Obligation).where(Obligation.status != "Compliant")
    )
    # policies impacted = distinct obligations with at least one mapping
    from app.models import Mapping, Policy
    policies_impacted = await db.scalar(
        select(func.count(func.distinct(Mapping.policy_id))).select_from(Mapping)
    )
    critical_gaps = await db.scalar(
        select(func.count()).select_from(Gap).where(Gap.severity == "Critical", Gap.status == "Open")
    )
    open_actions = await db.scalar(
        select(func.count()).select_from(Action).where(Action.status.in_(["Not Started", "In Progress", "Review"]))
    )
    return DashboardSummary(
        new_regulations=new_regs or 0,
        active_obligations=active_obs or 0,
        policies_impacted=policies_impacted or 0,
        critical_gaps=critical_gaps or 0,
        open_actions=open_actions or 0,
    )


@router.get("/risk-snapshot", response_model=RiskSnapshot)
async def get_risk_snapshot(db: AsyncSession = Depends(get_db)):
    async def count(level: str) -> int:
        return await db.scalar(
            select(func.count()).select_from(Risk).where(Risk.level == level)
        ) or 0

    return RiskSnapshot(
        critical=await count("Critical"),
        high=await count("High"),
        medium=await count("Medium"),
        low=await count("Low"),
    )


@router.get("/recent-activity", response_model=list[RecentActivity])
async def get_recent_activity(db: AsyncSession = Depends(get_db), limit: int = 10):
    result = await db.execute(
        select(Provenance).order_by(Provenance.timestamp.desc()).limit(limit)
    )
    rows = result.scalars().all()
    return [
        RecentActivity(
            id=r.id,
            event=r.event,
            entity_type=r.entity_type,
            entity_id=r.entity_id,
            actor=r.actor,
            timestamp=r.timestamp,
            source_document=r.source_document,
        )
        for r in rows
    ]
