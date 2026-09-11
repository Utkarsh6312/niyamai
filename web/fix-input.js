
const fs = require("fs");
const file = "src/app/(dashboard)/ai-assistant/page.tsx";
let c = fs.readFileSync(file, "utf8");

c = c.replace("{/* Chat Input */}", `{/* Chat Input */}
        <div className="p-4 bg-white border-t border-slate-100">
          <div className="relative flex items-center">
            <button className="absolute left-3 text-slate-400 hover:text-slate-600 transition-colors">
              <Paperclip className="w-4 h-4" />
            </button>
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a follow-up question..." 
              className="w-full pl-9 pr-11 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#2563EB] bg-white placeholder:text-slate-400"
            />
            <button 
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
              className="absolute right-1.5 w-7 h-7 rounded-md bg-[#2563EB] text-white flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm"
            >
              <Send className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>
          <p className="text-center text-[9px] text-slate-400 font-medium mt-2.5">
            NiyamAI may make mistakes. Please verify critical information.
          </p>
        </div>`);

fs.writeFileSync(file, c);
console.log("Input fixed");

