from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from app.database import get_db
from app.models import Obligation, Regulation, Clause
from app.schemas import ObligationOut

router = APIRouter(prefix="/obligations", tags=["obligations"])


@router.get("", response_model=list[ObligationOut])
async def list_obligations(
    db: AsyncSession = Depends(get_db),
    regulation_id: str | None = Query(None),
    department: str | None = Query(None),
    impact: str | None = Query(None),
    status: str | None = Query(None),
    type: str | None = Query(None),
    search: str | None = Query(None),
    skip: int = 0,
    limit: int = 100,
):
    q = select(Obligation).options(
        selectinload(Obligation.regulation),
        selectinload(Obligation.clause),
    )
    if regulation_id:
        q = q.where(Obligation.regulation_id == regulation_id)
    if department:
        q = q.where(Obligation.department == department)
    if impact:
        q = q.where(Obligation.impact == impact)
    if status:
        q = q.where(Obligation.status == status)
    if type:
        q = q.where(Obligation.type == type)
    if search:
        q = q.where(Obligation.requirement.ilike(f"%{search}%"))

    q = q.order_by(Obligation.obligation_code).offset(skip).limit(limit)
    result = await db.execute(q)
    obligations = result.scalars().all()

    out = []
    for o in obligations:
        d = ObligationOut.model_validate(o)
        d.regulation_title = o.regulation.title if o.regulation else None
        d.clause_no = o.clause.clause_no if o.clause else None
        out.append(d)
    return out


@router.get("/{obligation_id}", response_model=ObligationOut)
async def get_obligation(obligation_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Obligation)
        .options(selectinload(Obligation.regulation), selectinload(Obligation.clause))
        .where(Obligation.id == obligation_id)
    )
    o = result.scalar_one_or_none()
    if not o:
        raise HTTPException(status_code=404, detail="Obligation not found")
    d = ObligationOut.model_validate(o)
    d.regulation_title = o.regulation.title if o.regulation else None
    d.clause_no = o.clause.clause_no if o.clause else None
    return d
