
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.database import get_db
from app.models import User
import hashlib

router = APIRouter()

class LoginRequest(BaseModel):
    email: str
    password: str

class LoginResponse(BaseModel):
    message: str
    user_id: str
    name: str

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

@router.post("/auth/login", response_model=LoginResponse)
async def login(req: LoginRequest, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == req.email))
    user = result.scalars().first()

    # Simple auto-registration if user does not exist (for prototyping)
    if not user:
        user = User(
            email=req.email,
            password_hash=hash_password(req.password),
            name=req.email.split("@")[0].title()
        )
        db.add(user)
        await db.commit()
        await db.refresh(user)
    else:
        # Verify password
        if user.password_hash != hash_password(req.password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect password"
            )

    return LoginResponse(
        message="Login successful",
        user_id=user.id,
        name=user.name
    )

