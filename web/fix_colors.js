const fs = require('fs');
const file = 'src/app/(dashboard)/compliance-issues/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /<div className="w-full h-4 bg-slate-200 border-2 border-black rounded-none">[\s\S]*?<div\s*className="h-full bg-indigo-500 border-r-2 border-black flex items-center justify-end px-1"[\s\S]*?style={{ width: `\$\{fraud\.rate\}%` }}[\s\S]*?>[\s\S]*?<span className="text-\[9px\] font-black text-white">{fraud\.rate}%<\/span>[\s\S]*?<\/div>[\s\S]*?<\/div>/;

const replacement = `<div className={"w-full h-4 border-2 border-black rounded-none " + ['bg-rose-100','bg-emerald-100','bg-sky-100','bg-amber-100','bg-fuchsia-100'][idx % 5]}>
                    <div 
                      className={"h-full border-r-2 border-black flex items-center justify-end px-1 " + ['bg-rose-500','bg-emerald-500','bg-sky-500','bg-amber-500','bg-fuchsia-500'][idx % 5]}
                      style={{ width: \`\${fraud.rate}%\` }}
                    >
                      <span className="text-[9px] font-black text-white">{fraud.rate}%</span>
                    </div>
                  </div>`;

if(content.match(regex)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(file, content);
    console.log("Replaced");
} else {
    console.log("Not found");
}
