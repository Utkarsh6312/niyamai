const fs = require('fs');
const path = 'C:\\\\Users\\\\INDRANIL\\\\OneDrive\\\\Desktop\\\\hackathon\\\\niyamai\\\\web\\\\src\\\\app\\\\(dashboard)\\\\compliance-issues\\\\page.tsx';
let content = fs.readFileSync(path, 'utf8');

const extraRows = `
      { name: "Cross-Border Transaction Limits", date: "May 2026", before: 89, after: 12, impact: "Positive", status: "Active" },
      { name: "Real-time PEP Screening", date: "Jun 2026", before: 154, after: 28, impact: "Positive", status: "Active" },
      { name: "Beneficial Ownership Validation", date: "Aug 2026", before: 67, after: 94, impact: "Negative", status: "Under Review" },
      { name: "Digital Lending Fraud Controls", date: "Oct 2026", before: 412, after: 65, impact: "Positive", status: "Active" },
      { name: "Algorithmic Surveillance Audits", date: "Nov 2026", before: 210, after: 33, impact: "Positive", status: "Active" },
      { name: "Third-Party API Rate Limiting", date: "Dec 2026", before: 340, after: 41, impact: "Positive", status: "Active" },
`;

content = content.replace(/policyHistory:\s*\[/g, (match) => match + extraRows);

fs.writeFileSync(path, content, 'utf8');
console.log('Done');
