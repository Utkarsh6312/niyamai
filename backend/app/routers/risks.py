from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models import Risk
from app.schemas import RiskOut

router = APIRouter(prefix="/risks", tags=["risks"])


@router.get("", response_model=list[RiskOut])
async def list_risks(
    db: AsyncSession = Depends(get_db),
    level: str | None = Query(None),
    department: str | None = Query(None),
):
    q = select(Risk)
    if level:
        q = q.where(Risk.level == level)
    if department:
        q = q.where(Risk.department == department)
    q = q.order_by(Risk.level)
    result = await db.execute(q)
    return result.scalars().all()
