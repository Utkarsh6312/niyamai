// NiyamAI Enterprise Regulatory & Policy Store (Aarohan Bank)

export interface PolicyDocument {
  id: string;
  code: string;
  title: string;
  sub: string;
  type: "Regulation" | "Internal Policy" | "Guidance" | "Circular";
  source: "RBI" | "Aarohan Bank" | "SEBI" | "FIU-IND";
  department: string;
  date: string;
  effectiveDate: string;
  status: "Active" | "Under Review" | "Pending Action" | "Superseded";
  rel: "Critical" | "High" | "Medium" | "Low";
  iconColor: string;
  iconBg: string;
  pages: number;
  lastUpdated: string;
  owner: string;
  description: string;
  topics: string[];
  clausesCount: number;
  obligationsCount: number;
  mappingCount: number;
  aiSummary: string;
  clauses: {
    number: string;
    title: string;
    text: string;
    obligationType: "Mandatory" | "Recommendatory";
    matchedSection?: string;
    gapScore?: number;
  }[];
}

export const documentsData: PolicyDocument[] = [
  // --- RBI MASTER DIRECTIONS & GUIDELINES ---
  {
    id: "DOC-1",
    code: "RBI/2026-27/45",
    title: "RBI Master Direction — KYC (2026 Amendment)",
    sub: "RBI/2026-27/45 • Know Your Customer (KYC) Master Direction for Regulated Entities",
    type: "Regulation",
    source: "RBI",
    department: "Compliance & Legal",
    date: "18 Aug 2026",
    effectiveDate: "01 Oct 2026",
    status: "Pending Action",
    rel: "Critical",
    iconColor: "text-indigo",
    iconBg: "bg-indigo/10",
    pages: 42,
    lastUpdated: "20 Aug 2026",
    owner: "Department of Regulation, RBI",
    description: "Consolidated Master Direction governing Customer Due Diligence (CDD), digital/unassisted customer onboarding, beneficial ownership thresholds, and recurring risk-based profile reviews.",
    topics: ["Customer Due Diligence", "Biometric Liveness", "PEP Screening", "Non-Face-to-Face KYC", "Periodic Review", "FATF Compliance"],
    clausesCount: 42,
    obligationsCount: 74,
    mappingCount: 12,
    aiSummary: "Mandates enhanced customer verification triggers for non-face-to-face onboarding. Specifically amends Clause 4.2 to require biometric liveness validation every 6 months for unassisted digital loan applicants.",
    clauses: [
      {
        number: "Clause 4.2",
        title: "Customer Due Diligence for Digital/Non-Face-to-Face Customers",
        text: "Regulated Entities shall institute real-time biometric liveness and geo-tagging validation for all unassisted digital onboarding and credit sanctions. Periodic review of high-risk customers shall occur at intervals not exceeding six months.",
        obligationType: "Mandatory",
        matchedSection: "KYC Policy v3.4 Section 3.2",
        gapScore: 78
      },
      {
        number: "Clause 8.1",
        title: "Ongoing Monitoring of Transactions",
        text: "Automated transaction monitoring systems must flag velocity anomalies against baseline customer declared income profiles within 24 hours.",
        obligationType: "Mandatory",
        matchedSection: "AML Policy v3.5 Section 5.1",
        gapScore: 15
      },
      {
        number: "Clause 14.3",
        title: "Beneficial Ownership Thresholds",
        text: "Controlling ownership interest threshold standardized to 10% for both corporate bodies and unincorporated associations.",
        obligationType: "Mandatory",
        matchedSection: "KYC Policy v3.4 Section 4.1",
        gapScore: 0
      }
    ]
  },
  {
    id: "DOC-2",
    code: "RBI/2024-25/30",
    title: "RBI Guidelines on Digital Lending & Fintech Governance",
    sub: "RBI/2024-25/30 • Regulatory Framework for Lending Service Providers (LSPs) & DLAs",
    type: "Regulation",
    source: "RBI",
    department: "Digital Banking & Risk",
    date: "01 Aug 2024",
    effectiveDate: "01 Dec 2024",
    status: "Active",
    rel: "High",
    iconColor: "text-indigo",
    iconBg: "bg-indigo/10",
    pages: 36,
    lastUpdated: "15 Jan 2025",
    owner: "Department of Regulation, RBI",
    description: "Regulatory directions specifying direct disbursement into borrower accounts without pass-through accounts of third-party LSPs, standardized Key Fact Statements (KFS), and strict data residency rules.",
    topics: ["LSP Governance", "Key Fact Statement (KFS)", "Direct Loan Disbursement", "Cooling-Off Period", "Data Localization"],
    clausesCount: 28,
    obligationsCount: 52,
    mappingCount: 8,
    aiSummary: "Eliminates third-party pool accounts. Mandates explicit borrower consent for credit limit increases and establishes cooling-off look-up periods during which borrowers can exit loans without penalty.",
    clauses: [
      {
        number: "Clause 3.1",
        title: "Direct Loan Disbursal",
        text: "All loan servicing and repayments must be executed directly between the bank's core account and borrower bank account without pass-through or escrow accounts.",
        obligationType: "Mandatory",
        matchedSection: "Digital Lending Policy v2.1 Section 2.3",
        gapScore: 5
      },
      {
        number: "Clause 5.4",
        title: "Borrower Data Privacy and Storage",
        text: "No biometric data or unredacted credit reports shall be stored on LSP servers. Storage must remain sovereignly inside India.",
        obligationType: "Mandatory",
        matchedSection: "Digital Lending Policy v2.1 Section 4.2",
        gapScore: 10
      }
    ]
  },
  {
    id: "DOC-4",
    code: "RBI/2023-24/78",
    title: "RBI Master Direction on IT Outsourcing & Cloud Risks",
    sub: "RBI/2023-24/78 • Governance Framework for Third-Party IT Service Providers",
    type: "Regulation",
    source: "RBI",
    department: "IT & Vendor Management",
    date: "01 Jul 2023",
    effectiveDate: "01 Oct 2023",
    status: "Active",
    rel: "High",
    iconColor: "text-indigo",
    iconBg: "bg-indigo/10",
    pages: 48,
    lastUpdated: "10 Mar 2024",
    owner: "Department of Supervision, RBI",
    description: "Mandatory directives for vendor due diligence, continuous risk assessment, right-to-audit clauses, concentration risk ceilings, and disaster recovery testing for outsourced bank IT infrastructure.",
    topics: ["Vendor Due Diligence", "Sovereign Cloud", "BCP/DR Drill", "Right to Audit", "Sub-contracting Controls"],
    clausesCount: 38,
    obligationsCount: 65,
    mappingCount: 11,
    aiSummary: "Requires board-level approval for material outsourcing, audit access to cloud vendor premises, and non-negotiable exit management protocols with zero vendor lock-in.",
    clauses: [
      {
        number: "Clause 6.2",
        title: "Right to Inspect and Audit",
        text: "Agreements with third-party service providers must explicitly allow supervisory access to RBI and bank auditors without prior restriction.",
        obligationType: "Mandatory",
        matchedSection: "IT Outsourcing Policy v4.0 Section 3.4",
        gapScore: 0
      }
    ]
  },

  // --- AAROHAN BANK INTERNAL POLICIES ---
  {
    id: "DOC-3",
    code: "POL/KYC/2024",
    title: "Aarohan Bank — Master KYC & CDD Policy (v3.4)",
    sub: "POL/KYC/2024 • Board-Approved Customer Identification & Risk Categorization Framework",
    type: "Internal Policy",
    source: "Aarohan Bank",
    department: "Compliance",
    date: "20 Mar 2024",
    effectiveDate: "01 Apr 2024",
    status: "Active",
    rel: "High",
    iconColor: "text-green-600",
    iconBg: "bg-green-100",
    pages: 28,
    lastUpdated: "12 Aug 2026",
    owner: "Rajesh Verma (Chief Compliance Officer)",
    description: "Operational framework defining customer onboarding tiers (Tier 1 branch, Tier 2 video KYC, Tier 3 unassisted digital), beneficial ownership verification, and PEP classification.",
    topics: ["Customer Identification", "Video KYC (V-CIP)", "Low/Med/High Risk Tiers", "Branch Due Diligence", "Suspicious Activity Triggers"],
    clausesCount: 32,
    obligationsCount: 48,
    mappingCount: 9,
    aiSummary: "Internal policy defining standard OTP/Aadhaar e-KYC. Requires periodic review every 2 years for high-risk customers, which creates a gap against RBI's new 6-month biometric trigger.",
    clauses: [
      {
        number: "Section 3.2",
        title: "Customer Due Diligence (CDD) Protocols",
        text: "The Bank shall perform CDD for all new customers in accordance with the risk-based approach. Periodic review of high-risk customers shall be conducted once every 24 months.",
        obligationType: "Mandatory",
        matchedSection: "RBI Clause 4.2",
        gapScore: 78
      },
      {
        number: "Section 4.1",
        title: "Beneficial Ownership Identification",
        text: "Controlling ownership interest threshold is maintained at 10% in full alignment with central bank directives.",
        obligationType: "Mandatory",
        matchedSection: "RBI Clause 14.3",
        gapScore: 0
      }
    ]
  },
  {
    id: "DOC-5",
    code: "POL/DL/2024",
    title: "Aarohan Bank — Digital Lending & LSP Partnership Policy (v2.1)",
    sub: "POL/DL/2024 • Architecture for Digital Loan Origination, Underwriting & Partner SLAs",
    type: "Internal Policy",
    source: "Aarohan Bank",
    department: "Digital Banking & Risk",
    date: "10 Feb 2024",
    effectiveDate: "01 Mar 2024",
    status: "Active",
    rel: "Medium",
    iconColor: "text-green-600",
    iconBg: "bg-green-100",
    pages: 34,
    lastUpdated: "18 Jun 2026",
    owner: "Priya Sundaram (Head of Digital Lending)",
    description: "Governs partnerships with fintech Lending Service Providers (LSPs), algorithmic underwriting guardrails, APR calculation, KFS generation, and digital collection practices.",
    topics: ["Fintech Onboarding", "Algorithmic Bias Review", "KFS Disclosures", "Collection Code of Conduct", "Data Residency"],
    clausesCount: 24,
    obligationsCount: 39,
    mappingCount: 7,
    aiSummary: "Details API integration with fintech aggregators. Needs updating to integrate real-time facial liveness SDK into the mobile instant-credit pipeline.",
    clauses: [
      {
        number: "Section 2.3",
        title: "Disbursement Architecture",
        text: "Loans shall disburse straight-through into customer CASA accounts directly from core banking without intermediary custodial pools.",
        obligationType: "Mandatory",
        matchedSection: "RBI Clause 3.1",
        gapScore: 5
      }
    ]
  },
  {
    id: "DOC-6",
    code: "POL/IT/2024",
    title: "Aarohan Bank — IT Outsourcing & Third-Party Risk Policy (v4.0)",
    sub: "POL/IT/2024 • Procurement, SLA Enforcement & Vendor Risk Governance Framework",
    type: "Internal Policy",
    source: "Aarohan Bank",
    department: "IT & Operations",
    date: "10 Feb 2024",
    effectiveDate: "01 Mar 2024",
    status: "Active",
    rel: "Medium",
    iconColor: "text-green-600",
    iconBg: "bg-green-100",
    pages: 40,
    lastUpdated: "04 May 2026",
    owner: "Sneha Kulkarni (Head of IT Governance)",
    description: "Establishes tiering of vendors (Critical, High, Medium, Low), SLA penalty matrices, annual SOC2 audit checks, and contingency transition plans in the event of vendor failure.",
    topics: ["Vendor Risk Rating", "Cloud SLA Standards", "BCP Drills", "Information Security Schedule", "Termination Rights"],
    clausesCount: 30,
    obligationsCount: 45,
    mappingCount: 8,
    aiSummary: "Mandates annual independent vulnerability assessments for critical cloud providers and enforces sovereign data residency across AWS India (Mumbai/Hyderabad) regions.",
    clauses: [
      {
        number: "Section 3.4",
        title: "Supervisory Audit Access",
        text: "Vendor Master Service Agreements (MSAs) must incorporate unrestricted inspection rights for bank internal audit and statutory regulators.",
        obligationType: "Mandatory",
        matchedSection: "RBI Clause 6.2",
        gapScore: 0
      }
    ]
  },
  {
    id: "DOC-7",
    code: "POL/CYBER/2025",
    title: "Aarohan Bank — Comprehensive Cyber Security & Incident Response Policy (v3.2)",
    sub: "POL/CYBER/2025 • Defense-in-Depth, SOC Surveillance & Threat Response Guidelines",
    type: "Internal Policy",
    source: "Aarohan Bank",
    department: "Information Security (CISO)",
    date: "15 Jan 2025",
    effectiveDate: "01 Feb 2025",
    status: "Active",
    rel: "Critical",
    iconColor: "text-green-600",
    iconBg: "bg-green-100",
    pages: 52,
    lastUpdated: "28 Jul 2026",
    owner: "Amitava Roy (Chief Information Security Officer)",
    description: "Operational playbook for Cyber Security Operations Center (C-SOC), 24x7 threat monitoring, privilege access management (PAM), multi-factor authentication (MFA), and 6-hour mandatory RBI cyber incident reporting.",
    topics: ["C-SOC Operations", "Zero Trust Architecture", "6-Hour Incident Reporting", "Penetration Testing (VAPT)", "Red Teaming"],
    clausesCount: 45,
    obligationsCount: 68,
    mappingCount: 14,
    aiSummary: "Enforces strict zero-trust network boundaries, hardware token 2FA for administrative portals, and automated real-time alerts to CERT-In and RBI within 6 hours of high-severity breaches.",
    clauses: [
      {
        number: "Section 4.3",
        title: "Mandatory Regulatory Incident Notification",
        text: "The CISO Office must notify RBI CSITE and CERT-In within 6 hours of confirming any unauthorized perimeter penetration or data exfiltration attempt.",
        obligationType: "Mandatory",
        matchedSection: "RBI Cyber Framework Section 2.1",
        gapScore: 0
      }
    ]
  },
  {
    id: "DOC-8",
    code: "POL/CGR/2024",
    title: "Aarohan Bank — Customer Grievance Redressal & Fair Practices Code (v5.1)",
    sub: "POL/CGR/2024 • Ombudsman Escalation Hierarchy, SLA Matrix & Customer Bill of Rights",
    type: "Internal Policy",
    source: "Aarohan Bank",
    department: "Customer Experience",
    date: "05 Jan 2024",
    effectiveDate: "15 Jan 2024",
    status: "Active",
    rel: "Medium",
    iconColor: "text-green-600",
    iconBg: "bg-green-100",
    pages: 26,
    lastUpdated: "11 Aug 2026",
    owner: "Neha Sharma (Principal Nodal Officer)",
    description: "Codifies the Bank's 3-tier grievance resolution ladder, zero-liability customer protection for unauthorized electronic banking fraud reported within 72 hours, and Internal Ombudsman escalation.",
    topics: ["Internal Ombudsman", "30-Day Turnaround SLA", "Zero-Liability Framework", "Fair Practices Code", "Senior Citizen Priority"],
    clausesCount: 20,
    obligationsCount: 30,
    mappingCount: 5,
    aiSummary: "Implements RBI's Integrated Ombudsman Scheme with automated ticket escalation and root-cause analysis reporting to the Board Risk Committee.",
    clauses: [
      {
        number: "Section 2.1",
        title: "Customer Liability for Digital Transactions",
        text: "Zero liability applies if the unauthorized transaction occurs through third-party breach where deficiency lies neither with the bank nor customer, provided notice is given within 3 working days.",
        obligationType: "Mandatory",
        matchedSection: "RBI Circular on Unauthorized Electronic Banking",
        gapScore: 0
      }
    ]
  },
  {
    id: "DOC-9",
    code: "POL/AML/2024",
    title: "Aarohan Bank — Anti-Money Laundering & Sanctions Screening Standard (v3.5)",
    sub: "POL/AML/2024 • FIU-IND Reporting, Suspicious Transaction Reports (STR) & UNSC Screening",
    type: "Internal Policy",
    source: "Aarohan Bank",
    department: "Compliance & Financial Crime",
    date: "20 Mar 2024",
    effectiveDate: "01 Apr 2024",
    status: "Active",
    rel: "High",
    iconColor: "text-green-600",
    iconBg: "bg-green-100",
    pages: 38,
    lastUpdated: "14 Jul 2026",
    owner: "Vikramaditya Sen (AML Principal Officer)",
    description: "Guidelines on automated batch screening against United Nations Security Council (UNSC) lists, OFAC, and FIU-IND sanction registries, and mandatory 7-day filing window for suspicious transaction reports.",
    topics: ["STR/CTR Filing", "FIU-IND Reporting", "UNSC/OFAC Sanctions", "High-Risk Geography Rules", "Trade-Based Money Laundering"],
    clausesCount: 36,
    obligationsCount: 55,
    mappingCount: 10,
    aiSummary: "Defines automated AML rules engine thresholds and requires STR filing within 7 days of forming suspicion on any account regardless of value.",
    clauses: [
      {
        number: "Section 5.1",
        title: "Transaction Monitoring & Velocity Checks",
        text: "The AML engine shall evaluate customer turnover against historical profiles; deviation exceeding 300% within 48 hours shall automatically raise an alert for analyst investigation.",
        obligationType: "Mandatory",
        matchedSection: "RBI Clause 8.1",
        gapScore: 15
      }
    ]
  },
  {
    id: "DOC-10",
    code: "POL/CR/2024",
    title: "Aarohan Bank — Credit Risk Governance & Loan Underwriting Policy (v4.2)",
    sub: "POL/CR/2024 • Prudential Exposure Ceilings, Risk-Adjusted Capital & Asset Classification",
    type: "Internal Policy",
    source: "Aarohan Bank",
    department: "Credit Risk Management",
    date: "15 Apr 2024",
    effectiveDate: "01 May 2024",
    status: "Active",
    rel: "High",
    iconColor: "text-green-600",
    iconBg: "bg-green-100",
    pages: 46,
    lastUpdated: "19 May 2026",
    owner: "Arvind Nambiar (Chief Risk Officer)",
    description: "Prudential ceilings for single and group borrower exposures, expected credit loss (ECL) provisioning methodologies, loan appraisal limits, and Special Mention Account (SMA-0, 1, 2) monitoring.",
    topics: ["Large Exposure Framework (LEF)", "SMA & NPA Classification", "ECL Provisioning", "Collateral Valuation", "Delegated Lending Authority"],
    clausesCount: 40,
    obligationsCount: 62,
    mappingCount: 8,
    aiSummary: "Enforces single borrower exposure limit of 20% of eligible Tier-1 capital and standardizes 90-day delinquency trigger for non-performing asset classification.",
    clauses: [
      {
        number: "Section 3.1",
        title: "Prudential Exposure Ceilings",
        text: "Single counterparty exposure shall not exceed 20% of Tier-1 capital; group exposure ceiling maintained at 25% in strict compliance with RBI Large Exposure Framework.",
        obligationType: "Mandatory",
        matchedSection: "RBI LEF Master Direction Section 4",
        gapScore: 0
      }
    ]
  },
  {
    id: "DOC-11",
    code: "POL/DP/2025",
    title: "Aarohan Bank — Data Governance, Privacy & Sovereign Localization Policy (v2.0)",
    sub: "POL/DP/2025 • Digital Personal Data Protection (DPDP) Act Compliance & Consent Architecture",
    type: "Internal Policy",
    source: "Aarohan Bank",
    department: "Legal & Data Privacy",
    date: "01 Mar 2025",
    effectiveDate: "01 Apr 2025",
    status: "Active",
    rel: "Critical",
    iconColor: "text-green-600",
    iconBg: "bg-green-100",
    pages: 32,
    lastUpdated: "02 Aug 2026",
    owner: "Dr. Ananya Iyer (Data Protection Officer)",
    description: "Enterprise policy for customer consent management, Right to Erasure / Correction, data classification (Public, Confidential, Restricted), cryptographic key escrow, and storage of payment logs within India.",
    topics: ["DPDP Act 2023", "Data Localization", "Customer Consent Artifacts", "Data Masking & Redaction", "Breach Notice Protocols"],
    clausesCount: 26,
    obligationsCount: 44,
    mappingCount: 9,
    aiSummary: "Complies with statutory data localization mandate: all core banking transactions, audit logs, and borrower credentials reside exclusively on encrypted servers within the Republic of India.",
    clauses: [
      {
        number: "Section 2.4",
        title: "Sovereign Payment Data Storage",
        text: "Full end-to-end transaction details, payment settlement records, and customer identification data must be stored exclusively on systems located in India.",
        obligationType: "Mandatory",
        matchedSection: "RBI Data Localization Circular §1.2",
        gapScore: 0
      }
    ]
  }
];

// Demo Upload Candidate: The New RBI Circular that triggers the Hackathon Pitch Flow
export const demoRbiGuideline = {
  id: "DOC-NEW",
  code: "RBI/2026-27/114",
  title: "RBI Circular: Digital Lending Due Diligence & Biometric Verification Trigger (2026)",
  issuer: "Reserve Bank of India",
  date: "18 Aug 2026",
  effectiveDate: "01 Oct 2026",
  status: "Under Analysis",
  impact: "Critical",
  fileSize: "2.4 MB (PDF)",
  reference: "RBI/2026-27/114 - DoR.FIN.REC.No.42/03.10.136/2026-27",
  summary: "Amendments to KYC Master Direction & Digital Lending Framework. Mandates active biometric liveness detection and geolocation checks for unassisted digital onboarding.",
  detectedGap: "Aarohan Bank KYC Policy v3.4 §3.2 currently relies on standard OTP/e-KYC and does not mandate active 6-month biometric liveness checks for unassisted digital loan applicants.",
  remediationAction: "ACT-2041: Upgrade Digital KYC pipeline to integrate real-time liveness SDK and amend Section 3.2 of KYC SOP.",
  impactedDepartments: ["Compliance", "Digital Banking", "Information Technology", "Risk Management"]
};

// Existing compliance actions for Action Center
export const complianceActions = [
  {
    id: "ACT-2041",
    action: "Update Section 3.2 of KYC SOP to mandate active biometric liveness checks for unassisted digital borrowers.",
    regulation: "RBI Clause 4.2 (RBI/2026-27/45)",
    department: "Compliance",
    ownerInitials: "RV",
    owner: "Rajesh Verma",
    priority: "Critical",
    due: "Oct 01, 2026",
    status: "Pending"
  },
  {
    id: "ACT-2042",
    action: "Perform vendor risk & sovereign data storage audit for third-party Fintech Lending Service Provider (LSP).",
    regulation: "RBI Digital Lending §5.4",
    department: "IT Security",
    ownerInitials: "AR",
    owner: "Amitava Roy",
    priority: "High",
    due: "Oct 15, 2026",
    status: "In Progress"
  },
  {
    id: "ACT-2043",
    action: "Conduct bi-annual AML and transaction velocity simulation for treasury and frontline branch managers.",
    regulation: "PMLA Master Direction §8.1",
    department: "Compliance & HR",
    ownerInitials: "VS",
    owner: "Vikramaditya Sen",
    priority: "Medium",
    due: "Oct 25, 2026",
    status: "Pending"
  },
  {
    id: "ACT-2044",
    action: "Implement hardware security key (FIDO2) authentication for all privileged core banking access terminals.",
    regulation: "RBI Cyber Security Framework §4.3",
    department: "Information Security",
    ownerInitials: "SK",
    owner: "Sneha Kulkarni",
    priority: "High",
    due: "Oct 10, 2026",
    status: "Completed"
  }
];
