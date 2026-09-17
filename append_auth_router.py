
import sys

main_path = r"backend/app/main.py"
with open(main_path, "r", encoding="utf-8") as f:
    content = f.read()

if "from app.routers import" in content and "auth" not in content:
    content = content.replace(
        "from app.routers import dashboard",
        "from app.routers import auth, dashboard"
    )
    content = content.replace(
        "app.include_router(dashboard.router, prefix=\"/api\")",
        "app.include_router(auth.router, prefix=\"/api\")\napp.include_router(dashboard.router, prefix=\"/api\")"
    )
    with open(main_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Auth router registered.")
else:
    print("Auth router already registered or could not match string.")

