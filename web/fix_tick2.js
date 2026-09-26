const fs = require('fs');
const file = 'src/app/(dashboard)/impact-analysis/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /const _is24 = fileName\.includes\("24"\);\s*const _findings = _is24 \? rbi24AnalysisFindings : rbiKycAnalysisFindings;\s*const _stats = _is24 \? rbi24SummaryStats : rbiSummaryStats;/g;

const replacement = `const countStr = localStorage.getItem("niyamai_upload_counter") || "1";
          const count = parseInt(countStr);
          const newIdx = (count - 1) % 5;
          setUploadIndex(newIdx);
          const _findings = ALL_SCENARIOS[newIdx].findings;
          const _stats = ALL_SCENARIOS[newIdx].stats;`;

content = content.replace(regex, replacement);
fs.writeFileSync(file, content);
console.log("Replaced tick logic successfully.");
