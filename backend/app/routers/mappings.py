from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from app.database import get_db
from app.models import Mapping
from app.schemas import MappingOut, MappingReviewIn

router = APIRouter(prefix="/mappings", tags=["mappings"])


@router.get("/{mapping_id}", response_model=MappingOut)
async def get_mapping(mapping_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Mapping)
        .options(selectinload(Mapping.obligation), selectinload(Mapping.policy))
        .where(Mapping.id == mapping_id)
    )
    m = result.scalar_one_or_none()
    if not m:
        raise HTTPException(status_code=404, detail="Mapping not found")
    return m


@router.get("/obligation/{obligation_id}", response_model=list[MappingOut])
async def get_mappings_for_obligation(obligation_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Mapping)
        .options(selectinload(Mapping.policy))
        .where(Mapping.obligation_id == obligation_id)
    )
    return result.scalars().all()


@router.post("/{mapping_id}/review")
async def review_mapping(mapping_id: str, body: MappingReviewIn, db: AsyncSession = Depends(get_db)):
    m = await db.get(Mapping, mapping_id)
    if not m:
        raise HTTPException(status_code=404, detail="Mapping not found")
    m.review_status = body.review_status
    await db.commit()
    return {"status": "updated", "review_status": m.review_status}
