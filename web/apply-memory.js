
const fs = require("fs");
const file = "src/app/(dashboard)/ai-assistant/page.tsx";
let c = fs.readFileSync(file, "utf8");

const setTimeoutStart = c.indexOf("setTimeout(() => {");
if (setTimeoutStart === -1) {
  console.log("Could not find setTimeout");
  process.exit(1);
}

const ifRbiStart = c.indexOf("if (lowerInput.includes(\"rbi\")");
if (ifRbiStart === -1) {
  console.log("Could not find ifRbi");
  process.exit(1);
}

const beforeRbi = c.substring(0, ifRbiStart);
const afterRbi = c.substring(ifRbiStart);

const memoryLogic = `      // Simple memory extraction from previous messages
      let userName = "";
      const allMessages = [...messages, userMsg];
      const nameMatch = [...allMessages]
        .filter(m => m.role === "user")
        .map(m => m.content?.toString().toLowerCase() || "")
        .reverse()
        .find(text => text.includes("my name is") || text.includes("i am"));
      
      if (nameMatch) {
        if (nameMatch.includes("my name is")) {
           userName = nameMatch.split("my name is")[1].trim().split(" ")[0];
        } else if (nameMatch.includes("i am")) {
           userName = nameMatch.split("i am")[1].trim().split(" ")[0];
        }
        if (userName) userName = userName.charAt(0).toUpperCase() + userName.slice(1);
      }

      if (lowerInput.includes("what is my name") || lowerInput.includes("do you know my name")) {
        responseContent = (
          <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm p-3.5 text-[13px] text-slate-700 leading-relaxed shadow-sm">
            <p className="font-medium">
              {userName ? \`Your name is \${userName}!\` : "I don't think you've told me your name yet. What is it?"}
            </p>
          </div>
        );
      } else if (lowerInput.includes("my name is") || lowerInput.includes("i am")) {
        responseContent = (
          <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm p-3.5 text-[13px] text-slate-700 leading-relaxed shadow-sm">
            <p className="font-medium">Nice to meet you, {userName}! How can I help you with your compliance tasks today?</p>
          </div>
        );
      } else `;

const newContent = beforeRbi + memoryLogic + afterRbi;
fs.writeFileSync(file, newContent);
console.log("Success");

