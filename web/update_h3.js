const fs = require('fs');

const impactPath = 'src/app/(dashboard)/impact-analysis/page.tsx';
let impactContent = fs.readFileSync(impactPath, 'utf8');

impactContent = impactContent.replace(/<h3 className="font-bold text-lg">/g, '<h3 className="font-serif font-bold text-lg">');
impactContent = impactContent.replace(/<h3 className="font-bold">/g, '<h3 className="font-serif font-bold">');

fs.writeFileSync(impactPath, impactContent);
