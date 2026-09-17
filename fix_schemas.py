
import sys

schemas_path = r"backend/app/schemas.py"
with open(schemas_path, "r", encoding="utf-8") as f:
    content = f.read()

# Make sure GapOut is defined before MappingOut if we are going to use it
# In schemas.py, classes are usually in order. Let's check if GapOut is before MappingOut.
# If not, we can just use "GapOut" (string) or rely on Pydantic deferred resolution.
# It's better to just add `gaps: list["GapOut"] = []`
if "gaps: list" not in content:
    content = content.replace(
        "policy: Optional[PolicyOut] = None",
        "policy: Optional[PolicyOut] = None\n    gaps: list[\"GapOut\"] = []"
    )
    with open(schemas_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Added gaps to MappingOut.")
else:
    print("gaps already in MappingOut.")

