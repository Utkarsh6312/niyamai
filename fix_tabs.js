
const fs = require("fs");
const file = "web/src/app/(dashboard)/settings/page.tsx";
let c = fs.readFileSync(file, "utf8");

// 1. Add state
c = c.replace(
  `export default function Settings() {`,
  `export default function Settings() {\n  const [activeTab, setActiveTab] = useState("General");`
);

// 2. Fix mapping
c = c.replace(
  /className={\`flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors border-l-2 \$\{\s*item\.active\s*\?\s*"bg-blue-50\/50 border-\[#2563EB\]"\s*:\s*"border-transparent hover:bg-slate-50"\s*\}\`}/,
  `onClick={() => setActiveTab(item.name)}\n              className={\`flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors border-l-2 \${activeTab === item.name ? "bg-blue-50/50 border-[#2563EB]" : "border-transparent hover:bg-slate-50"}\`}`
);

c = c.replace(
  `<div className={\`mt-0.5 \${item.active ? "text-[#2563EB]" : "text-slate-500"}\`}>`,
  `<div className={\`mt-0.5 \${activeTab === item.name ? "text-[#2563EB]" : "text-slate-500"}\`}>`
);

c = c.replace(
  `<p className={\`text-sm font-semibold \${item.active ? "text-[#0F172A]" : "text-slate-700"}\`}>{item.name}</p>`,
  `<p className={\`text-sm font-semibold \${activeTab === item.name ? "text-[#0F172A]" : "text-slate-700"}\`}>{item.name}</p>`
);

// 3. Conditional rendering of content
const generalStart = `<div className="bg-white border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] p-6">
            <h2 className="font-serif text-xl font-bold text-[#0F172A] mb-1">General Settings</h2>`;
const generalEnd = `</div>
          </div>
        </div>

        {/* Right Sidebar */}`;

const newGeneralStart = `{activeTab === "General" ? (
          <div className="bg-white border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] p-6">
            <h2 className="font-serif text-xl font-bold text-[#0F172A] mb-1">General Settings</h2>`;
            
const newGeneralEnd = `</div>
          </div>
          ) : (
            <div className="bg-white border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] p-6">
              <h2 className="font-serif text-xl font-bold text-[#0F172A] mb-1">{activeTab}</h2>
              <p className="text-sm text-slate-500 mb-6">Manage settings and preferences for {activeTab}.</p>
              <div className="flex flex-col items-center justify-center p-12 text-slate-400 gap-4 border-2 border-dashed border-slate-200 bg-slate-50 rounded-xl">
                <SettingsIcon className="w-8 h-8 opacity-50" />
                <p>This settings panel is currently under construction.</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar */}`;

c = c.replace(generalStart, newGeneralStart).replace(generalEnd, newGeneralEnd);

fs.writeFileSync(file, c);
console.log("Tabs fixed!");

