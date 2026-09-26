const fs = require('fs');
let file = 'src/app/(dashboard)/compliance-issues/page.tsx';
let c = fs.readFileSync(file, 'utf8');

// 1. Remove gemini imports and states
c = c.replace(/const \[geminiLoading.*?\n/g, '');
c = c.replace(/const \[geminiCache.*?\n/g, '');
c = c.replace(/const \[activeGeminiTask.*?\n/g, '');
c = c.replace(/const cacheKey = .*?\n/g, '');
c = c.replace(/const geminiResult = .*?\n/g, '');

// Insert new state
c = c.replace('const [customFileName, setCustomFileName] = useState<string>("");', 'const [customFileName, setCustomFileName] = useState<string>("");\n  const [localComplianceResult, setLocalComplianceResult] = useState<any>(null);');

// Read from localStorage inside useEffect syncDoc
c = c.replace('setCustomFileName(storedFile);', 'setCustomFileName(storedFile);\n        }\n\n        const analysisResult = localStorage.getItem("niyamai_compliance_result");\n        if (analysisResult) {\n          try {\n            setLocalComplianceResult(JSON.parse(analysisResult));\n          } catch (e) {}\n        }');

// 2. Remove handleRunGeminiAudit and handleTabClick completely
c = c.replace(/\/\/ Run live Gemini AI with automatic dual-key failover[\s\S]*?const handleTabClick = [^}]+\};\n\s*if \(\!geminiCache\[newCacheKey\]\) \{\n\s*handleRunGeminiAudit\(taskType\);\n\s*\}\n\s*\};\n/m, '');

// Wait, the regex might be tricky. I'll just write the file completely if needed, but it's 983 lines.
