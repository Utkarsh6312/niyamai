
const fs = require("fs");
const file = "web/src/app/(dashboard)/settings/page.tsx";
let c = fs.readFileSync(file, "utf8");

c = c.replace(
  /<div className="bg-white border-\[3px\] border-black rounded-none shadow-\[5px_5px_0_0_#000000\] p-6">[\s\r\n]*<h2 className="font-serif text-xl font-bold text-\[#0F172A\] mb-1">General Settings<\/h2>/,
  `{activeTab === "General" ? (
          <div className="bg-white border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] p-6">
            <h2 className="font-serif text-xl font-bold text-[#0F172A] mb-1">General Settings</h2>`
);

c = c.replace(
  /<\/div>[\s\r\n]*<\/div>[\s\r\n]*<\/div>[\s\r\n]*{\/\* Right Sidebar \*\/}/,
  `</div>
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

        {/* Right Sidebar */}`
);

fs.writeFileSync(file, c);
console.log("Conditional rendered fixed!");

