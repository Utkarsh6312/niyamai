
const fs = require("fs");
const file = "web/src/app/login/page.tsx";
let c = fs.readFileSync(file, "utf8");

// 1. Add Eye to imports
c = c.replace(
  `import { ArrowRight, Building2, EyeOff, Globe, Lock, Mail, ShieldCheck, FileText, Search, BarChart3, Zap } from "lucide-react";`,
  `import { ArrowRight, Building2, Eye, EyeOff, Globe, Lock, Mail, ShieldCheck, FileText, Search, BarChart3, Zap } from "lucide-react";`
);

// 2. Add state
c = c.replace(
  `const [error, setError] = useState("");`,
  `const [error, setError] = useState("");\n  const [showPassword, setShowPassword] = useState(false);`
);

// 3. Update input type
c = c.replace(
  `type="password"`,
  `type={showPassword ? "text" : "password"}`
);

// 4. Update button and icon
const btnOld = `<button type="button" className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                         <EyeOff className="w-[18px] h-[18px]" />
                      </button>`;

const btnNew = `<button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                         {showPassword ? <Eye className="w-[18px] h-[18px]" /> : <EyeOff className="w-[18px] h-[18px]" />}
                      </button>`;

c = c.replace(btnOld, btnNew);

fs.writeFileSync(file, c);
console.log("Eye button fixed!");

