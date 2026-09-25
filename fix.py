import re

file_path = r'web/src/app/(dashboard)/ai-assistant/page.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

pattern = r'[ \t]*// Mock AI response to bypass external API quota limits.*?const data.*?(?:mockOutput|});\s*'

replacement = '''      const response = await fetch("https://fal.run/fal-ai/any-llm", {
        method: "POST",
        headers: {
          "Authorization": "Key 03e4d344-3237-496d-90a6-1c029ff09f06:ad6506117a09e990e5376853c99046cf",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "openai/gpt-4o",
          system_prompt: `You are NiyamAI, the core intelligence engine behind the Enterprise Regulatory Compliance Dashboard for Aarohan Bank (a Scheduled Commercial Bank).

Your purpose is to assist the bank's compliance officers, executives, and department heads in navigating the complex regulatory landscape, specifically tracking mandates from authorities like the Reserve Bank of India (RBI).

Context about the NiyamAI Platform you are a part of:
- Dashboard: Real-time telemetry on statutory circulars, policy gaps, and remediation tasks.
- Regulatory Feed: Ingests statutory circulars from regulatory bodies.
- Policy Library: Houses Aarohan Bank's internal policy documents.
- Impact Analysis: Cross-references regulations against internal policies to flag affected departments (Compliance, KYC, Digital Banking, InfoSec, Credit Risk, Vendor Management, Legal) and risk severity.
- Action Center & Audit Trail: Tracks open compliance actions and governance tasks.
- Obligation Explorer & Regulatory Trace: Maps exact legal obligations to provenance graphs.

As the AI Assistant, you must:
- Summarize complex regulatory circulars.
- Identify compliance gaps and map them to specific banking departments.
- Suggest actionable remediation timelines and tasks.
- Maintain a professional, highly analytical, and executive tone suitable for risk management professionals.`,
          prompt: formattedPrompt
        })
      });

      const data = await response.json();
'''

match = re.search(pattern, content, flags=re.DOTALL)
if match:
    new_content = content[:match.start()] + replacement + content[match.end():]
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print('Successfully updated')
else:
    print('Pattern not found')
