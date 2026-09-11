"""
Ingestion router: accepts PDF/DOCX uploads, starts the AI pipeline asynchronously,
and exposes a job-status endpoint the frontend can poll.
"""
import asyncio
import uuid
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db, AsyncSessionLocal
from app.models import Regulation, IngestionJob, Provenance
from app.schemas import IngestionJobOut
from app.services.ai_pipeline import run_pipeline
import os

router = APIRouter(prefix="/ingestion", tags=["ingestion"])

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload", status_code=201)
async def upload_regulation(
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db),
    title: str = Form(...),
    regulator: str = Form(...),
    reference_number: str = Form(...),
    category: str = Form(...),
    publication_date: str = Form(""),
    effective_date: str = Form(""),
    file: UploadFile = File(...),
):
    # Validate file type
    if not file.filename.endswith((".pdf", ".docx")):
        raise HTTPException(status_code=400, detail="Only PDF and DOCX files are accepted.")

    # Save file
    file_id = str(uuid.uuid4())
    file_path = os.path.join(UPLOAD_DIR, f"{file_id}_{file.filename}")
    content = await file.read()
    with open(file_path, "wb") as f:
        f.write(content)

    # Create regulation record
    reg = Regulation(
        id=str(uuid.uuid4()),
        title=title,
        regulator=regulator,
        reference_number=reference_number,
        category=category,
        publication_date=publication_date or None,
        effective_date=effective_date or None,
        status="Processing",
        source_file_path=file_path,
    )
    db.add(reg)

    # Create ingestion job
    job = IngestionJob(
        id=str(uuid.uuid4()),
        regulation_id=reg.id,
        status="running",
        current_stage="document",
    )
    db.add(job)

    # Provenance
    prov = Provenance(
        id=str(uuid.uuid4()),
        entity_type="regulation",
        entity_id=reg.id,
        event="Regulation Ingested",
        source_document=file.filename,
        actor="Compliance Officer",
        actor_type="user",
    )
    db.add(prov)

    await db.commit()

    # Run pipeline in background
    background_tasks.add_task(run_pipeline, reg.id, job.id, file_path)

    return {"regulation_id": reg.id, "job_id": job.id, "status": "started"}


@router.get("/{job_id}", response_model=IngestionJobOut)
async def get_job_status(job_id: str, db: AsyncSession = Depends(get_db)):
    job = await db.get(IngestionJob, job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Ingestion job not found")
    return job
