
const fs = require("fs");
const file = "web/src/app/login/page.tsx";
let c = fs.readFileSync(file, "utf8");

// We need to add state for email, password, loading, error, and useRouter
const imports = `import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api/client";`;

// Add it after "use client";
c = c.replace(`"use client";`, `"use client";\n\n${imports}`);

const formLogic = `  const router = useRouter();
  const [email, setEmail] = useState("aarav.sharma@aarohanbank.com");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Create login endpoint manually since client.ts doesnt have it
      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }
      
      const data = await res.json();
      // Store in localStorage for prototype auth persistence
      localStorage.setItem("user", JSON.stringify(data));
      
      // Redirect to dashboard
      router.push("/obligation-explorer");
    } catch (err: any) {
      setError(err.message || "Failed to log in");
    } finally {
      setLoading(false);
    }
  };`;

// Insert inside the component
c = c.replace(`export default function LoginPage() {`, `export default function LoginPage() {\n${formLogic}`);

// Replace the form
c = c.replace(
  `<form className="space-y-5" onSubmit={(e) => e.preventDefault()}>`,
  `<form className="space-y-5" onSubmit={handleLogin}>`
);

// Bind email
c = c.replace(
  `<input 
                         type="email" 
                         defaultValue="aarav.sharma@aarohanbank.com"`,
  `<input 
                         type="email" 
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}`
);

// Bind password
c = c.replace(
  `<input 
                         type="password" 
                         defaultValue="password123"`,
  `<input 
                         type="password" 
                         value={password}
                         onChange={(e) => setPassword(e.target.value)}`
);

// Show error if exists
c = c.replace(
  `             <form className="space-y-5" onSubmit={handleLogin}>`,
  `             {error && <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm mb-4 border border-red-100">{error}</div>}
             <form className="space-y-5" onSubmit={handleLogin}>`
);

// Replace button (remove Link wrapper and make it type="submit")
const btnOld = `<Link href="/" className="block mt-2">
                   <button type="button" className="w-full py-3 bg-[#0f5ff9] hover:bg-blue-700 text-white rounded-xl font-semibold text-[14px] flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow">
                      Sign In <ArrowRight className="w-4 h-4" />
                   </button>
                </Link>`;

const btnNew = `<div className="block mt-2">
                   <button type="submit" disabled={loading} className="w-full py-3 bg-[#0f5ff9] hover:bg-blue-700 text-white rounded-xl font-semibold text-[14px] flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow disabled:opacity-50">
                      {loading ? "Signing in..." : "Sign In"} <ArrowRight className="w-4 h-4" />
                   </button>
                </div>`;

c = c.replace(btnOld, btnNew);

fs.writeFileSync(file, c);
console.log("Login page modified!");

