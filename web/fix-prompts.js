
const fs = require("fs");
const file = "src/app/(dashboard)/ai-assistant/page.tsx";
let c = fs.readFileSync(file, "utf8");

const p1 = "onClick={() => handleSend(`Summarize RBI KYC Amendment 2026`)} className";
const p2 = "onClick={() => handleSend(`What are the key compliance impacts for our bank?`)} className";
const p3 = "onClick={() => handleSend(`Which departments are affected?`)} className";
const p4 = "onClick={() => handleSend(`Suggest action items with timelines`)} className";

c = c.replace(
  /<button className="bg-white border border-slate-200 rounded-lg p-3 flex items-center gap-3 hover:border-\[#2563EB\] hover:shadow-sm transition-all text-left group">([\s\S]*?)<span className="text-sm font-medium text-slate-700 leading-tight">"Summarize RBI KYC Amendment 2026"<\/span>/g,
  `<button ${p1}="bg-white border border-slate-200 rounded-lg p-3 flex items-center gap-3 hover:border-[#2563EB] hover:shadow-sm transition-all text-left group">$1<span className="text-sm font-medium text-slate-700 leading-tight">"Summarize RBI KYC Amendment 2026"</span>`
);

c = c.replace(
  /<button className="bg-white border border-slate-200 rounded-lg p-3 flex items-center gap-3 hover:border-\[#2563EB\] hover:shadow-sm transition-all text-left group">([\s\S]*?)<span className="text-sm font-medium text-slate-700 leading-tight">"What are the key compliance impacts for our bank\?"<\/span>/g,
  `<button ${p2}="bg-white border border-slate-200 rounded-lg p-3 flex items-center gap-3 hover:border-[#2563EB] hover:shadow-sm transition-all text-left group">$1<span className="text-sm font-medium text-slate-700 leading-tight">"What are the key compliance impacts for our bank?"</span>`
);

c = c.replace(
  /<button className="bg-white border border-slate-200 rounded-lg p-3 flex items-center gap-3 hover:border-\[#2563EB\] hover:shadow-sm transition-all text-left group">([\s\S]*?)<span className="text-sm font-medium text-slate-700 leading-tight">"Which departments are affected\?"<\/span>/g,
  `<button ${p3}="bg-white border border-slate-200 rounded-lg p-3 flex items-center gap-3 hover:border-[#2563EB] hover:shadow-sm transition-all text-left group">$1<span className="text-sm font-medium text-slate-700 leading-tight">"Which departments are affected?"</span>`
);

c = c.replace(
  /<button className="bg-white border border-slate-200 rounded-lg p-3 flex items-center gap-3 hover:border-\[#2563EB\] hover:shadow-sm transition-all text-left group">([\s\S]*?)<span className="text-sm font-medium text-slate-700 leading-tight">"Suggest action items with timelines"<\/span>/g,
  `<button ${p4}="bg-white border border-slate-200 rounded-lg p-3 flex items-center gap-3 hover:border-[#2563EB] hover:shadow-sm transition-all text-left group">$1<span className="text-sm font-medium text-slate-700 leading-tight">"Suggest action items with timelines"</span>`
);

fs.writeFileSync(file, c);
console.log("Done");

