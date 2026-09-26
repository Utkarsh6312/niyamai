const fs = require('fs');
const file = 'src/app/(dashboard)/compliance-issues/page.tsx';
let c = fs.readFileSync(file, 'utf8');

// 1. Replace the state hooks
c = c.replace(
`  // Gemini Live AI state with 0ms Instant Cache
  const [geminiLoading, setGeminiLoading] = useState(false);
  const [geminiCache, setGeminiCache] = useState<Record<string, any>>(initialGeminiCache);
  const [activeGeminiTask, setActiveGeminiTask] = useState<"POLICY" | "FRAUD" | "PROFIT">("POLICY");

  const cacheKey = \`\${selectedDoc}_\${activeGeminiTask}\`;
  const geminiResult = geminiCache[cacheKey];`,
`  // Local Deterministic Compliance Engine state
  const [localComplianceResult, setLocalComplianceResult] = useState<any>(null);`
);

// 2. Replace localStorage extraction logic in syncDoc to also read niyamai_compliance_result
c = c.replace(
`        if (storedFile === "RBI 24.pdf" || storedFile === "RBI24") {`,
`        const analysisStr = localStorage.getItem("niyamai_compliance_result");
        if (analysisStr) {
          try {
             const data = JSON.parse(analysisStr);
             if (data.success && data.document_name === storedFile) {
               setLocalComplianceResult(data);
             } else if (!data.success && data.document_name === storedFile) {
               setLocalComplianceResult(data);
             } else {
               setLocalComplianceResult(null);
             }
          } catch(e){}
        } else {
          setLocalComplianceResult(null);
        }

        if (storedFile === "RBI 24.pdf" || storedFile === "RBI24") {`
);

// 3. Remove handleRunGeminiAudit and handleTabClick completely
c = c.replace(/\/\/ Run live Gemini AI with automatic dual-key failover[\s\S]*?const handleTabClick = [^}]+\};\n\s*if \(\!geminiCache\[newCacheKey\]\) \{\n\s*handleRunGeminiAudit\(taskType\);\n\s*\}\n\s*\};\n/m, '');

// 4. Replace the Gemini UI block (lines 629 to 837)
const geminiUiStart = '{/* ── LIVE GEMINI AI INTELLIGENCE AUDIT CARD ──────────────────────────── */}';
const geminiUiEnd = '      {/* Two-column layout */}';

const newUi = `      {/* ── LOCAL DETERMINISTIC COMPLIANCE ENGINE AUDIT CARD ──────────────────────────── */}
      <div className="border-[3px] border-black bg-gradient-to-r from-purple-50 via-white to-blue-50 p-6 shadow-[6px_6px_0_0_#000000]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b-2 border-black pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-600 text-white border-2 border-black shadow-[2px_2px_0_0_#000000]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-2xl font-bold uppercase text-black">
                  Deterministic Compliance Engine
                </h2>
                <span className="bg-yellow-300 text-black text-[10px] font-black uppercase px-2 py-0.5 border border-black shadow-[1px_1px_0_0_#000000]">
                  Analysis Mode: Local Compliance Engine
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-600 mt-0.5">
                Executes strict deterministic local PDF text matching without any external APIs.
              </p>
            </div>
          </div>
        </div>

        {/* Local Results Box */}
        {localComplianceResult ? (
          localComplianceResult.success ? (
          <div className="border-2 border-black bg-white p-5 shadow-[4px_4px_0_0_#000000] space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-green-100 text-green-800 border border-green-300">
                  PDF SUCCESSFULLY ANALYZED
                </span>
                <span className="text-xs font-mono font-bold text-slate-600">
                  Document: {localComplianceResult.document_name}
                </span>
              </div>
              <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 border border-green-300">
                ✓ Exact Local Match
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Detected Policy:</span>
                    <p className="font-bold text-sm text-black mt-0.5">{localComplianceResult.policy_name}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-600">Compliance Issue:</span>
                    <p className="font-bold text-sm text-black mt-0.5">{localComplianceResult.compliance_issue}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Loophole:</span>
                    <p className="text-xs text-slate-700 mt-1">
                      {localComplianceResult.loophole}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Fraud Risk:</span>
                    <div className="mt-1">
                      <span className={\`px-2.5 py-1 text-xs font-black uppercase border-2 border-black shadow-[2px_2px_0_0_#000000] inline-block \${
                        localComplianceResult.fraud_risk === "High" ? "bg-red-300 text-red-950" : "bg-yellow-300 text-yellow-950"
                      }\`}>
                        {localComplianceResult.fraud_risk}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Fraud Scenario:</span>
                    <p className="text-xs text-slate-800 bg-amber-50 border border-amber-200 p-3 leading-relaxed mt-1">
                      "{localComplianceResult.fraud_scenario}"
                    </p>
                  </div>
                </div>

                <div className="border-l-0 md:border-l-2 border-black md:pl-5 space-y-4">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Affected Process:</span>
                    <p className="font-bold text-sm text-black mt-0.5">{localComplianceResult.affected_process}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Recommended Fixes:</span>
                    <ul className="mt-1.5 space-y-1.5">
                      {localComplianceResult.recommended_fixes?.map((fix: string, i: number) => (
                        <li key={i} className="text-xs text-slate-800 flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" />
                          <span>{fix}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Manager Summary:</span>
                    <p className="text-xs text-slate-800 bg-blue-50 border border-blue-200 p-3 leading-relaxed mt-1">
                      {localComplianceResult.manager_summary}
                    </p>
                  </div>
                  <div className="p-4 border-2 border-black bg-teal-100 shadow-[3px_3px_0_0_#000000]">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-800">Profit Impact:</span>
                    <div className="mt-2">
                       <span className="px-2 py-1 bg-green-300 text-black text-xs font-black uppercase border border-black">{localComplianceResult.profit_impact.classification}</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-800 mt-2"><b>Main Benefit:</b> {localComplianceResult.profit_impact.main_benefit_driver}</p>
                    <p className="text-xs font-semibold text-slate-800 mt-1"><b>Main Cost:</b> {localComplianceResult.profit_impact.main_cost_driver}</p>
                  </div>
                </div>
            </div>
          </div>
          ) : (
          <div className="p-4 bg-red-50 border-2 border-black shadow-[4px_4px_0_0_#000000] text-center text-sm font-bold text-red-900 uppercase">
            Document uploaded successfully, but no supported compliance scenario was detected.
          </div>
          )
        ) : (
          <div className="p-4 bg-white border border-dashed border-slate-300 text-center text-xs text-slate-500">
            Upload a PDF in the Impact Analysis tab to run the local compliance engine.
          </div>
        )}
      </div>

`;

const startIdx = c.indexOf(geminiUiStart);
const endIdx = c.indexOf(geminiUiEnd);
if (startIdx !== -1 && endIdx !== -1) {
    c = c.substring(0, startIdx) + newUi + c.substring(endIdx);
}

fs.writeFileSync(file, c);
