from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models import Policy
from app.schemas import PolicyOut

router = APIRouter(prefix="/policies", tags=["policies"])


@router.get("", response_model=list[PolicyOut])
async def list_policies(
    db: AsyncSession = Depends(get_db),
    department: str | None = Query(None),
    status: str | None = Query(None),
    document_type: str | None = Query(None),
    search: str | None = Query(None),
    skip: int = 0,
    limit: int = 100,
):
    q = select(Policy)
    if department:
        q = q.where(Policy.department == department)
    if status:
        q = q.where(Policy.status == status)
    if document_type:
        q = q.where(Policy.document_type == document_type)
    if search:
        q = q.where(Policy.name.ilike(f"%{search}%"))
    q = q.order_by(Policy.name).offset(skip).limit(limit)
    result = await db.execute(q)
    return result.scalars().all()


@router.get("/{policy_id}", response_model=PolicyOut)
async def get_policy(policy_id: str, db: AsyncSession = Depends(get_db)):
    p = await db.get(Policy, policy_id)
    if not p:
        raise HTTPException(status_code=404, detail="Policy not found")
    return p
