COMPLIANCE_CASES = [
    {
        "case_id": "CASE-1",
        "policy_name": "SMS OTP Authentication Below Threshold",
        "keywords": ["sms otp", "₹25,000", "transaction authentication", "below threshold", "low value transaction"],
        "compliance_issue": "Weak authentication control for transactions below the defined threshold.",
        "loophole": "An attacker could split a larger fraudulent amount into multiple transactions below the authentication threshold.",
        "fraud_scenario": "A fraudster accesses a compromised session and executes 10 separate transfers of ₹24,000 each. Since the system bypasses SMS OTP for amounts below ₹25,000, all transfers succeed without alerting the account holder.",
        "fraud_risk": "High",
        "affected_process": "Transaction Processing & Authentication",
        "recommended_fixes": [
            "Introduce risk-based authentication measuring velocity.",
            "Add device binding requirements for any automated bypassing.",
            "Monitor cumulative transaction totals within 24 hours."
        ],
        "manager_summary": "High risk of transaction splitting fraud detected due to an unprotected ₹25,000 threshold bypass. Immediate rule modification required.",
        "profit_impact": {
            "classification": "Cost-Saving",
            "main_cost_driver": "Increased SMS gateway costs for additional OTPs.",
            "main_benefit_driver": "Significant reduction in micro-transaction fraud chargebacks."
        }
    },
    {
        "case_id": "CASE-2",
        "policy_name": "Dormant Account Reactivation",
        "keywords": ["dormant account", "reactivation", "customer verification", "inactive account", "kyc refresh"],
        "compliance_issue": "Insufficient customer verification during reactivation of dormant accounts.",
        "loophole": "Rogue employees or identity thieves can reactivate dormant accounts using basic details without re-authenticating the actual customer.",
        "fraud_scenario": "A dormant senior citizen account containing ₹5 Lakhs is reactivated remotely using an old utility bill. The fraudster subsequently changes the registered mobile number and drains the account.",
        "fraud_risk": "High",
        "affected_process": "Account Lifecycle Management",
        "recommended_fixes": [
            "Mandate Video-KYC (V-CIP) for dormant account reactivation.",
            "Require in-person branch verification for high-balance dormant accounts.",
            "Send physical letters to the registered address upon reactivation requests."
        ],
        "manager_summary": "Dormant account reactivation processes are currently vulnerable to account takeover. Stronger biometric or physical verification mandates must be enforced.",
        "profit_impact": {
            "classification": "Loss Prevention",
            "main_cost_driver": "V-CIP infrastructure scaling.",
            "main_benefit_driver": "Prevention of massive reputational damage and regulatory fines from senior citizen fraud."
        }
    },
    {
        "case_id": "CASE-3",
        "policy_name": "Large Cash Transaction Monitoring",
        "keywords": ["large cash", "transaction monitoring", "threshold loophole", "cash deposit", "structuring"],
        "compliance_issue": "Monitoring threshold loophole allowing structured deposits.",
        "loophole": "Cash monitoring alerts only trigger on single deposits above ₹10 Lakhs, ignoring multiple ₹9 Lakh deposits across different branches.",
        "fraud_scenario": "A money mule network deposits ₹9.5 Lakhs in cash at three different branches in a single day. The system fails to aggregate these deposits, bypassing the AML reporting queue.",
        "fraud_risk": "Medium",
        "affected_process": "Anti-Money Laundering (AML) Operations",
        "recommended_fixes": [
            "Implement PAN-level daily aggregation across all branches.",
            "Reduce the alert threshold for cash deposits to ₹5 Lakhs.",
            "Deploy AI-based structuring detection heuristics."
        ],
        "manager_summary": "AML systems are failing to detect structured cash deposits (smurfing). PAN-level aggregation logic must be prioritized.",
        "profit_impact": {
            "classification": "Regulatory Compliance",
            "main_cost_driver": "Database computational overhead for daily aggregation.",
            "main_benefit_driver": "Avoidance of severe FIU-IND penalties for AML reporting failures."
        }
    },
    {
        "case_id": "CASE-4",
        "policy_name": "New Beneficiary Activation",
        "keywords": ["new beneficiary", "cooling period", "beneficiary activation", "transfer limit", "immediate transfer"],
        "compliance_issue": "Insufficient cooling-off controls for new beneficiaries.",
        "loophole": "The system allows immediate high-value transfers to newly added beneficiaries without an adequate cooling period.",
        "fraud_scenario": "An account is compromised via phishing. The attacker adds a new beneficiary and immediately transfers the maximum daily limit of ₹10 Lakhs before the customer realizes their account was breached.",
        "fraud_risk": "High",
        "affected_process": "Digital Banking Transfers",
        "recommended_fixes": [
            "Enforce a mandatory 24-hour cooling period for all new beneficiaries.",
            "Restrict transfers to ₹50,000 for the first 48 hours post-activation.",
            "Require secondary authorization (e.g., email or voice call) for immediate high-value transfers."
        ],
        "manager_summary": "Immediate high-value transfers to new beneficiaries pose a severe risk during account takeovers. A cooling period must be instituted immediately.",
        "profit_impact": {
            "classification": "High ROI",
            "main_cost_driver": "Potential customer friction and support calls.",
            "main_benefit_driver": "Drastic reduction in successful phishing payouts."
        }
    },
    {
        "case_id": "CASE-5",
        "policy_name": "KYC Document Verification",
        "keywords": ["kyc document", "verification", "manual verification", "forgery", "identity proof"],
        "compliance_issue": "Over-dependency on manual visual verification of KYC documents.",
        "loophole": "Operations staff manually verify scanned KYC documents, making it easy for high-quality forged documents (e.g., photoshopped Aadhaar cards) to pass.",
        "fraud_scenario": "A syndicate opens 50 mule accounts using forged PAN and Aadhaar cards. The manual verification team, under pressure to meet targets, approves them. These accounts are later used for receiving scam funds.",
        "fraud_risk": "Medium",
        "affected_process": "Customer Onboarding",
        "recommended_fixes": [
            "Integrate direct API verification with issuing authorities (UIDAI, NSDL).",
            "Deploy OCR-based document tampering detection software.",
            "Remove manual approval rights for purely digital document uploads."
        ],
        "manager_summary": "Manual KYC verification is a critical weak point yielding high false negatives for forged documents. Automated API validation is required.",
        "profit_impact": {
            "classification": "Efficiency & Security",
            "main_cost_driver": "API call costs to UIDAI/NSDL and OCR vendor licenses.",
            "main_benefit_driver": "Reduction in manual workforce costs and elimination of synthetic identities."
        }
    },
    {
        "case_id": "CASE-6",
        "policy_name": "Loan Approval Process",
        "keywords": ["loan approval", "income verification", "document verification", "credit check", "instant loan"],
        "compliance_issue": "Inadequate automated income and document verification for instant loans.",
        "loophole": "Instant digital loans rely on self-declared income and basic credit scores without verifying actual bank statement cash flows.",
        "fraud_scenario": "Fraudsters create synthetic profiles with fabricated employment details and average credit scores, securing multiple ₹1 Lakh instant personal loans that immediately default.",
        "fraud_risk": "High",
        "affected_process": "Digital Lending Origination",
        "recommended_fixes": [
            "Mandate Account Aggregator (AA) framework for digital income verification.",
            "Implement AI models to analyze bank statement cash flow consistency.",
            "Cross-reference employer details with EPFO databases."
        ],
        "manager_summary": "Instant loan defaults are rising due to synthetic profiles. Integrating the Account Aggregator framework for verifiable cash flow analysis is critical.",
        "profit_impact": {
            "classification": "Portfolio Protection",
            "main_cost_driver": "Integration with Account Aggregator ecosystem.",
            "main_benefit_driver": "Reduction in first-payment defaults and bad loan write-offs."
        }
    },
    {
        "case_id": "CASE-7",
        "policy_name": "Transaction Velocity Monitoring",
        "keywords": ["transaction velocity", "multiple small transactions", "escaping detection", "rapid transfers", "burst"],
        "compliance_issue": "Multiple small transactions escaping detection due to lack of velocity rules.",
        "loophole": "Fraud detection rules only trigger on individual high-value transactions, completely ignoring rapid bursts of low-value transfers.",
        "fraud_scenario": "A compromised merchant account is used to process 500 unauthorized UPI transactions of ₹900 each within 10 minutes. No alerts are generated because each transaction is below the ₹1000 threshold.",
        "fraud_risk": "High",
        "affected_process": "Real-time Fraud Monitoring",
        "recommended_fixes": [
            "Implement time-window velocity rules (e.g., >10 transactions in 5 minutes).",
            "Block subsequent transactions temporarily if velocity thresholds are breached.",
            "Alert the merchant via automated IVR upon burst detection."
        ],
        "manager_summary": "Current fraud rules are blind to burst attacks. Immediate deployment of velocity-based heuristics is necessary to protect merchant and retail accounts.",
        "profit_impact": {
            "classification": "Critical Security",
            "main_cost_driver": "Processing power required for real-time window calculations.",
            "main_benefit_driver": "Prevention of massive aggregated losses during automated attacks."
        }
    },
    {
        "case_id": "CASE-8",
        "policy_name": "Device Change and Account Access",
        "keywords": ["device change", "device binding", "login", "new phone", "unrecognized device"],
        "compliance_issue": "Weak device-binding controls during new device logins.",
        "loophole": "Users can log into the banking app on a completely new device using only an SMS OTP, which is easily intercepted via malware or SIM swapping.",
        "fraud_scenario": "An attacker installs SMS-forwarding malware on the victim's phone. They download the banking app on their own device, trigger an OTP, intercept it, and gain full account access.",
        "fraud_risk": "High",
        "affected_process": "Mobile Banking Authentication",
        "recommended_fixes": [
            "Enforce cryptographic device binding (generating a unique key pair on the device).",
            "Require debit card details or branch ATM verification to register a new device.",
            "Block outgoing transfers for 24 hours after a new device is registered."
        ],
        "manager_summary": "SMS OTP is no longer sufficient for new device registrations due to malware proliferation. Cryptographic device binding must be implemented.",
        "profit_impact": {
            "classification": "Security Essential",
            "main_cost_driver": "App development and increased customer friction during onboarding.",
            "main_benefit_driver": "Drastic reduction in Account Takeover (ATO) fraud losses."
        }
    },
    {
        "case_id": "CASE-9",
        "policy_name": "Employee Privilege and Access Control",
        "keywords": ["employee privilege", "access control", "internal access", "permissions", "maker checker"],
        "compliance_issue": "Excessive internal access permissions leading to insider threats.",
        "loophole": "Certain branch managers have both 'maker' and 'checker' rights for specific high-value operational tasks, bypassing the dual-control principle.",
        "fraud_scenario": "A rogue branch manager initiates and approves a fraudulent waiver of ₹50 Lakhs on a corporate NPA account without secondary oversight, colluding with the borrower.",
        "fraud_risk": "Medium",
        "affected_process": "Internal Audit & Operations",
        "recommended_fixes": [
            "Strictly enforce Maker-Checker (Four Eyes Principle) across all high-value transactions.",
            "Implement periodic automated access reviews.",
            "Alert central compliance immediately if a single user attempts both roles."
        ],
        "manager_summary": "Segregation of duties is failing in certain branches. The Core Banking System must hard-block any user from acting as both maker and checker.",
        "profit_impact": {
            "classification": "Risk Mitigation",
            "main_cost_driver": "Operational delays due to requiring two staff members.",
            "main_benefit_driver": "Prevention of catastrophic insider fraud and regulatory censure."
        }
    },
    {
        "case_id": "CASE-10",
        "policy_name": "Suspicious Transaction Reporting (STR)",
        "keywords": ["suspicious transaction", "str reporting", "delayed escalation", "workflow", "fiu"],
        "compliance_issue": "Delayed escalation and reporting workflow for suspicious transactions.",
        "loophole": "The STR workflow involves multiple manual sign-offs, often causing the bank to miss the 7-day regulatory reporting deadline to FIU-IND.",
        "fraud_scenario": "A complex cross-border money laundering scheme is flagged by the system. The alert sits in the branch manager's queue for 5 days, then the compliance officer's queue for 4 days, resulting in a delayed STR filing and subsequent RBI penalty.",
        "fraud_risk": "Medium",
        "affected_process": "Regulatory Reporting",
        "recommended_fixes": [
            "Automate STR escalation if un-actioned by branch staff within 48 hours.",
            "Implement a centralized dashboard for the Principal Officer to track aging alerts.",
            "Bypass branch review entirely for highest-risk AI-flagged alerts."
        ],
        "manager_summary": "Manual bottlenecks in the STR workflow expose the bank to severe regulatory penalties. Automated SLA-driven escalation is urgently needed.",
        "profit_impact": {
            "classification": "Compliance Automation",
            "main_cost_driver": "Workflow engine software licensing and integration.",
            "main_benefit_driver": "Complete elimination of late-filing penalties from the regulator."
        }
    }
]
