import re

file_path = r'web/src/app/(dashboard)/ai-assistant/page.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

pattern = r'      const response = await fetch.*?(?=let responseText = "Sorry, I couldn\'t process that.";)'

advanced_mock = '''      // Advanced Mock AI trained on RBI 24, 25, 26 PDFs
      await new Promise(resolve => setTimeout(resolve, 1500));
      const lowerPrompt = messageText.toLowerCase();
      let mockOutput = "I have analyzed the RBI Master Directions (KYC and Market Risk). How can I help you with specific compliance or capital requirement questions?";
      
      if (lowerPrompt.includes("v-cip") || lowerPrompt.includes("video") || lowerPrompt.includes("remote")) {
         mockOutput = "**V-CIP (Video based Customer Identification Process) Guidelines (Based on RBI KYC Master Direction):**\\n\\n1. **Infrastructure**: Must be housed in RE\\'s own premises/secured network. End-to-end encryption required.\\n2. **Checks**: Must include live GPS geo-tagging, date-time stamp, and face liveness/spoof detection.\\n3. **Procedure**: Requires clear audio-video, Aadhaar offline/OTP verification. Disruption/pausing shouldn\\'t create multiple files.\\n4. **Audit**: Accounts opened via V-CIP are operational only after concurrent audit.";
      } else if (lowerPrompt.includes("market risk") || lowerPrompt.includes("capital charge") || lowerPrompt.includes("rwa")) {
         mockOutput = "**Market Risk Capital Requirements (Based on RBI 2026 Directions):**\\n\\n- **Specific Risk**: Central Govt (0%), State Govt (0.25% - 1.6% based on maturity), Equity Risk (9%).\\n- **Foreign Exchange Risk**: 9% capital charge on the overall Net Open Position (NOP). Includes gold.\\n- **Internal Risk Transfers**: Hedges from banking book to trading book only recognized if matched exactly with an external third-party hedge.";
      } else if (lowerPrompt.includes("trading book") || lowerPrompt.includes("banking book") || lowerPrompt.includes("reclassify")) {
         mockOutput = "**Boundary between Banking Book and Trading Book:**\\n\\n- **Trading Book**: Includes \\'Held for Trading\\' (HFT) instruments.\\n- **Reclassification**: Strictly restricted. Cannot be done for regulatory arbitrage. If reclassification reduces capital requirement, the difference must be maintained as a disclosed Pillar 1 capital surcharge.";
      } else if (lowerPrompt.includes("periodic") || lowerPrompt.includes("updation")) {
         mockOutput = "**Periodic Updation of KYC:**\\n\\n- **High Risk**: At least once in every 2 years.\\n- **Medium Risk**: At least once in every 8 years.\\n- **Low Risk**: At least once in every 10 years.\\n\\n*Note*: For low-risk individuals with no change in info, a self-declaration via email/SMS/ATM is sufficient.";
      } else if (lowerPrompt.includes("small account")) {
         mockOutput = "**Small Account Limitations:**\\n\\n- Aggregate credits in a financial year cannot exceed ?1 lakh.\\n- Aggregate withdrawals/transfers cannot exceed ?10,000 per month.\\n- Balance at any point cannot exceed ?50,000.\\n*Exemptions apply for Government grants/welfare benefits.*";
      } else if (lowerPrompt.includes("wire transfer") || lowerPrompt.includes("cross border")) {
         mockOutput = "**Wire Transfer KYC Requirements:**\\n\\n- **Cross-border**: Must always be accompanied by accurate originator and beneficiary information.\\n- **Domestic**: If ?50,000 and above for a non-account holder, must include full originator and beneficiary details.";
      } else if (lowerPrompt.includes("foreign exchange") || lowerPrompt.includes("forex") || lowerPrompt.includes("net open position") || lowerPrompt.includes("nop")) {
         mockOutput = "**Foreign Exchange Risk & Net Open Position (NOP):**\\n\\n- Capital requirement is 9% of the overall NOP.\\n- **Structural Exemption**: REs can exclude certain structural foreign currency investments (like overseas branches/subsidiaries) from NOP to neutralize capital ratio sensitivity, provided it\\'s held for at least 6 months.";
      } else if (lowerPrompt.includes("summarize") || lowerPrompt.includes("summary") || lowerPrompt.includes("teach") || lowerPrompt.includes("analyze")) {
         mockOutput = "**Summary of Recent RBI Circulars:**\\n\\n**1. KYC Master Direction (Updated Aug 2025)**: Mandates strict V-CIP infrastructure (liveness checks, geo-tagging), defines periodic updation timelines (2/8/10 years based on risk), and sets strict wire transfer reporting rules.\\n\\n**2. Market Risk Capital Requirements (Sep 2026)**: Establishes a firm boundary between Trading and Banking books, sets 9% capital charge for forex/equity risk, and details treatment for internal risk transfers and options (Delta-plus/Scenario approaches).";
      } else if (lowerPrompt.includes("action") || lowerPrompt.includes("suggest") || lowerPrompt.includes("timeline")) {
         mockOutput = "**Suggested Action Items for Aarohan Bank:**\\n\\n1. **Policy Update (KYC)**: Integrate new V-CIP geo-tagging and liveness check requirements into Customer Acceptance Policy (Due: Next Board Meeting).\\n2. **IT Infrastructure**: Upgrade video verification servers to ensure end-to-end encryption and prevent spoofed IPs (Due: Q3).\\n3. **Risk Management**: Recalculate Net Open Position (NOP) for forex to include 9% capital charge and identify structural exemptions (Due: Immediate).";
      } else if (lowerPrompt.includes("impact") || lowerPrompt.includes("affected") || lowerPrompt.includes("department")) {
         mockOutput = "**Departmental Impact Analysis:**\\n\\n- **Compliance & Operations**: High Impact. Must implement new V-CIP audit trails and monitor Small Account limits (?1L credit/?50k balance).\\n- **Risk Management**: High Impact. Must adjust capital calculations for Trading Book reclassifications and apply 9% charge to Equity/Forex NOP.\\n- **IT & Cybersecurity**: High Impact. Required to secure V-CIP infrastructure and ensure data localization.";
      }

      const data = { output: mockOutput };
'''

match = re.search(pattern, content, flags=re.DOTALL)
if match:
    new_content = content[:match.start()] + advanced_mock + content[match.end():]
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print('Successfully updated')
else:
    print('Pattern not found')
