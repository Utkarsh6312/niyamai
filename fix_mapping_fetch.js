
const fs = require("fs");
const file = "web/src/app/(dashboard)/policy-mapping/page.tsx";
let c = fs.readFileSync(file, "utf8");

const oldFetch = `        try {
          let targetObId = obId;
          if (!targetObId) {
            const obs = await api.obligations({ limit: 20 });
            targetObId = obs.find(o => o.status !== "Not Started")?.id || (obs.length > 0 ? obs[0].id : null);
          }
  
          if (targetObId) {
            const [ob, maps] = await Promise.all([
              api.obligation(targetObId),
              api.obligationMappings(targetObId)
            ]);
            setObligation(ob);
            if (maps.length > 0) {
              setMapping(maps[0]);
              setGaps((maps[0] as any).gaps || []);
            }`;

const newFetch = `        try {
          let targetObId = obId;
          let ob = null;
          let maps = [];
          
          if (targetObId) {
            [ob, maps] = await Promise.all([
              api.obligation(targetObId),
              api.obligationMappings(targetObId)
            ]);
          } else {
            const obs = await api.obligations({ limit: 20 });
            // Try to find one with a mapping
            for (const o of obs) {
              const oMaps = await api.obligationMappings(o.id);
              if (oMaps && oMaps.length > 0) {
                targetObId = o.id;
                ob = await api.obligation(o.id);
                maps = oMaps;
                break;
              }
            }
            // Fallback
            if (!targetObId && obs.length > 0) {
              targetObId = obs[0].id;
              ob = await api.obligation(targetObId);
              maps = [];
            }
          }
  
          if (targetObId) {
            setObligation(ob);
            if (maps.length > 0) {
              setMapping(maps[0]);
              setGaps((maps[0] as any).gaps || []);
            }`;

c = c.replace(oldFetch, newFetch);

fs.writeFileSync(file, c);
console.log("Fixed mapping data fetch!");

