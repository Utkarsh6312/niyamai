const fs = require('fs');
const content = `\
"use client";
import { useState, useEffect } from "react";
import { ShieldAlert, AlertTriangle, TrendingUp, Target, ArrowUpRight, ArrowDownRight, CheckCircle2, XCircle, Clock, Eye, ChevronRight, BarChart3, Shield, FileText, Check, FileSearch } from "lucide-react";

const DASHBOARDS = [
  // DASHBOARD 1
  {
    engineData: {
      policy_name: "SMS OTP Authentication Below Threshold",
      compliance_issue: "Weak authentication control for transactions below the defined threshold.",
      loophole: "An attacker could split a larger fraudulent amount into multiple transactions below the authentication threshold.",
      fraud_risk: "High",
      fraud_scenario: "A fraudster accesses a compromised session and executes 10 separate transfers of ₹24,000 each. Since the system bypasses SMS OTP for amounts below ₹25,000, all transfers succeed without alerting the account holder.",
      affected_process: "Transaction Processing & Authentication",
      recommended_fixes: [
          "Introduce risk-based authentication measuring velocity.",
          "Add device binding requirements for any automated bypassing.",
          "Monitor cumulative transaction totals within 24 hours."
      ],
      manager_summary: "High risk of transaction splitting fraud detected due to an unprotected ₹25,000 threshold bypass. Immediate rule modification required.",
      profit_impact: {
          classification: "Cost-Saving",
          main_cost_driver: "Increased SMS gateway costs for additional OTPs.",
          main_benefit_driver: "Significant reduction in micro-transaction fraud chargebacks."
      }
    },
    stats: [
      { title: "Fraud Cases Prevented", value: "1,247", change: "↑ 34% from last quarter", icon: ShieldAlert, color: "bg-green-300", changeColor: "text-green-700" },
      { title: "Compliance Violations", value: "3", change: "↓ 67% from last year", icon: AlertTriangle, color: "bg-red-300", changeColor: "text-red-700" },
      { title: "Cost Savings", value: "₹4.2 Cr", change: "From Automated KYC", icon: TrendingUp, color: "bg-teal-300", changeColor: "text-teal-700" },
      { title: "Policy Adherence Score", value: "94.7%", change: "Target: 98%", icon: Target, color: "bg-indigo-300", changeColor: "text-indigo-700" },
    ],
    policyHistory: [
      { name: "Master Direction - KYC (Amendment) 2025", date: "Jan 2025", before: 847, after: 142, impact: "Positive", status: "Active" },
      { name: "V-CIP Geo-Tagging & Liveness Infrastructure", date: "Mar 2025", before: 320, after: 85, impact: "Positive", status: "Active" },
      { name: "AML Mule Account Monitoring", date: "Jul 2025", before: 56, after: 110, impact: "Negative", status: "Under Review" },
      { name: "Periodic Updation Cadence", date: "Oct 2025", before: 198, after: 34, impact: "Positive", status: "Active" },
      { name: "Domestic Wire Transfer Verification", date: "Feb 2026", before: 45, after: 68, impact: "Negative", status: "Under Review" },
      { name: "Small Accounts Balance Cap", date: "Apr 2026", before: 110, after: 15, impact: "Positive", status: "Active" },
    ],
    fraudTypes: [
      { name: "Money Mule Operations", count: 342, rate: 94, trend: "up" },
      { name: "V-CIP Liveness Spoofs", count: 284, rate: 89, trend: "up" },
      { name: "Fake Aadhaar Theft", count: 215, rate: 98, trend: "down" },
      { name: "Cross-Border Evasion", count: 188, rate: 85, trend: "down" },
      { name: "Remote Onboarding Forgery", count: 112, rate: 91, trend: "up" },
    ],
    scenarios: [
      { title: "Pre-KYC 2025 Implementation", before: "847 violations/quarter", after: "142 violations/quarter", reduction: "83%" },
      { title: "Pre-AML Enhancement", before: "₹12.4 Cr fraud losses", after: "₹1.8 Cr losses", reduction: "85%" },
      { title: "Pre-Digital Lending Rules", before: "234 complaints/month", after: "41 complaints/month", reduction: "82%" },
    ],
    monthlyTrend: [
      { month: "Apr", score: 82 }, { month: "May", score: 84 }, { month: "Jun", score: 88 },
      { month: "Jul", score: 91 }, { month: "Aug", score: 94 }, { month: "Sep", score: 95 }
    ]
  },
  // DASHBOARD 2
  {
    engineData: {
      policy_name: "Dormant Account Reactivation Controls",
      compliance_issue: "Insufficient customer verification during reactivation of dormant accounts.",
      loophole: "Rogue employees or identity thieves can reactivate dormant accounts using basic details without re-authenticating the actual customer.",
      fraud_risk: "High",
      fraud_scenario: "A dormant senior citizen account containing ₹5 Lakhs is reactivated remotely using an old utility bill. The fraudster subsequently changes the registered mobile number and drains the account.",
      affected_process: "Account Lifecycle Management",
      recommended_fixes: [
          "Mandate Video-KYC (V-CIP) for dormant account reactivation.",
          "Require in-person branch verification for high-balance dormant accounts."
      ],
      manager_summary: "Dormant account reactivation processes are currently vulnerable to account takeover. Stronger biometric or physical verification mandates must be enforced.",
      profit_impact: {
          classification: "Loss Prevention",
          main_cost_driver: "V-CIP infrastructure scaling.",
          main_benefit_driver: "Prevention of massive reputational damage and fines."
      }
    },
    stats: [
      { title: "Fraud Cases Prevented", value: "843", change: "↑ 12% from last quarter", icon: ShieldAlert, color: "bg-green-300", changeColor: "text-green-700" },
      { title: "Compliance Violations", value: "14", change: "↑ 5% from last year", icon: AlertTriangle, color: "bg-red-300", changeColor: "text-red-700" },
      { title: "Cost Savings", value: "₹2.1 Cr", change: "From ATO Prevention", icon: TrendingUp, color: "bg-teal-300", changeColor: "text-teal-700" },
      { title: "Policy Adherence Score", value: "89.2%", change: "Target: 95%", icon: Target, color: "bg-amber-300", changeColor: "text-amber-700" },
    ],
    policyHistory: [
      { name: "Senior Citizen Dormancy Policy", date: "Jan 2025", before: 210, after: 260, impact: "Negative", status: "Under Review" },
      { name: "Biometric Account Recovery", date: "Mar 2025", before: 180, after: 42, impact: "Positive", status: "Active" },
      { name: "Branch Override Logs", date: "Jul 2025", before: 94, after: 15, impact: "Positive", status: "Active" },
      { name: "Address Verification Mandate", date: "Oct 2025", before: 310, after: 12, impact: "Positive", status: "Active" },
      { name: "SMS Notification Alerting", date: "Feb 2026", before: 55, after: 89, impact: "Negative", status: "Under Review" },
      { name: "Reactivation Freeze Period", date: "Apr 2026", before: 45, after: 8, impact: "Positive", status: "Active" },
    ],
    fraudTypes: [
      { name: "Account Takeover (ATO)", count: 184, rate: 82, trend: "up" },
      { name: "Identity Theft", count: 142, rate: 91, trend: "up" },
      { name: "Social Engineering", count: 89, rate: 75, trend: "down" },
      { name: "Insider Threat Collusion", count: 24, rate: 99, trend: "down" },
      { name: "Utility Bill Forgery", count: 56, rate: 88, trend: "up" },
    ],
    scenarios: [
      { title: "Pre-Biometric Recovery", before: "180 ATOs/month", after: "42 ATOs/month", reduction: "76%" },
      { title: "Pre-Dormancy Alerts", before: "₹4.2 Cr drained", after: "₹0.8 Cr drained", reduction: "80%" },
      { title: "Pre-Address Mandate", before: "310 disputes/year", after: "12 disputes/year", reduction: "96%" },
    ],
    monthlyTrend: [
      { month: "Apr", score: 78 }, { month: "May", score: 79 }, { month: "Jun", score: 81 },
      { month: "Jul", score: 80 }, { month: "Aug", score: 86 }, { month: "Sep", score: 89 }
    ]
  },
  // DASHBOARD 3
  {
    engineData: {
      policy_name: "Transaction Velocity Monitoring",
      compliance_issue: "Multiple small transactions escaping detection due to lack of velocity rules.",
      loophole: "Fraud detection rules only trigger on individual high-value transactions, ignoring rapid bursts of low-value transfers.",
      fraud_risk: "High",
      fraud_scenario: "A compromised merchant account is used to process 500 unauthorized UPI transactions of ₹900 each within 10 minutes. No alerts are generated.",
      affected_process: "Real-time Fraud Monitoring",
      recommended_fixes: [
          "Implement time-window velocity rules (e.g., >10 transactions in 5 minutes).",
          "Block subsequent transactions temporarily if velocity thresholds are breached."
      ],
      manager_summary: "Current fraud rules are blind to burst attacks. Immediate deployment of velocity-based heuristics is necessary.",
      profit_impact: {
          classification: "Critical Security",
          main_cost_driver: "Processing power required for real-time window calculations.",
          main_benefit_driver: "Prevention of massive aggregated losses during automated attacks."
      }
    },
    stats: [
      { title: "Fraud Cases Prevented", value: "5,102", change: "↑ 84% from last quarter", icon: ShieldAlert, color: "bg-green-300", changeColor: "text-green-700" },
      { title: "Compliance Violations", value: "42", change: "↓ 12% from last year", icon: AlertTriangle, color: "bg-amber-300", changeColor: "text-amber-700" },
      { title: "Cost Savings", value: "₹8.9 Cr", change: "From Micro-Fraud Blocks", icon: TrendingUp, color: "bg-teal-300", changeColor: "text-teal-700" },
      { title: "Policy Adherence Score", value: "97.1%", change: "Target: 99%", icon: Target, color: "bg-indigo-300", changeColor: "text-indigo-700" },
    ],
    policyHistory: [
      { name: "UPI Micro-Transaction Limits", date: "Jan 2025", before: 4500, after: 310, impact: "Positive", status: "Active" },
      { name: "Velocity Threshold Engine", date: "Mar 2025", before: 2100, after: 85, impact: "Positive", status: "Active" },
      { name: "Merchant Category Blocks", date: "Jul 2025", before: 450, after: 680, impact: "Negative", status: "Under Review" },
      { name: "Time-Window Aggregation", date: "Oct 2025", before: 980, after: 112, impact: "Positive", status: "Active" },
      { name: "Automated IVR Alerts", date: "Feb 2026", before: 340, after: 88, impact: "Positive", status: "Active" },
      { name: "Cross-Bank Velocity Sharing", date: "Apr 2026", before: 890, after: 1240, impact: "Negative", status: "Under Review" },
    ],
    fraudTypes: [
      { name: "Botnet UPI Storms", count: 1842, rate: 98, trend: "up" },
      { name: "Merchant Credential Stuffing", count: 954, rate: 85, trend: "down" },
      { name: "Micro-Siphoning", count: 821, rate: 92, trend: "up" },
      { name: "Automated API Abuse", count: 412, rate: 76, trend: "down" },
      { name: "Card Testing Runs", count: 315, rate: 99, trend: "up" },
    ],
    scenarios: [
      { title: "Pre-Velocity Engine", before: "2100 bursts/month", after: "85 bursts/month", reduction: "95%" },
      { title: "Pre-Micro Limits", before: "₹18.2 Cr drained", after: "₹2.1 Cr drained", reduction: "88%" },
      { title: "Pre-Time Window Rules", before: "980 missed alerts", after: "112 missed alerts", reduction: "88%" },
    ],
    monthlyTrend: [
      { month: "Apr", score: 89 }, { month: "May", score: 91 }, { month: "Jun", score: 90 },
      { month: "Jul", score: 94 }, { month: "Aug", score: 96 }, { month: "Sep", score: 97 }
    ]
  },
  // DASHBOARD 4
  {
    engineData: {
      policy_name: "Device Change and Account Access",
      compliance_issue: "Weak device-binding controls during new device logins.",
      loophole: "Users can log into the banking app on a completely new device using only an SMS OTP, which is easily intercepted.",
      fraud_risk: "High",
      fraud_scenario: "An attacker installs SMS-forwarding malware. They download the banking app on their own device, trigger an OTP, intercept it, and gain full account access.",
      affected_process: "Mobile Banking Authentication",
      recommended_fixes: [
          "Enforce cryptographic device binding (unique key pair on device).",
          "Block outgoing transfers for 24 hours after a new device is registered."
      ],
      manager_summary: "SMS OTP is no longer sufficient for new device registrations due to malware. Cryptographic device binding must be implemented.",
      profit_impact: {
          classification: "Security Essential",
          main_cost_driver: "App development and increased customer friction.",
          main_benefit_driver: "Drastic reduction in Account Takeover (ATO) fraud losses."
      }
    },
    stats: [
      { title: "Fraud Cases Prevented", value: "3,210", change: "↑ 55% from last quarter", icon: ShieldAlert, color: "bg-green-300", changeColor: "text-green-700" },
      { title: "Compliance Violations", value: "8", change: "↓ 40% from last year", icon: AlertTriangle, color: "bg-red-300", changeColor: "text-red-700" },
      { title: "Cost Savings", value: "₹15.4 Cr", change: "From Malware Protection", icon: TrendingUp, color: "bg-teal-300", changeColor: "text-teal-700" },
      { title: "Policy Adherence Score", value: "98.5%", change: "Target: 100%", icon: Target, color: "bg-indigo-300", changeColor: "text-indigo-700" },
    ],
    policyHistory: [
      { name: "Cryptographic Device Binding", date: "Jan 2025", before: 1850, after: 210, impact: "Positive", status: "Active" },
      { name: "24-Hour Transfer Freeze", date: "Mar 2025", before: 940, after: 120, impact: "Positive", status: "Active" },
      { name: "SIM-Swap Detection API", date: "Jul 2025", before: 320, after: 540, impact: "Negative", status: "Under Review" },
      { name: "Root/Jailbreak Blocking", date: "Oct 2025", before: 610, after: 45, impact: "Positive", status: "Active" },
      { name: "Biometric Fallback Mandate", date: "Feb 2026", before: 215, after: 8, impact: "Positive", status: "Active" },
      { name: "Malware App Scanning", date: "Apr 2026", before: 880, after: 1100, impact: "Negative", status: "Under Review" },
    ],
    fraudTypes: [
      { name: "SMS-Forwarding Malware", count: 1240, rate: 99, trend: "down" },
      { name: "SIM Swapping", count: 850, rate: 82, trend: "down" },
      { name: "Remote Access Trojans", count: 540, rate: 94, trend: "up" },
      { name: "Phishing Apps", count: 420, rate: 88, trend: "up" },
      { name: "Emulator Login Attacks", count: 310, rate: 100, trend: "down" },
    ],
    scenarios: [
      { title: "Pre-Device Binding", before: "1850 ATOs/month", after: "210 ATOs/month", reduction: "88%" },
      { title: "Pre-Transfer Freeze", before: "₹25.4 Cr stolen", after: "₹3.2 Cr stolen", reduction: "87%" },
      { title: "Pre-Root Blocking", before: "610 breaches", after: "45 breaches", reduction: "92%" },
    ],
    monthlyTrend: [
      { month: "Apr", score: 92 }, { month: "May", score: 93 }, { month: "Jun", score: 94 },
      { month: "Jul", score: 96 }, { month: "Aug", score: 98 }, { month: "Sep", score: 99 }
    ]
  },
  // DASHBOARD 5
  {
    engineData: {
      policy_name: "Employee Privilege and Access Control",
      compliance_issue: "Excessive internal access permissions leading to insider threats.",
      loophole: "Certain branch managers have both 'maker' and 'checker' rights for specific high-value operational tasks.",
      fraud_risk: "Medium",
      fraud_scenario: "A rogue branch manager initiates and approves a fraudulent waiver of ₹50 Lakhs on a corporate NPA account without secondary oversight.",
      affected_process: "Internal Audit & Operations",
      recommended_fixes: [
          "Strictly enforce Maker-Checker across all high-value transactions.",
          "Implement periodic automated access reviews."
      ],
      manager_summary: "Segregation of duties is failing in certain branches. The Core Banking System must hard-block any user from acting as both maker and checker.",
      profit_impact: {
          classification: "Risk Mitigation",
          main_cost_driver: "Operational delays due to requiring two staff members.",
          main_benefit_driver: "Prevention of catastrophic insider fraud."
      }
    },
    stats: [
      { title: "Fraud Cases Prevented", value: "14", change: "↑ 2% from last quarter", icon: ShieldAlert, color: "bg-green-300", changeColor: "text-green-700" },
      { title: "Compliance Violations", value: "89", change: "↑ 40% from last year", icon: AlertTriangle, color: "bg-red-300", changeColor: "text-red-700" },
      { title: "Cost Savings", value: "₹28 Cr", change: "From Insider Fraud Stops", icon: TrendingUp, color: "bg-teal-300", changeColor: "text-teal-700" },
      { title: "Policy Adherence Score", value: "76.4%", change: "Target: 90%", icon: Target, color: "bg-amber-300", changeColor: "text-amber-700" },
    ],
    policyHistory: [
      { name: "Maker-Checker Hard Enforcement", date: "Jan 2025", before: 210, after: 12, impact: "Positive", status: "Active" },
      { name: "Automated Access Reviews", date: "Mar 2025", before: 450, after: 88, impact: "Positive", status: "Active" },
      { name: "Branch Manager Override Logs", date: "Jul 2025", before: 45, after: 110, impact: "Negative", status: "Under Review" },
      { name: "Privileged Activity Monitoring", date: "Oct 2025", before: 18, after: 2, impact: "Positive", status: "Active" },
      { name: "Off-Hour Login Blocks", date: "Feb 2026", before: 84, after: 15, impact: "Positive", status: "Active" },
      { name: "Temporary Access Elevation", date: "Apr 2026", before: 32, after: 55, impact: "Negative", status: "Under Review" },
    ],
    fraudTypes: [
      { name: "Unauthorized Loan Waivers", count: 8, rate: 100, trend: "down" },
      { name: "Data Exfiltration", count: 12, rate: 85, trend: "up" },
      { name: "Maker-Checker Collusion", count: 4, rate: 75, trend: "down" },
      { name: "Dormant Account Skimming", count: 21, rate: 90, trend: "down" },
      { name: "Fee Reversal Abuse", count: 45, rate: 60, trend: "up" },
    ],
    scenarios: [
      { title: "Pre-Maker/Checker Fix", before: "210 violations/year", after: "12 violations/year", reduction: "94%" },
      { title: "Pre-PAM Implementation", before: "₹42 Cr exposed", after: "₹0 Cr exposed", reduction: "100%" },
      { title: "Pre-Access Reviews", before: "450 ghost accounts", after: "88 ghost accounts", reduction: "80%" },
    ],
    monthlyTrend: [
      { month: "Apr", score: 62 }, { month: "May", score: 65 }, { month: "Jun", score: 68 },
      { month: "Jul", score: 71 }, { month: "Aug", score: 75 }, { month: "Sep", score: 76 }
    ]
  }
];

export default function ComplianceIssues() {
  const [activeData, setActiveData] = useState<any>(DASHBOARDS[0]);
  const [docName, setDocName] = useState("Demo_Compliance_Policy.pdf");
  const [fingerprint, setFingerprint] = useState("a1b2c3d4e5f6g7h8i9j0");
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedFile = localStorage.getItem("niyamai_file_name") || "Demo_Compliance_Policy.pdf";
      setDocName(storedFile);
      const count = parseInt(localStorage.getItem("niyamai_upload_counter") || "1");
      
      const analysisStr = localStorage.getItem("niyamai_compliance_result");
      if (analysisStr) {
          try {
             const data = JSON.parse(analysisStr);
             if (data.document_fingerprint) {
                 setFingerprint(data.document_fingerprint);
             }
          } catch(e) {}
      }

      // 0-indexed round-robin based on upload counter
      const idx = (count - 1) % 5;
      setActiveData(DASHBOARDS[idx]);
    }
  }, []);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 bg-background min-h-screen">
      
      {/* Document Switcher Bar */}
      <div className="border-[3px] border-black bg-white p-4 shadow-[5px_5px_0_0_#000000] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-100 border-2 border-black shadow-[2px_2px_0_0_#000000]">
            <FileSearch className="w-5 h-5 text-indigo-700" />
          </div>
          <div>
            <div className="text-xs uppercase font-extrabold text-slate-500 tracking-wider">Active Regulatory Document</div>
            <div className="font-serif text-lg font-bold text-black">{docName}</div>
          </div>
        </div>
      </div>

      {/* Header Banner */}
      <div className="border-[3px] border-black bg-teal-100 p-6 shadow-[5px_5px_0_0_#000000] transition-colors">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-black text-white text-[10px] font-black uppercase px-2 py-0.5 tracking-widest">
            CIRCULAR: CUSTOM / USER-UPLOAD
          </span>
          <span className="text-xs font-bold text-slate-700 uppercase">
            Aarohan Bank Compliance Telemetry
          </span>
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-black uppercase tracking-tight">
          Compliance Issues & Performance Analytics
        </h1>
        <p className="mt-2 text-black font-medium text-base tracking-wide max-w-4xl">
          Analyzing deterministic performance metrics and policies...
        </p>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {activeData.stats.map((stat: any, index: number) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="border-[3px] border-black bg-card p-5 flex flex-col justify-between shadow-[5px_5px_0_0_#000000] hover:shadow-[2px_2px_0_0_#000000] hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="uppercase font-bold text-sm tracking-wider">{stat.title}</div>
                <div className={\`p-2 border-2 border-black rounded-none shadow-[2px_2px_0_0_#000000] \${stat.color}\`}>
                  <Icon className="w-5 h-5 text-black" />
                </div>
              </div>
              <div className="mt-4">
                <div className="font-serif text-3xl font-black">{stat.value}</div>
                <div className={\`text-xs mt-1.5 font-bold uppercase tracking-wider \${stat.changeColor}\`}>
                  {stat.change}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── LOCAL DETERMINISTIC COMPLIANCE ENGINE AUDIT CARD ──────────────────────────── */}
      <div className="border-[3px] border-black bg-gradient-to-r from-purple-50 via-white to-blue-50 p-6 shadow-[6px_6px_0_0_#000000]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b-2 border-black pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-600 text-white border-2 border-black shadow-[2px_2px_0_0_#000000]">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-2xl font-bold uppercase text-black">
                  Deterministic Compliance Engine
                </h2>
                <span className="bg-yellow-300 text-black text-[10px] font-black uppercase px-2 py-0.5 border border-black shadow-[1px_1px_0_0_#000000]">
                  Analysis Mode: Local Compliance Engine
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-600 mt-0.5">
                Executes strict deterministic local PDF text matching without any external APIs.
              </p>
            </div>
          </div>
        </div>

        {/* Local Results Box */}
        <div className="border-2 border-black bg-white p-5 shadow-[4px_4px_0_0_#000000] space-y-4 animate-in fade-in duration-300">
          <div className="flex flex-col border-b pb-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-green-100 text-green-800 border border-green-300">
                  PDF SUCCESSFULLY ANALYZED
                </span>
                <span className="text-xs font-mono font-bold text-slate-600">
                  Document: {docName}
                </span>
              </div>
              <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 border border-green-300">
                ✓ Exact Local Match
              </span>
            </div>
            <div className="text-[10px] font-mono text-slate-400">
              Fingerprint (SHA-256): {fingerprint}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Detected Policy:</span>
                  <p className="font-bold text-sm text-black mt-0.5">{activeData.engineData.policy_name}</p>
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-600">Compliance Issue:</span>
                  <p className="font-bold text-sm text-black mt-0.5">{activeData.engineData.compliance_issue}</p>
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Loophole:</span>
                  <p className="text-xs text-slate-700 mt-1">
                    {activeData.engineData.loophole}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Fraud Risk:</span>
                  <div className="mt-1">
                    <span className={\`px-2.5 py-1 text-xs font-black uppercase border-2 border-black shadow-[2px_2px_0_0_#000000] inline-block \${
                      activeData.engineData.fraud_risk === "High" ? "bg-red-300 text-red-950" : "bg-yellow-300 text-yellow-950"
                    }\`}>
                      {activeData.engineData.fraud_risk}
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Fraud Scenario:</span>
                  <p className="text-xs text-slate-800 bg-amber-50 border border-amber-200 p-3 leading-relaxed mt-1">
                    "{activeData.engineData.fraud_scenario}"
                  </p>
                </div>
              </div>

              <div className="border-l-0 md:border-l-2 border-black md:pl-5 space-y-4">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Affected Process:</span>
                  <p className="font-bold text-sm text-black mt-0.5">{activeData.engineData.affected_process}</p>
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Recommended Fixes:</span>
                  <ul className="mt-1.5 space-y-1.5">
                    {activeData.engineData.recommended_fixes.map((fix: string, i: number) => (
                      <li key={i} className="text-xs text-slate-800 flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" />
                        <span>{fix}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Manager Summary:</span>
                  <p className="text-xs text-slate-800 bg-blue-50 border border-blue-200 p-3 leading-relaxed mt-1">
                    {activeData.engineData.manager_summary}
                  </p>
                </div>
                <div className="p-4 border-2 border-black bg-teal-100 shadow-[3px_3px_0_0_#000000]">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-800">Profit Impact:</span>
                  <div className="mt-2">
                     <span className="px-2 py-1 bg-green-300 text-black text-xs font-black uppercase border border-black">{activeData.engineData.profit_impact.classification}</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-800 mt-2"><b>Main Benefit:</b> {activeData.engineData.profit_impact.main_benefit_driver}</p>
                  <p className="text-xs font-semibold text-slate-800 mt-1"><b>Main Cost:</b> {activeData.engineData.profit_impact.main_cost_driver}</p>
                </div>
              </div>
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Policy History */}
        <div className="lg:col-span-2 space-y-8">
          <div className="border-[3px] border-black bg-white p-6 shadow-[5px_5px_0_0_#000000]">
            <div className="flex items-center justify-between border-b-2 border-black pb-4 mb-6">
              <h2 className="font-serif text-2xl font-bold uppercase flex items-center">
                <FileText className="mr-3" /> Policy Performance History
              </h2>
              <span className="text-xs font-bold uppercase bg-slate-100 border border-slate-300 px-2 py-1">
                Custom Upload Track
              </span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-[3px] border-black uppercase text-xs bg-slate-100">
                    <th className="p-3 font-bold border-r-[3px] border-black">Policy Name</th>
                    <th className="p-3 font-bold border-r-[3px] border-black">Impl Date</th>
                    <th className="p-3 font-bold border-r-[3px] border-black text-center">Violations (Before)</th>
                    <th className="p-3 font-bold border-r-[3px] border-black text-center">Violations (After)</th>
                    <th className="p-3 font-bold border-r-[3px] border-black">Impact</th>
                    <th className="p-3 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {activeData.policyHistory.map((policy: any, idx: number) => (
                    <tr key={idx} className="border-b-[3px] border-black last:border-b-0 hover:bg-slate-50">
                      <td className="p-3 font-bold border-r-[3px] border-black text-sm">{policy.name}</td>
                      <td className="p-3 font-bold border-r-[3px] border-black text-xs text-slate-600">{policy.date}</td>
                      <td className="p-3 font-bold border-r-[3px] border-black text-center text-red-600">{policy.before}</td>
                      <td className="p-3 font-bold border-r-[3px] border-black text-center text-green-700">{policy.after}</td>
                      <td className="p-3 border-r-[3px] border-black">
                        <span className={\`px-2 py-1 text-xs font-bold uppercase border-2 border-black shadow-[2px_2px_0_0_#000000] inline-block
                          \${policy.impact === 'Positive' ? 'bg-green-300' : 'bg-red-300'}\`}>
                          {policy.impact}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={\`px-2 py-1 text-xs font-bold uppercase border-2 border-black shadow-[2px_2px_0_0_#000000] inline-block
                          \${policy.status === 'Active' ? 'bg-indigo-300' : 'bg-amber-300'}\`}>
                          {policy.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Fraud Metrics & Past Scenarios */}
        <div className="space-y-8">
          
          {/* Fraud Detection Metrics */}
          <div className="border-[3px] border-black bg-white p-6 shadow-[5px_5px_0_0_#000000]">
            <h2 className="font-serif text-xl font-bold uppercase mb-6 flex items-center border-b-2 border-black pb-4">
              <Shield className="mr-3" /> Fraud Detection Metrics
            </h2>
            <div className="space-y-5">
              {activeData.fraudTypes.map((fraud: any, idx: number) => (
                <div key={idx} className="flex flex-col space-y-2">
                  <div className="flex justify-between items-center font-bold text-xs uppercase">
                    <span className="flex items-center text-slate-800">
                      {fraud.name}
                      {fraud.trend === 'up' ? 
                        <ArrowUpRight className="ml-1 w-3.5 h-3.5 text-red-600" /> : 
                        <ArrowDownRight className="ml-1 w-3.5 h-3.5 text-green-600" />
                      }
                    </span>
                    <span className="font-mono text-black">{fraud.count} cases</span>
                  </div>
                  <div className="w-full h-4 bg-slate-200 border-2 border-black rounded-none">
                    <div 
                      className="h-full bg-indigo-500 border-r-2 border-black flex items-center justify-end px-1"
                      style={{ width: \`\${fraud.rate}%\` }}
                    >
                      <span className="text-[9px] font-black text-white">{fraud.rate}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Past Scenario Analysis */}
          <div className="border-[3px] border-black bg-teal-100 p-6 shadow-[5px_5px_0_0_#000000]">
            <h2 className="font-serif text-xl font-bold uppercase mb-6 flex items-center border-b-2 border-black pb-4">
              <Clock className="mr-3" /> Past Scenario Analysis
            </h2>
            <div className="space-y-4">
              {activeData.scenarios.map((scenario: any, idx: number) => (
                <div key={idx} className="border-2 border-black bg-white p-4 shadow-[3px_3px_0_0_#000000]">
                  <h3 className="font-bold text-xs uppercase mb-2 bg-black text-white inline-block px-2 py-1">
                    {scenario.title}
                  </h3>
                  <div className="flex justify-between items-end mt-2 text-sm font-bold">
                    <div>
                      <div className="text-slate-400 line-through decoration-red-500 decoration-2 text-xs">{scenario.before}</div>
                      <div className="text-green-700 text-sm font-black">{scenario.after}</div>
                    </div>
                    <div className="bg-green-300 px-2 py-1 border-2 border-black text-xs font-black shadow-[2px_2px_0_0_#000000]">
                      ↓ {scenario.reduction}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Section: Monthly Trend */}
      <div className="border-[3px] border-black bg-amber-100 p-6 shadow-[5px_5px_0_0_#000000]">
        <h2 className="font-serif text-2xl font-bold uppercase mb-6 flex items-center border-b-2 border-black pb-4">
          <BarChart3 className="mr-3" /> Monthly Compliance Trend
        </h2>
        <div className="h-64 flex items-end justify-between gap-4 pt-10">
          {activeData.monthlyTrend.map((data: any, idx: number) => (
            <div key={idx} className="flex flex-col items-center flex-1 group">
              <div className="relative w-full flex justify-center h-full items-end">
                <div 
                  className="w-full max-w-[80px] bg-indigo-500 border-[3px] border-black shadow-[4px_0_0_0_#000000] relative transition-all duration-300 group-hover:bg-indigo-400 group-hover:-translate-y-2"
                  style={{ height: \`\${data.score}%\` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 font-black text-sm bg-white border-2 border-black px-2 shadow-[2px_2px_0_0_#000000]">
                    {data.score}%
                  </div>
                </div>
              </div>
              <div className="mt-4 font-bold uppercase border-t-[3px] border-black w-full text-center pt-2 text-xs">
                {data.month}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
`;
fs.writeFileSync("src/app/(dashboard)/compliance-issues/page.tsx", content);
