
const fs = require("fs");
const file = "src/app/(dashboard)/ai-assistant/page.tsx";
let c = fs.readFileSync(file, "utf8");

const oldLogicRegex = /if \(lowerInput\.includes\("rbi"\) \|\| lowerInput\.includes\("amendment"\) \|\| lowerInput\.includes\("kyc"\)\) \{[\s\S]*?\} else \{[\s\S]*?\}/;

const newLogic = `if (lowerInput.includes("rbi") || lowerInput.includes("amendment") || lowerInput.includes("kyc")) {
        responseContent = (
          <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm p-3.5 text-[13px] text-slate-700 leading-relaxed shadow-sm">
            <p className="mb-3 font-medium">Here are the main changes in the RBI KYC Amendment 2026:</p>
            <div className="space-y-3">
              {[
                "Enhanced due diligence for higher risk customers (PEPs, non-face-to-face)",
                "Additional verification of source of funds and wealth",
                "Periodic review of customer accounts based on risk profile",
                "Stricter transaction monitoring requirements",
                "Updated record keeping and reporting obligations",
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <span className="w-5 h-5 rounded-full border border-[#2563EB] text-[#2563EB] flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">{i + 1}</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        );
      } else if (lowerInput.includes("impacts") || lowerInput.includes("bank")) {
        responseContent = (
          <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm p-3.5 text-[13px] text-slate-700 leading-relaxed shadow-sm">
            <p className="mb-3 font-medium">Based on the latest regulatory analysis, the key compliance impacts for Aarohan Bank are:</p>
            <ul className="list-disc pl-4 space-y-2 mb-2 text-red-600 font-medium">
              <li><span className="text-slate-700 font-normal"><strong>Critical:</strong> Immediate overhaul required for digital onboarding (biometric liveness checks).</span></li>
              <li><span className="text-slate-700 font-normal"><strong>High:</strong> Updates needed to the transaction monitoring systems to track politically exposed persons (PEPs) in real-time.</span></li>
              <li><span className="text-slate-700 font-normal"><strong>Medium:</strong> Periodic review cycles for medium-risk accounts must be shortened from 8 years to 5 years.</span></li>
            </ul>
            <p className="mt-3 text-slate-500">Would you like me to map these impacts to our internal policy documents?</p>
          </div>
        );
      } else if (lowerInput.includes("departments") || lowerInput.includes("affected")) {
        responseContent = (
          <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm p-3.5 text-[13px] text-slate-700 leading-relaxed shadow-sm">
            <p className="mb-3 font-medium">The following departments are primarily affected by recent amendments:</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
                <span className="font-semibold text-[#0F172A]">Retail Banking</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red/10 text-red">High Impact</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
                <span className="font-semibold text-[#0F172A]">Compliance & Risk</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red/10 text-red">High Impact</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
                <span className="font-semibold text-[#0F172A]">IT / Digital Channels</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-500/10 text-orange-600">Medium Impact</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
                <span className="font-semibold text-[#0F172A]">Legal</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal/10 text-teal">Low Impact</span>
              </div>
            </div>
          </div>
        );
      } else if (lowerInput.includes("action") || lowerInput.includes("timelines")) {
        responseContent = (
          <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm p-3.5 text-[13px] text-slate-700 leading-relaxed shadow-sm">
            <p className="mb-3 font-medium">I have generated the following recommended action items and timelines:</p>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="p-2 font-semibold text-slate-600">Action Item</th>
                    <th className="p-2 font-semibold text-slate-600">Timeline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-2">Update KYC SOP Section 3.2 for biometric liveness</td>
                    <td className="p-2 font-semibold text-red">30 Days</td>
                  </tr>
                  <tr>
                    <td className="p-2">Implement automated PEP database screening</td>
                    <td className="p-2 font-semibold text-orange-600">60 Days</td>
                  </tr>
                  <tr>
                    <td className="p-2">Conduct compliance training for retail staff</td>
                    <td className="p-2 font-semibold text-slate-600">90 Days</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 flex gap-2">
              <button className="bg-[#2563EB] text-white px-3 py-1.5 rounded-md text-[11px] font-semibold hover:bg-blue-700 transition-colors">Assign Actions</button>
            </div>
          </div>
        );
      } else {
        responseContent = (
          <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm p-3.5 text-[13px] text-slate-700 leading-relaxed shadow-sm">
            <p className="font-medium">I have analyzed your request regarding "{userMsg.content}". Based on our policy library and current regulations, I recommend reviewing the compliance mapping for this area to ensure full adherence.</p>
          </div>
        );
      }`;

c = c.replace(oldLogicRegex, newLogic);
fs.writeFileSync(file, c);
console.log("Chatbot trained");

