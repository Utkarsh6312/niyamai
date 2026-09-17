
const fs = require("fs");
const file = "web/src/app/login/page.tsx";
let c = fs.readFileSync(file, "utf8");

c = c.replace(`router.push("/obligation-explorer");`, `router.push("/");`);

fs.writeFileSync(file, c);
console.log("Redirect fixed!");

