from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.database import get_db
from app.models import Regulation, Clause, Obligation
from app.schemas import RegulationOut, ClauseOut

router = APIRouter(prefix="/regulations", tags=["regulations"])


@router.get("", response_model=list[RegulationOut])
async def list_regulations(
    db: AsyncSession = Depends(get_db),
    status: str | None = Query(None),
    regulator: str | None = Query(None),
    skip: int = 0,
    limit: int = 50,
):
    q = select(Regulation)
    if status:
        q = q.where(Regulation.status == status)
    if regulator:
        q = q.where(Regulation.regulator == regulator)
    q = q.order_by(Regulation.created_at.desc()).offset(skip).limit(limit)
    result = await db.execute(q)
    regs = result.scalars().all()

    out = []
    for r in regs:
        obs_count = await db.scalar(
            select(func.count()).select_from(Obligation).where(Obligation.regulation_id == r.id)
        ) or 0
        cl_count = await db.scalar(
            select(func.count()).select_from(Clause).where(Clause.regulation_id == r.id)
        ) or 0
        d = RegulationOut.model_validate(r)
        d.obligations_count = obs_count
        d.clauses_count = cl_count
        out.append(d)
    return out


@router.get("/{regulation_id}", response_model=RegulationOut)
async def get_regulation(regulation_id: str, db: AsyncSession = Depends(get_db)):
    reg = await db.get(Regulation, regulation_id)
    if not reg:
        raise HTTPException(status_code=404, detail="Regulation not found")
    obs_count = await db.scalar(
        select(func.count()).select_from(Obligation).where(Obligation.regulation_id == reg.id)
    ) or 0
    d = RegulationOut.model_validate(reg)
    d.obligations_count = obs_count
    return d


@router.get("/{regulation_id}/clauses", response_model=list[ClauseOut])
async def get_regulation_clauses(regulation_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Clause).where(Clause.regulation_id == regulation_id).order_by(Clause.clause_no)
    )
    return result.scalars().all()
