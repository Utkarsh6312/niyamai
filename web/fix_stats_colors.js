const fs = require('fs');
const file = 'src/app/(dashboard)/compliance-issues/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /className="border-\[3px\] border-black bg-card p-5 flex flex-col justify-between shadow-\[5px_5px_0_0_#000000\] hover:shadow-\[2px_2px_0_0_#000000\] hover:translate-x-\[3px\] hover:translate-y-\[3px\] transition-all"/;

const replacement = `className={"border-[3px] border-black p-5 flex flex-col justify-between shadow-[5px_5px_0_0_#000000] hover:shadow-[2px_2px_0_0_#000000] hover:translate-x-[3px] hover:translate-y-[3px] transition-all " + ['bg-green-50','bg-red-50','bg-teal-50','bg-indigo-50'][index % 4]}`;

if(content.match(regex)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(file, content);
    console.log("Replaced stat cards");
} else {
    console.log("Not found");
}
