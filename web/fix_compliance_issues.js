const fs = require('fs');
const file = 'src/app/(dashboard)/compliance-issues/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /useEffect\(\(\) => \{[\s\S]*?\}, \[\]\);/;

const replacement = `useEffect(() => {
    const syncData = () => {
      if (typeof window !== "undefined") {
        const storedFile = localStorage.getItem("niyamai_file_name") || "Demo_Compliance_Policy.pdf";
        setDocName(storedFile);
        const count = parseInt(localStorage.getItem("niyamai_upload_counter") || "1");
        
        const analysisStr = localStorage.getItem("niyamai_compliance_result");
        if (analysisStr) {
            try {
               const data = JSON.parse(analysisStr);
               if (data.document_fingerprint) {
                   setFingerprint(data.document_fingerprint);
               }
            } catch(e) {}
        }
  
        const idx = (count - 1) % 5;
        setActiveData(DASHBOARDS[idx]);
      }
    };
    syncData();
    window.addEventListener("storage", syncData);
    // polling fallback just in case storage event doesn't fire in same tab
    const interval = setInterval(syncData, 1000);
    return () => {
      window.removeEventListener("storage", syncData);
      clearInterval(interval);
    };
  }, []);`;

content = content.replace(regex, replacement);
fs.writeFileSync(file, content);
console.log("Replaced");
