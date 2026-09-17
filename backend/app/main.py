"""
NiyamAI FastAPI Backend
Entry point: uvicorn app.main:app --reload
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import get_settings
from app.database import init_db
from app.routers import dashboard, regulations, obligations, policies, mappings, risks, actions, provenance, ingestion, feed

settings = get_settings()

app = FastAPI(
    title="NiyamAI API",
    description="Regulatory Intelligence Backend — From Regulation to Action.",
    version="1.0.0",
)

# CORS — allow Next.js dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list + ["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(dashboard.router, prefix="/api")
app.include_router(regulations.router, prefix="/api")
app.include_router(obligations.router, prefix="/api")
app.include_router(policies.router, prefix="/api")
app.include_router(mappings.router, prefix="/api")
app.include_router(risks.router, prefix="/api")
app.include_router(actions.router, prefix="/api")
app.include_router(provenance.router, prefix="/api")
app.include_router(ingestion.router, prefix="/api")
app.include_router(feed.router, prefix="/api")


@app.on_event("startup")
async def startup():
    await init_db()


@app.get("/api/health")
async def health():
    return {"status": "ok", "app": settings.APP_NAME, "environment": settings.ENVIRONMENT}
