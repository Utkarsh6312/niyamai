from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models import Provenance
from app.schemas import ProvenanceOut

router = APIRouter(prefix="/provenance", tags=["provenance"])


@router.get("/{entity_type}/{entity_id}", response_model=list[ProvenanceOut])
async def get_provenance(entity_type: str, entity_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Provenance)
        .where(Provenance.entity_type == entity_type, Provenance.entity_id == entity_id)
        .order_by(Provenance.timestamp.asc())
    )
    return result.scalars().all()


@router.get("/obligation/{obligation_id}/trace")
async def get_obligation_trace(obligation_id: str, db: AsyncSession = Depends(get_db)):
    """
    Returns the full trace chain for a given obligation:
    Regulation → Clause → Obligation → Policy → Mapping → Gap → Risk → Action
    """
    from app.models import Obligation, Mapping, Gap, Risk, Action
    from sqlalchemy.orm import selectinload

    result = await db.execute(
        select(Obligation)
        .options(
            selectinload(Obligation.regulation),
            selectinload(Obligation.clause),
            selectinload(Obligation.mappings).selectinload(Mapping.policy),
            selectinload(Obligation.mappings).selectinload(Mapping.gaps).selectinload(Gap.risks),
            selectinload(Obligation.mappings).selectinload(Mapping.gaps).selectinload(Gap.actions),
        )
        .where(Obligation.id == obligation_id)
    )
    o = result.scalar_one_or_none()
    if not o:
        return {"error": "Obligation not found"}

    # Build trace nodes + edges for the frontend graph
    nodes = []
    edges = []

    # Regulation node
    if o.regulation:
        nodes.append({"id": f"reg-{o.regulation.id}", "type": "regulation",
                       "data": {"label": o.regulation.title, "sub": o.regulation.reference_number}})

    # Clause node
    if o.clause:
        nodes.append({"id": f"clause-{o.clause.id}", "type": "clause",
                       "data": {"label": f"Clause {o.clause.clause_no}", "sub": o.clause.heading or ""}})
        edges.append({"id": f"e-reg-clause", "source": f"reg-{o.regulation.id}",
                       "target": f"clause-{o.clause.id}", "label": "contains"})

    # Obligation node
    nodes.append({"id": f"obl-{o.id}", "type": "obligation",
                   "data": {"label": o.obligation_code, "sub": o.requirement[:80] + "..."}})
    if o.clause:
        edges.append({"id": "e-clause-obl", "source": f"clause-{o.clause.id}",
                       "target": f"obl-{o.id}", "label": "creates obligation"})
    elif o.regulation:
        edges.append({"id": "e-reg-obl", "source": f"reg-{o.regulation.id}",
                       "target": f"obl-{o.id}", "label": "creates obligation"})

    for mapping in o.mappings:
        # Policy node
        if mapping.policy:
            nodes.append({"id": f"pol-{mapping.policy.id}", "type": "policy",
                           "data": {"label": mapping.policy.name, "sub": f"v{mapping.policy.version} §{mapping.policy.section or ''}"}})
            edges.append({"id": f"e-obl-pol-{mapping.id}", "source": f"obl-{o.id}",
                           "target": f"pol-{mapping.policy.id}", "label": "mapped to"})

            # Mapping (gap/match) node
            nodes.append({"id": f"map-{mapping.id}", "type": "gap",
                           "data": {"label": mapping.mapping_status,
                                    "sub": f"{int((mapping.match_score or 0)*100)}% match"}})
            edges.append({"id": f"e-pol-map-{mapping.id}", "source": f"pol-{mapping.policy.id}",
                           "target": f"map-{mapping.id}", "label": "mapping result"})

            for gap in mapping.gaps:
                # Risk nodes
                for risk in gap.risks:
                    nodes.append({"id": f"risk-{risk.id}", "type": "risk",
                                   "data": {"label": f"{risk.level} Risk", "sub": risk.risk_description[:60]}})
                    edges.append({"id": f"e-map-risk-{risk.id}", "source": f"map-{mapping.id}",
                                   "target": f"risk-{risk.id}", "label": "gap detected"})

                    # Department node
                    nodes.append({"id": f"dept-{risk.department}", "type": "department",
                                   "data": {"label": risk.department, "sub": "Department"}})
                    edges.append({"id": f"e-risk-dept-{risk.id}", "source": f"risk-{risk.id}",
                                   "target": f"dept-{risk.department}", "label": "impacts"})

                # Action nodes
                for action in gap.actions:
                    nodes.append({"id": f"action-{action.id}", "type": "action",
                                   "data": {"label": action.action_code, "sub": action.title[:60]}})
                    edges.append({"id": f"e-map-act-{action.id}", "source": f"map-{mapping.id}",
                                   "target": f"action-{action.id}", "label": "creates action"})

    # Deduplicate nodes by id
    seen = set()
    unique_nodes = []
    for n in nodes:
        if n["id"] not in seen:
            seen.add(n["id"])
            unique_nodes.append(n)

    return {"nodes": unique_nodes, "edges": edges}
