const fs = require('fs');
const file = 'src/app/(dashboard)/compliance-issues/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /className="w-full max-w-\[80px\] bg-indigo-500 border-\[3px\] border-black shadow-\[4px_0_0_0_#000000\] relative transition-all duration-300 group-hover:bg-indigo-400 group-hover:-translate-y-2"/;

const replacement = `className={"w-full max-w-[80px] border-[3px] border-black shadow-[4px_0_0_0_#000000] relative transition-all duration-300 group-hover:-translate-y-2 " + ['bg-fuchsia-500 hover:bg-fuchsia-400', 'bg-purple-500 hover:bg-purple-400', 'bg-violet-500 hover:bg-violet-400', 'bg-indigo-500 hover:bg-indigo-400', 'bg-blue-500 hover:bg-blue-400', 'bg-cyan-500 hover:bg-cyan-400'][idx % 6]}`;

if(content.match(regex)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(file, content);
    console.log("Replaced trend colors");
} else {
    console.log("Not found");
}
