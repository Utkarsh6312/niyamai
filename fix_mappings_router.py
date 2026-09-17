
import sys

path = r"backend/app/routers/mappings.py"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace(
    ".options(selectinload(Mapping.obligation), selectinload(Mapping.policy))",
    ".options(selectinload(Mapping.obligation), selectinload(Mapping.policy), selectinload(Mapping.gaps))"
)

content = content.replace(
    ".options(selectinload(Mapping.policy))",
    ".options(selectinload(Mapping.obligation), selectinload(Mapping.policy), selectinload(Mapping.gaps))"
)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated mappings router!")

