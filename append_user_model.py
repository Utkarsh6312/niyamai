
import sys

models_path = r"backend/app/models.py"
with open(models_path, "r", encoding="utf-8") as f:
    content = f.read()

if "class User(Base):" not in content:
    user_model = """
# ---------------------------------------------------------------------------
# User
# ---------------------------------------------------------------------------
class User(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=new_id)
    email: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String, nullable=False)
    name: Mapped[str] = mapped_column(String, nullable=False)
    role: Mapped[str] = mapped_column(String, default="user")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=now)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=now, onupdate=now)
"""
    with open(models_path, "a", encoding="utf-8") as f:
        f.write(user_model)
    print("User model added.")
else:
    print("User model already exists.")

