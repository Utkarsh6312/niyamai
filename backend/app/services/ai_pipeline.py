"""
NiyamAI Intelligence Pipeline
Stages: DOCUMENT → UNDERSTAND → EXTRACT → RETRIEVE → MAP → ASSESS → ACT

Steps:
1. Extract text from PDF/DOCX with PyMuPDF
2. Segment into clauses (LLM)
3. Extract obligations as structured JSON (LLM)
4. Retrieve relevant policy chunks (keyword similarity, no vector store needed for MVP)
5. Map obligation to policy (LLM) → Full/Partial/Conflict/Unmapped
6. Detect gap + severity (LLM)
7. Assess risk and department impact (LLM)
8. Generate action recommendation (LLM)
9. Persist all findings to DB
"""
import json
import uuid
import re
from datetime import datetime

import fitz  # PyMuPDF

from app.config import get_settings
from app.database import AsyncSessionLocal
from app.models import (
    Clause, Obligation, Policy, Mapping, Gap, Risk, Action, IngestionJob, Regulation, Provenance
)
from sqlalchemy import select

settings = get_settings()

# ---------------------------------------------------------------------------
# Gemini client helper
# ---------------------------------------------------------------------------
def _get_gemini():
    try:
        import google.generativeai as genai
        genai.configure(api_key=settings.GEMINI_API_KEY)
        return genai.GenerativeModel("gemini-1.5-flash")
    except Exception:
        return None


def _ask_llm(model, prompt: str) -> str:
    if not model:
        return ""
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return ""


def _extract_json(text: str) -> any:
    """Extract first JSON array or object from LLM response text."""
    match = re.search(r"(\[.*?\]|\{.*?\})", text, re.DOTALL)
    if match:
        try:
            return json.loads(match.group(1))
        except json.JSONDecodeError:
            return None
    return None


# ---------------------------------------------------------------------------
# Step 1: PDF text extraction
# ---------------------------------------------------------------------------
def extract_text_from_pdf(file_path: str) -> tuple[str, int]:
    """Returns (full_text, page_count)."""
    try:
        doc = fitz.open(file_path)
        pages = []
        for page in doc:
            pages.append(page.get_text())
        return "\n".join(pages), len(doc)
    except Exception:
        return "", 0


# ---------------------------------------------------------------------------
# Step 2: Clause segmentation
# ---------------------------------------------------------------------------
def segment_clauses_simple(text: str, regulation_id: str) -> list[dict]:
    """
    Simple heuristic clause segmentation (no LLM cost).
    Splits on numbered patterns like '1.', '1.1', 'Clause 4', etc.
    """
    clauses = []
    # Split on patterns like "1.", "1.1", "C.1", "Clause 1"
    pattern = r"(?m)^(?:Clause\s+)?(?:[A-Z]\.)?\d+(?:\.\d+)*[.\s]"
    parts = re.split(pattern, text)
    matches = re.findall(pattern, text)

    for i, (num, body) in enumerate(zip(matches, parts[1:])):
        clause_text = body.strip()
        if len(clause_text) > 30:  # Skip trivially short fragments
            clauses.append({
                "id": str(uuid.uuid4()),
                "regulation_id": regulation_id,
                "clause_no": num.strip().rstrip("."),
                "heading": None,
                "text": clause_text[:2000],  # Truncate very long clauses
                "page_number": None,
                "source_reference": num.strip(),
            })
    # If no structured clauses found, treat whole text as one block
    if not clauses:
        clauses.append({
            "id": str(uuid.uuid4()),
            "regulation_id": regulation_id,
            "clause_no": "1",
            "heading": "Full Text",
            "text": text[:3000],
            "page_number": 1,
            "source_reference": "1",
        })
    return clauses[:20]  # Cap at 20 for MVP


# ---------------------------------------------------------------------------
# Step 3: Obligation extraction
# ---------------------------------------------------------------------------
def extract_obligations_llm(model, clauses: list[dict], regulation_title: str) -> list[dict]:
    """Ask LLM to extract obligations from top clauses."""
    if not model:
        return []

    # Only send first 5 clauses to stay within token limits
    sample_clauses = clauses[:5]
    clause_text = "\n\n".join([
        f"Clause {c['clause_no']}: {c['text'][:600]}"
        for c in sample_clauses
    ])

    prompt = f"""You are a regulatory compliance expert analyzing the following clauses from "{regulation_title}".

Extract obligations as a JSON array. Each item must follow this exact schema:
{{
  "clause_no": "string (clause number from the text)",
  "requirement": "string (the specific obligation in plain English, 1-2 sentences)",
  "type": "one of: Process|Reporting|Technical|Data|Governance|Customer|Monitoring|Documentation",
  "department": "one of: KYC|Compliance|Operations|IT|Cybersecurity|Legal|Risk|Finance|HR|Business",
  "impact": "one of: Critical|High|Medium|Low",
  "deadline": "null or ISO date string",
  "confidence": "float between 0 and 1"
}}

Return ONLY a valid JSON array, no explanation.

CLAUSES:
{clause_text}
"""
    raw = _ask_llm(model, prompt)
    result = _extract_json(raw)
    if isinstance(result, list):
        return result
    return []


# ---------------------------------------------------------------------------
# Step 4: Policy retrieval (keyword-based for MVP)
# ---------------------------------------------------------------------------
async def retrieve_relevant_policies(db, requirement: str, department: str, top_k: int = 3) -> list:
    """Simple keyword overlap matching against policy text."""
    result = await db.execute(select(Policy).where(Policy.status == "Active"))
    policies = result.scalars().all()

    # Score by keyword overlap
    req_words = set(requirement.lower().split())
    scored = []
    for p in policies:
        p_words = set(p.text.lower().split())
        # Boost by department match
        dept_boost = 2 if p.department.lower() == department.lower() else 0
        score = len(req_words & p_words) + dept_boost
        if score > 0:
            scored.append((score, p))

    scored.sort(key=lambda x: x[0], reverse=True)
    return [p for _, p in scored[:top_k]]


# ---------------------------------------------------------------------------
# Step 5–8: Map, gap, risk, action (LLM)
# ---------------------------------------------------------------------------
def map_obligation_to_policy_llm(model, requirement: str, policy_name: str, policy_text: str) -> dict:
    """Returns mapping result dict."""
    if not model:
        return {
            "mapping_status": "Needs Review",
            "match_score": 0.5,
            "matched_requirements": "Review required",
            "missing_requirements": "Unable to analyze — LLM unavailable",
            "conflicting_requirements": None,
            "ai_recommendation": "Please manually review this mapping.",
        }

    prompt = f"""You are a regulatory compliance analyst. 

REGULATORY OBLIGATION:
"{requirement}"

INTERNAL POLICY SECTION ({policy_name}):
"{policy_text[:800]}"

Analyze the alignment and return a JSON object with EXACTLY these keys:
{{
  "mapping_status": "one of: Full Match|Partial Match|Conflict|Unmapped|Needs Review",
  "match_score": "float 0.0-1.0",
  "matched_requirements": "string describing what is covered",
  "missing_requirements": "string describing what is missing, or null",
  "conflicting_requirements": "string describing conflicts, or null",
  "ai_recommendation": "string: what should be changed/added to the policy"
}}

Return ONLY valid JSON.
"""
    raw = _ask_llm(model, prompt)
    result = _extract_json(raw)
    if isinstance(result, dict):
        return result
    return {
        "mapping_status": "Needs Review",
        "match_score": 0.5,
        "matched_requirements": "Automated analysis pending",
        "missing_requirements": None,
        "conflicting_requirements": None,
        "ai_recommendation": "Manual review recommended.",
    }


def assess_gap_and_risk_llm(model, requirement: str, missing: str, department: str) -> dict:
    """Returns gap/risk assessment dict."""
    if not model or not missing:
        return {
            "gap_severity": "Medium",
            "gap_description": missing or "Gap detected",
            "rationale": "AI analysis unavailable",
            "business_impact": "Unknown",
            "risk_level": "Medium",
            "risk_description": "Risk assessment pending.",
            "likelihood": 3,
        }

    prompt = f"""Assess the compliance gap and risk for:

Obligation: "{requirement}"
Missing requirement: "{missing}"
Department: {department}

Return JSON with:
{{
  "gap_severity": "Critical|High|Medium|Low",
  "gap_description": "concise gap description",
  "rationale": "why this gap exists",
  "business_impact": "business impact in 1 sentence",
  "risk_level": "Critical|High|Medium|Low",
  "risk_description": "risk in 1 sentence",
  "likelihood": "integer 1-5"
}}

Return ONLY valid JSON.
"""
    raw = _ask_llm(model, prompt)
    result = _extract_json(raw)
    if isinstance(result, dict):
        return result
    return {
        "gap_severity": "High",
        "gap_description": missing,
        "rationale": "Policy does not fully address regulatory requirement.",
        "business_impact": "Regulatory non-compliance risk.",
        "risk_level": "High",
        "risk_description": "Potential regulatory penalty if not remediated.",
        "likelihood": 3,
    }


def generate_action_llm(model, requirement: str, gap_desc: str, department: str) -> dict:
    """Returns action recommendation dict."""
    if not model:
        return {
            "title": f"Remediate gap in {department} policy",
            "description": gap_desc,
            "suggested_sla_days": 30,
        }

    prompt = f"""Generate a compliance action for:

Requirement: "{requirement}"
Gap: "{gap_desc}"
Department: {department}

Return JSON:
{{
  "title": "concise action title (max 15 words)",
  "description": "what exactly needs to be done (2-3 sentences)",
  "suggested_sla_days": integer
}}

Return ONLY valid JSON.
"""
    raw = _ask_llm(model, prompt)
    result = _extract_json(raw)
    if isinstance(result, dict):
        return result
    return {
        "title": f"Update {department} policy to address compliance gap",
        "description": f"Review and amend internal policy to cover: {gap_desc}",
        "suggested_sla_days": 14,
    }


# ---------------------------------------------------------------------------
# Main pipeline runner
# ---------------------------------------------------------------------------
async def run_pipeline(regulation_id: str, job_id: str, file_path: str):
    """Background task: full AI pipeline."""
    async with AsyncSessionLocal() as db:
        try:
            job = await db.get(IngestionJob, job_id)
            reg = await db.get(Regulation, regulation_id)
            if not job or not reg:
                return

            model = _get_gemini()

            # ── STAGE 1: DOCUMENT ──────────────────────────────────────────
            job.current_stage = "document"
            await db.commit()

            text, page_count = extract_text_from_pdf(file_path)
            job.pages_extracted = page_count
            await db.commit()

            # ── STAGE 2: UNDERSTAND / CLAUSE SEGMENTATION ──────────────────
            job.current_stage = "understand"
            await db.commit()

            clause_dicts = segment_clauses_simple(text or reg.summary or reg.title, regulation_id)
            job.clauses_detected = len(clause_dicts)

            # Persist clauses
            clause_map = {}  # clause_no → Clause object
            for cd in clause_dicts:
                clause_obj = Clause(
                    id=cd["id"],
                    regulation_id=cd["regulation_id"],
                    clause_no=cd["clause_no"],
                    heading=cd.get("heading"),
                    text=cd["text"],
                    page_number=cd.get("page_number"),
                    source_reference=cd.get("source_reference"),
                )
                db.add(clause_obj)
                clause_map[cd["clause_no"]] = clause_obj
            await db.commit()

            # ── STAGE 3: EXTRACT (obligations) ────────────────────────────
            job.current_stage = "extract"
            await db.commit()

            raw_obligations = extract_obligations_llm(model, clause_dicts, reg.title)
            if not raw_obligations:
                # Fallback: use seed-like obligations
                raw_obligations = [{
                    "clause_no": "1",
                    "requirement": f"Comply with {reg.title} requirements.",
                    "type": "Process",
                    "department": "Compliance",
                    "impact": "High",
                    "deadline": None,
                    "confidence": 0.7,
                }]

            obligation_objs = []
            existing_codes = []
            result = await db.execute(select(Obligation.obligation_code))
            existing_codes = list(result.scalars().all())

            for i, raw_obl in enumerate(raw_obligations):
                # Generate unique obligation code
                reg_prefix = reg.regulator[:3].upper()
                n = len(existing_codes) + i + 1
                code = f"OBL-{reg_prefix}-{n:03d}"
                existing_codes.append(code)

                clause_obj = clause_map.get(str(raw_obl.get("clause_no", "")))

                obl = Obligation(
                    id=str(uuid.uuid4()),
                    regulation_id=regulation_id,
                    clause_id=clause_obj.id if clause_obj else None,
                    obligation_code=code,
                    requirement=raw_obl.get("requirement", ""),
                    type=raw_obl.get("type", "Process"),
                    department=raw_obl.get("department", "Compliance"),
                    impact=raw_obl.get("impact", "Medium"),
                    status="Not Started",
                    deadline=raw_obl.get("deadline"),
                    confidence=raw_obl.get("confidence"),
                )
                db.add(obl)
                obligation_objs.append(obl)

                # Provenance
                db.add(Provenance(
                    id=str(uuid.uuid4()),
                    entity_type="obligation",
                    entity_id=obl.id,
                    event="Obligation Extracted",
                    source_document=reg.title,
                    source_clause=str(raw_obl.get("clause_no", "")),
                    actor="NiyamAI Pipeline",
                    actor_type="ai",
                    model_version="gemini-1.5-flash",
                    confidence=raw_obl.get("confidence"),
                ))

            job.obligations_identified = len(obligation_objs)
            await db.commit()

            # ── STAGE 4: RETRIEVE (policy matching) ──────────────────────
            job.current_stage = "retrieve"
            await db.commit()

            total_chunks = 0
            total_mappings = 0
            total_gaps = 0
            total_actions = 0

            for obl in obligation_objs:
                relevant_policies = await retrieve_relevant_policies(db, obl.requirement, obl.department)
                total_chunks += len(relevant_policies)

                # ── STAGE 5: MAP ──────────────────────────────────────────
                job.current_stage = "map"
                job.policy_chunks_retrieved = total_chunks
                await db.commit()

                for policy in relevant_policies:
                    map_result = map_obligation_to_policy_llm(
                        model, obl.requirement, policy.name, policy.text
                    )

                    score = map_result.get("match_score", 0.5)
                    if isinstance(score, str):
                        try:
                            score = float(score)
                        except Exception:
                            score = 0.5

                    mapping = Mapping(
                        id=str(uuid.uuid4()),
                        obligation_id=obl.id,
                        policy_id=policy.id,
                        match_score=score,
                        mapping_status=map_result.get("mapping_status", "Needs Review"),
                        matched_requirements=map_result.get("matched_requirements"),
                        missing_requirements=map_result.get("missing_requirements"),
                        conflicting_requirements=map_result.get("conflicting_requirements"),
                        ai_recommendation=map_result.get("ai_recommendation"),
                        review_status="Pending",
                    )
                    db.add(mapping)
                    total_mappings += 1

                    # ── STAGE 6: ASSESS (gap + risk) ─────────────────────
                    job.current_stage = "assess"
                    await db.commit()

                    missing = map_result.get("missing_requirements")
                    if missing and map_result.get("mapping_status") in ("Partial Match", "Unmapped", "Conflict"):
                        gr = assess_gap_and_risk_llm(model, obl.requirement, missing, obl.department)

                        gap = Gap(
                            id=str(uuid.uuid4()),
                            mapping_id=mapping.id,
                            obligation_id=obl.id,
                            description=gr.get("gap_description", missing),
                            severity=gr.get("gap_severity", "High"),
                            rationale=gr.get("rationale"),
                            business_impact=gr.get("business_impact"),
                            status="Open",
                        )
                        db.add(gap)
                        total_gaps += 1

                        risk = Risk(
                            id=str(uuid.uuid4()),
                            gap_id=gap.id,
                            level=gr.get("risk_level", "High"),
                            department=obl.department,
                            impact_area="Regulatory Compliance",
                            risk_description=gr.get("risk_description", ""),
                            likelihood=gr.get("likelihood", 3),
                            severity_score=score,
                        )
                        db.add(risk)

                        # ── STAGE 7: ACT ──────────────────────────────────
                        job.current_stage = "act"
                        await db.commit()

                        act_result = generate_action_llm(model, obl.requirement, gap.description, obl.department)
                        sla_days = act_result.get("suggested_sla_days", 14)

                        # Calculate due date
                        from datetime import timedelta
                        due_dt = datetime.utcnow() + timedelta(days=int(sla_days))
                        due_date_str = due_dt.strftime("%b %d, %Y")

                        # Next action code
                        result2 = await db.execute(select(Action.action_code))
                        codes2 = list(result2.scalars().all())
                        nums = [int(c.replace("ACT-", "")) for c in codes2 if c.startswith("ACT-") and c[4:].isdigit()]
                        next_n = max(nums) + 1 if nums else 1001
                        action_code = f"ACT-{next_n}"

                        action = Action(
                            id=str(uuid.uuid4()),
                            action_code=action_code,
                            gap_id=gap.id,
                            obligation_id=obl.id,
                            regulation_id=regulation_id,
                            title=act_result.get("title", "Compliance action required"),
                            description=act_result.get("description"),
                            department=obl.department,
                            priority=gap.severity,
                            due_date=due_date_str,
                            status="Not Started",
                            approval_state="Draft",
                        )
                        db.add(action)
                        total_actions += 1

                        # Provenance for action
                        db.add(Provenance(
                            id=str(uuid.uuid4()),
                            entity_type="action",
                            entity_id=action.id,
                            event="Action Generated by AI",
                            source_document=reg.title,
                            source_clause=obl.clause_id,
                            actor="NiyamAI Pipeline",
                            actor_type="ai",
                            model_version="gemini-1.5-flash",
                            confidence=obl.confidence,
                        ))

                    await db.commit()

            # ── DONE ──────────────────────────────────────────────────────
            job.status = "completed"
            job.current_stage = "act"
            job.mappings_created = total_mappings
            job.gaps_detected = total_gaps
            job.actions_generated = total_actions
            job.progress = 100
            job.completed_at = datetime.utcnow()

            reg.status = "Analyzed"
            if total_gaps > 0:
                reg.status = "Action Required"

            # Final provenance
            db.add(Provenance(
                id=str(uuid.uuid4()),
                entity_type="regulation",
                entity_id=regulation_id,
                event="Analysis Completed",
                actor="NiyamAI Pipeline",
                actor_type="ai",
                model_version="gemini-1.5-flash",
            ))

            await db.commit()

        except Exception as e:
            async with AsyncSessionLocal() as db2:
                job = await db2.get(IngestionJob, job_id)
                if job:
                    job.status = "failed"
                    job.error_message = str(e)
                    await db2.commit()
