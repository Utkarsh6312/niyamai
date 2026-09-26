import requests
import json
import glob

pdfs = glob.glob("dummy_pdfs/*.pdf")
for pdf in pdfs:
    print(f"Testing {pdf}...")
    with open(pdf, "rb") as f:
        res = requests.post("http://localhost:8000/api/analyze-policy-pdf", files={"file": f})
    data = res.json()
    print(f"   Success: {data.get('success')}")
    print(f"   Matched Case: {data.get('matched_case_id')}")
    print(f"   Fingerprint: {data.get('document_fingerprint')}\n")

print("Testing PDF 1 again...")
with open("dummy_pdfs/1_Transaction_Policy.pdf", "rb") as f:
    res = requests.post("http://localhost:8000/api/analyze-policy-pdf", files={"file": f})
data = res.json()
print(f"   Success: {data.get('success')}")
print(f"   Matched Case: {data.get('matched_case_id')}")
print(f"   Fingerprint: {data.get('document_fingerprint')}\n")
