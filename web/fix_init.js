const fs = require('fs');
const file = 'src/app/(dashboard)/impact-analysis/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const regex2 = /if \(stored === "true"\) \{\s*setHasAnalyzed\(true\);\s*setUploadedFileName\(localStorage\.getItem\("niyamai_file_name"\) \|\| "RBI_KYC_Master_Direction_2025\.pdf"\);\s*\}/g;

const replacement2 = `if (stored === "true") {
        setHasAnalyzed(true);
        setUploadedFileName(localStorage.getItem("niyamai_file_name") || "RBI_KYC_Master_Direction_2025.pdf");
        const count = parseInt(localStorage.getItem("niyamai_upload_counter") || "1");
        setUploadIndex((count - 1) % 5);
      }`;

content = content.replace(regex2, replacement2);
fs.writeFileSync(file, content);
console.log("Done initialization block");
