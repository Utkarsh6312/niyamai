"""
NiyamAI Gemini Intelligence Service
Implements the Final Master Prompt for Gemini API with Dual-Key Automatic Failover.
"""

import json
import logging
import urllib.request
import urllib.error
from typing import Any, Dict, List, Optional
from app.config import get_settings

logger = logging.getLogger("niyamai.gemini")
settings = get_settings()

NIYAM_AI_MASTER_PROMPT = """You are NiyamAI, an AI-powered banking intelligence system.

ARCHITECTURE:
- Hard-coded Python handles: data structures, math formulas, UI logic
- YOU (Gemini LLM) handle: reading text, finding patterns, writing insights, suggesting fixes
- You receive structured JSON input, you return structured JSON output
- You NEVER do math calculations — user provides all numbers, you only interpret them

YOUR TASKS:

1. POLICY ANALYSIS:
- Read policy text
- Identify 1 realistic loophole fraudsters could exploit
- Write a 3-5 sentence fraud scenario (like a crime story with amounts, channels, timelines)
- Estimate fraud risk: Low / Medium / High
- Suggest 2-3 specific, actionable policy fixes

2. FRAUD ALERT ANALYSIS:
- Read alert details (customer profile, transaction, device info)
- Estimate fraud probability (0-100) based on patterns
- Explain why in 1-2 sentences
- Estimate expected loss: Low / Medium / High
- Recommend 3 concrete actions for fraud team
- Write 3-4 sentence manager summary

3. PROFIT IMPACT ANALYSIS:
- User provides all numbers (fraud_loss_reduced, staff_cost, dropoff_loss, etc.)
- You interpret: is this policy profitable or costly?
- Classify: "Highly Profitable" / "Balanced" / "Costly but Necessary" / "Profit-Drag"
- Explain main cost driver (1 sentence)
- Explain main benefit driver (1 sentence)
- Suggest 1-2 optimizations to improve profitability

OUTPUT RULES:
- ALWAYS respond in valid JSON only
- NO markdown, NO extra text, NO explanations outside JSON
- Match the exact output schema for each task type
- Keep text concise but complete (max 4 sentences per field)
- Use simple, CEO-friendly English

---

INPUT/OUTPUT SCHEMAS:

### TASK 1: POLICY_ANALYSIS
INPUT:
{
  "task": "POLICY_ANALYSIS",
  "policy_id": "string",
  "policy_name": "string",
  "policy_text": "string",
  "affected_process": "string",
  "regulation_source": "string"
}
OUTPUT:
{
  "task_type": "POLICY_ANALYSIS",
  "policy_id": "string",
  "loophole": "string (1 line)",
  "fraud_scenario": "string (3-5 sentences)",
  "fraud_risk": "Low/Medium/High",
  "recommended_fixes": ["string", "string", "string"]
}

---

### TASK 2: FRAUD_ALERT
INPUT:
{
  "task": "FRAUD_ALERT",
  "alert_id": "string",
  "alert_type": "Account Takeover / Transaction Fraud / Mule Activity / Application Fraud",
  "customer_profile": "string",
  "transaction_details": "string",
  "device_info": "string"
}
OUTPUT:
{
  "task_type": "FRAUD_ALERT",
  "alert_id": "string",
  "fraud_probability": "number (0-100)",
  "probability_reason": "string (1-2 sentences)",
  "expected_loss": "Low/Medium/High",
  "loss_reason": "string (1 sentence)",
  "recommended_actions": ["string", "string", "string"],
  "manager_summary": "string (3-4 sentences)"
}

---

### TASK 3: PROFIT_IMPACT
INPUT:
{
  "task": "PROFIT_IMPACT",
  "policy_id": "string",
  "policy_name": "string",
  "metrics": {
    "fraud_loss_reduced": "number",
    "penalty_reduced": "number",
    "revenue_gained": "number",
    "staff_cost_added": "number",
    "dropoff_loss": "number",
    "delay_cost": "number"
  }
}
OUTPUT:
{
  "task_type": "PROFIT_IMPACT",
  "policy_id": "string",
  "net_impact": "number (calculate: benefits - costs)",
  "profit_score": "number (0-100, normalize net_impact)",
  "classification": "Highly Profitable/Balanced/Costly but Necessary/Profit-Drag",
  "main_cost_driver": "string (1 sentence)",
  "main_benefit_driver": "string (1 sentence)",
  "optimization_suggestions": ["string", "string"]
}

---

IMPORTANT:
- You are the "Smart Analyst" — you read, reason, and write insights
- Python code handles math, data structures, and UI
- You ONLY return JSON, nothing else
- Be bold, specific, and actionable in recommendations
"""


def get_gemini_api_keys() -> List[str]:
    """Retrieve keys in priority order: KEY_1, then KEY_2, then fallback GEMINI_API_KEY."""
    keys: List[str] = []
    k1 = settings.GEMINI_API_KEY_1 or settings.GEMINI_API_KEY
    k2 = settings.GEMINI_API_KEY_2

    if k1 and k1.strip():
        keys.append(k1.strip())
    if k2 and k2.strip() and k2.strip() not in keys:
        keys.append(k2.strip())
    return keys


def _call_gemini_rest(api_key: str, task_input: Dict[str, Any], model: str = "gemini-flash-latest") -> Dict[str, Any]:
    """Call Google Gemini REST endpoint directly with system instruction."""
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"

    full_prompt = f"{NIYAM_AI_MASTER_PROMPT}\n\nUser Input:\n{json.dumps(task_input, indent=2)}"

    payload = {
        "contents": [
            {
                "role": "user",
                "parts": [{"text": full_prompt}]
            }
        ],
        "generationConfig": {
            "temperature": 0.2,
            "maxOutputTokens": 2048,
            "responseMimeType": "application/json"
        }
    }

    req_data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=req_data,
        headers={"Content-Type": "application/json"},
        method="POST"
    )

    with urllib.request.urlopen(req, timeout=30) as resp:
        res_body = resp.read().decode("utf-8")
        parsed = json.loads(res_body)
        raw_text = parsed["candidates"][0]["content"]["parts"][0]["text"].strip()

        # Clean markdown if present
        clean_json = raw_text.replace("```json", "").replace("```", "").strip()
        return json.loads(clean_json)


def call_niyam_ai(task_input: Dict[str, Any], model: str = "gemini-flash-latest") -> Dict[str, Any]:
    """
    Executes NiyamAI Master Prompt with automatic dual-key failover.
    Tries Key 1 first; on failure, immediately fails over to Key 2.
    """
    keys = get_gemini_api_keys()
    if not keys:
        raise ValueError("No Gemini API keys configured. Set GEMINI_API_KEY_1 and GEMINI_API_KEY_2 in .env")

    last_error = None
    for idx, key in enumerate(keys):
        masked_key = f"{key[:8]}...{key[-6:]}"
        try:
            logger.info(f"[NiyamAI Gemini] Calling task '{task_input.get('task')}' with Key {idx + 1} ({masked_key})...")
            result = _call_gemini_rest(key, task_input, model=model)
            logger.info(f"[NiyamAI Gemini] Key {idx + 1} succeeded.")
            return result
        except Exception as e:
            last_error = e
            logger.warning(f"[NiyamAI Gemini] Key {idx + 1} ({masked_key}) failed: {e}")
            if idx < len(keys) - 1:
                logger.info(f"[NiyamAI Gemini] Automatically failing over to Key {idx + 2}...")

    raise RuntimeError(f"All Gemini API keys failed. Last error: {last_error}")
