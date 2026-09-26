from fastapi import APIRouter, UploadFile, File
from app.compliance_engine.pdf_parser import extract_text_from_pdf
from app.compliance_engine.matcher import match_case
import hashlib

router = APIRouter()

@router.post("/analyze-policy-pdf")
async def analyze_policy_pdf(file: UploadFile = File(...)):
    # 1. Read file bytes
    file_bytes = await file.read()
    
    # 2. Deterministic Fingerprint
    fingerprint = hashlib.sha256(file_bytes).hexdigest()
    
    # 3. Extract text
    text = extract_text_from_pdf(file_bytes)
    
    # 4. Match case
    matched_case = match_case(text)
    
    if not matched_case:
        return {
            "success": False,
            "document_name": file.filename,
            "document_fingerprint": fingerprint,
            "status": "UNSUPPORTED_DOCUMENT",
            "message": "No predefined compliance pattern was detected in this document.",
            "matched_case": None
        }
        
    return {
        "success": True,
        "document_name": file.filename,
        "document_fingerprint": fingerprint,
        "matched_case_id": matched_case["case_id"],
        "policy_name": matched_case["policy_name"],
        "compliance_issue": matched_case["compliance_issue"],
        "loophole": matched_case["loophole"],
        "fraud_scenario": matched_case["fraud_scenario"],
        "fraud_risk": matched_case["fraud_risk"],
        "affected_process": matched_case["affected_process"],
        "recommended_fixes": matched_case["recommended_fixes"],
        "manager_summary": matched_case["manager_summary"],
        "profit_impact": matched_case["profit_impact"]
    }
