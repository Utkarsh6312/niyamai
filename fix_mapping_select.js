
const fs = require("fs");
const file = "web/src/app/(dashboard)/policy-mapping/page.tsx";
let c = fs.readFileSync(file, "utf8");

c = c.replace(
  `targetObId = obs.find(o => o.status !== "Not Started")?.id || null;`,
  `targetObId = obs.find(o => o.status !== "Not Started")?.id || (obs.length > 0 ? obs[0].id : null);`
);

fs.writeFileSync(file, c);
console.log("Fixed obligation selection!");

