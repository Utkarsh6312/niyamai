const fs = require('fs');

const dataFile = 'src/lib/data/rbi-analysis-data.ts';
let dataContent = fs.readFileSync(dataFile, 'utf8');

const newData = `
// --- GENERATED ROTATION DATA (3 MORE SCENARIOS) ---
export const scenario3Findings: RbiFinding[] = rbiKycAnalysisFindings.map(f => ({
  ...f,
  id: f.id + "-3",
  obligationTitle: f.obligationTitle.replace("KYC", "AML").replace("V-CIP", "Transaction Monitoring"),
  obligationCode: f.obligationCode.replace("KYC", "AML"),
  riskLevel: f.riskLevel === "Critical" ? "High" : "Medium",
  departments: ["Fraud Operations", "Compliance"]
}));
export const scenario3Stats = {
  ...rbiSummaryStats,
  documentTitle: "RBI Transaction Monitoring and AML Guidelines, 2026",
  totalMaterialChanges: 22,
  obligationsExtracted: 8,
  criticalGaps: 0,
  highGaps: 4,
  affectedDepartments: ["Fraud Operations", "Compliance", "IT Systems"]
};

export const scenario4Findings: RbiFinding[] = rbi24AnalysisFindings.map(f => ({
  ...f,
  id: f.id + "-4",
  obligationTitle: f.obligationTitle.replace("Digital Lending", "Mobile Banking Security"),
  obligationCode: f.obligationCode.replace("DLA", "MOB"),
  riskLevel: "Critical",
  departments: ["Information Security", "Digital Channels"]
}));
export const scenario4Stats = {
  ...rbi24SummaryStats,
  documentTitle: "RBI Master Direction - Mobile Banking Authentication",
  totalMaterialChanges: 11,
  obligationsExtracted: 3,
  criticalGaps: 3,
  highGaps: 0,
  affectedDepartments: ["Information Security", "Digital Channels", "Risk Management"]
};

export const scenario5Findings: RbiFinding[] = rbiKycAnalysisFindings.map(f => ({
  ...f,
  id: f.id + "-5",
  obligationTitle: f.obligationTitle.replace("KYC", "Dormant Accounts").replace("V-CIP", "Reactivation"),
  obligationCode: f.obligationCode.replace("KYC", "DORM"),
  riskLevel: "Medium",
  departments: ["Branch Operations", "Customer Support"]
}));
export const scenario5Stats = {
  ...rbiSummaryStats,
  documentTitle: "RBI Guidelines on Dormant Account Management",
  totalMaterialChanges: 7,
  obligationsExtracted: 4,
  criticalGaps: 1,
  highGaps: 1,
  affectedDepartments: ["Branch Operations", "Customer Support", "Audit"]
};

export const ALL_SCENARIOS = [
  { findings: rbiKycAnalysisFindings, stats: rbiSummaryStats },
  { findings: rbi24AnalysisFindings, stats: rbi24SummaryStats },
  { findings: scenario3Findings, stats: scenario3Stats },
  { findings: scenario4Findings, stats: scenario4Stats },
  { findings: scenario5Findings, stats: scenario5Stats },
];
`;

if (!dataContent.includes('ALL_SCENARIOS')) {
  fs.appendFileSync(dataFile, newData);
}

const pageFile = 'src/app/(dashboard)/impact-analysis/page.tsx';
let pageContent = fs.readFileSync(pageFile, 'utf8');

// Update imports
pageContent = pageContent.replace(
  "import { rbiKycAnalysisFindings, rbiSummaryStats, rbi24AnalysisFindings, rbi24SummaryStats, RbiFinding } from \"@/lib/data/rbi-analysis-data\";",
  "import { ALL_SCENARIOS, RbiFinding } from \"@/lib/data/rbi-analysis-data\";"
);

// We need to inject the active scenario state inside the component
// Locate: const [search, setSearch] = useState("");
pageContent = pageContent.replace(
  'const [search, setSearch] = useState("");',
  `const [uploadIndex, setUploadIndex] = useState(0);
  const [search, setSearch] = useState("");`
);

// Delete the old static derivations
pageContent = pageContent.replace(
  `  const isRbi24 = uploadedFileName.includes("24");
  const currentFindings = isRbi24 ? rbi24AnalysisFindings : rbiKycAnalysisFindings;
  const currentStats = isRbi24 ? rbi24SummaryStats : rbiSummaryStats;`,
  `  const activeScenario = ALL_SCENARIOS[uploadIndex] || ALL_SCENARIOS[0];
  const currentFindings = activeScenario.findings;
  const currentStats = activeScenario.stats;`
);

// In useEffect for initialization
// Update `stored === "true"` block to also read counter
const initBlockOld = `if (stored === "true") {
        setHasAnalyzed(true);
        setUploadedFileName(localStorage.getItem("niyamai_file_name") || "RBI_KYC_Master_Direction_2025.pdf");
      }`;
const initBlockNew = `if (stored === "true") {
        setHasAnalyzed(true);
        setUploadedFileName(localStorage.getItem("niyamai_file_name") || "RBI_KYC_Master_Direction_2025.pdf");
        const count = parseInt(localStorage.getItem("niyamai_upload_counter") || "1");
        setUploadIndex((count - 1) % 5);
      }`;
pageContent = pageContent.replace(initBlockOld, initBlockNew);

// In `tick` function logic
// Locate `const _is24` inside tick
const tickLogicOld = `          const _is24 = fileName.includes("24");
          const _findings = _is24 ? rbi24AnalysisFindings : rbiKycAnalysisFindings;
          const _stats = _is24 ? rbi24SummaryStats : rbiSummaryStats;`;
const tickLogicNew = `          const countStr = localStorage.getItem("niyamai_upload_counter") || "1";
          const count = parseInt(countStr);
          const newIdx = (count - 1) % 5;
          setUploadIndex(newIdx);
          const _findings = ALL_SCENARIOS[newIdx].findings;
          const _stats = ALL_SCENARIOS[newIdx].stats;`;
pageContent = pageContent.replace(tickLogicOld, tickLogicNew);

fs.writeFileSync(pageFile, pageContent);

console.log("Updated files for Impact Analysis round-robin loop!");
