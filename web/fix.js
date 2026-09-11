
const fs = require('fs');

let c1 = fs.readFileSync('src/app/(dashboard)/policy-mapping/page.tsx', 'utf8');
c1 = c1.replace(/mapping\.mapping_rationale/g, '(mapping as any).mapping_rationale');
c1 = c1.replace(/gap\.gap_type/g, '(gap as any).gap_type');
c1 = c1.replace(/gap\.gap_description/g, '(gap as any).gap_description');
fs.writeFileSync('src/app/(dashboard)/policy-mapping/page.tsx', c1);

let c2 = fs.readFileSync('src/components/graphs/TraceGraph.tsx', 'utf8');
c2 = c2.replace(/useState\(\[\]\);/g, 'useState<any[]>([]);');
fs.writeFileSync('src/components/graphs/TraceGraph.tsx', c2);

console.log('Fixed');

