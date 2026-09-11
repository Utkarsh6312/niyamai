from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from datetime import datetime
from app.database import get_db
from app.models import Action, Provenance
from app.schemas import ActionOut, ActionCreate, ActionUpdate
import uuid

router = APIRouter(prefix="/actions", tags=["actions"])


def _next_code(existing_codes: list[str]) -> str:
    nums = []
    for c in existing_codes:
        try:
            nums.append(int(c.replace("ACT-", "")))
        except Exception:
            pass
    next_n = max(nums) + 1 if nums else 1001
    return f"ACT-{next_n}"


@router.get("", response_model=list[ActionOut])
async def list_actions(
    db: AsyncSession = Depends(get_db),
    status: str | None = Query(None),
    priority: str | None = Query(None),
    department: str | None = Query(None),
    regulation_id: str | None = Query(None),
    skip: int = 0,
    limit: int = 100,
):
    q = select(Action)
    if status:
        q = q.where(Action.status == status)
    if priority:
        q = q.where(Action.priority == priority)
    if department:
        q = q.where(Action.department == department)
    if regulation_id:
        q = q.where(Action.regulation_id == regulation_id)
    q = q.order_by(Action.created_at.desc()).offset(skip).limit(limit)
    result = await db.execute(q)
    return result.scalars().all()


@router.post("", response_model=ActionOut, status_code=201)
async def create_action(body: ActionCreate, db: AsyncSession = Depends(get_db)):
    # Generate next code
    result = await db.execute(select(Action.action_code))
    codes = result.scalars().all()
    code = _next_code(codes)

    action = Action(
        id=str(uuid.uuid4()),
        action_code=code,
        title=body.title,
        description=body.description,
        owner=body.owner,
        owner_initials=body.owner_initials,
        owner_role=body.owner_role,
        department=body.department,
        priority=body.priority,
        due_date=body.due_date,
        gap_id=body.gap_id,
        obligation_id=body.obligation_id,
        regulation_id=body.regulation_id,
        status="Not Started",
        approval_state="Draft",
    )
    db.add(action)

    # Write provenance
    prov = Provenance(
        id=str(uuid.uuid4()),
        entity_type="action",
        entity_id=action.id,
        event="Action Created",
        actor="Compliance Officer",
        actor_type="user",
    )
    db.add(prov)

    await db.commit()
    await db.refresh(action)
    return action


@router.get("/{action_id}", response_model=ActionOut)
async def get_action(action_id: str, db: AsyncSession = Depends(get_db)):
    a = await db.get(Action, action_id)
    if not a:
        raise HTTPException(status_code=404, detail="Action not found")
    return a


@router.patch("/{action_id}", response_model=ActionOut)
async def update_action(action_id: str, body: ActionUpdate, db: AsyncSession = Depends(get_db)):
    a = await db.get(Action, action_id)
    if not a:
        raise HTTPException(status_code=404, detail="Action not found")
    if body.status is not None:
        a.status = body.status
        if body.status == "Completed":
            a.completed_at = datetime.utcnow()
    if body.owner is not None:
        a.owner = body.owner
    if body.due_date is not None:
        a.due_date = body.due_date
    if body.approval_state is not None:
        a.approval_state = body.approval_state
    if body.priority is not None:
        a.priority = body.priority

    # Provenance
    prov = Provenance(
        id=str(uuid.uuid4()),
        entity_type="action",
        entity_id=a.id,
        event=f"Action Updated — status: {a.status}",
        actor="Compliance Officer",
        actor_type="user",
    )
    db.add(prov)

    await db.commit()
    await db.refresh(a)
    return a
