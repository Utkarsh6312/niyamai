const fs = require('fs');
let file = 'src/app/(dashboard)/impact-analysis/page.tsx';
let c = fs.readFileSync(file, 'utf8');
c = c.replace('fetch(`${apiUrl}/ingestion/upload`, { method: "POST", body: formData }).catch(console.error);\n    }', 
`fetch(\`\${apiUrl}/ingestion/upload\`, { method: "POST", body: formData }).catch(console.error);

      // Trigger local deterministic compliance engine
      const complianceData = new FormData();
      complianceData.append("file", fileOrName);
      fetch(\`\${apiUrl}/analyze-policy-pdf\`, { method: "POST", body: complianceData })
        .then(r => r.json())
        .then(data => {
            if (typeof window !== "undefined") {
                localStorage.setItem("niyamai_compliance_result", JSON.stringify(data));
            }
        })
        .catch(console.error);
    }`);
fs.writeFileSync(file, c);
