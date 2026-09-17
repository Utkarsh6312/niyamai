// Factual Regulatory Analysis Data derived directly from the official RBI KYC Master Direction (Updated Aug 14, 2025)

export interface RbiFinding {
  id: string;
  obligationCode: string;
  obligationTitle: string;
  obligationDescription: string;
  sourceDocument: string;
  sourcePage: number;
  sourcePageLabel: string;
  sourceClause: string;
  verbatimEvidence: string;
  confidenceScore: number; // e.g. 99.4%
  
  // Policy Impact
  affectedPolicy: string;
  relevantPolicySection: string;
  matchStatus: "GAP" | "PARTIAL MATCH" | "FULL MATCH" | "NEEDS REVIEW";
  matchExplanation: string;
  gapDetails: string;
  
  // NiyamAI Risk Assessment (Explicitly not assigned by RBI)
  riskLevel: "Critical" | "High" | "Medium" | "Low";
  regulatoryImpact: string;
  operationalImpact: string;
  customerImpact: string;
  riskConfidence: number;
  
  // Affected Departments
  departments: string[];
  
  // Timeline
  timelineType: "Regulatory timeline specified by source" | "Internal Recommended Target";
  timelineDate: string; // ISO or exact date
  timelineDisplay: string;
  
  // Recommended Action
  recommendedAction: {
    id: string;
    actionCode: string;
    title: string;
    description: string;
    affectedPolicy: string;
    department: string;
    owner: string;
    ownerInitials: string;
    priority: "Critical" | "High" | "Medium" | "Low";
    dueDate: string;
    status: string;
  };
}

export const rbiKycAnalysisFindings: RbiFinding[] = [
  // 1. Due Notices for Periodic Updation of KYC (Page 43-44, Para 38(e))
  {
    id: "RBI-KYC-001",
    obligationCode: "OBL-KYC-38E",
    obligationTitle: "Mandatory Multi-Channel & Physical Letter Notices for Periodic KYC Updation",
    obligationDescription: "REs must issue at least three advance intimations (including at least one physical letter) before the due date, and at least three reminders (including at least one physical letter) after the due date, with system audit trail logging. Non-negotiable statutory deadline: January 01, 2026.",
    sourceDocument: "RBI Master Direction - Know Your Customer (KYC) Direction, 2016 (Updated as on August 14, 2025)",
    sourcePage: 43,
    sourcePageLabel: "Pages 43-44, Chapter VI",
    sourceClause: "Chapter VI, Paragraph 38(e) (Amended vide circular DOR.AML.REC. 30/14.01.001/2025-26)",
    verbatimEvidence: "The RE shall intimate its customers, in advance, to update their KYC. Prior to the due date of periodic updation of KYC, the RE shall give at least three advance intimations, including at least one intimation by letter, at appropriate intervals to its customers through available communication options/ channels for complying with the requirement of periodic updation of KYC. Subsequent to the due date, the RE shall give at least three reminders, including at least one reminder by letter, at appropriate intervals, to such customers who have still not complied with the requirements, despite advance intimations. The letter of intimation/ reminder may, inter alia, contain easy to understand instructions for updating KYC, escalation mechanism for seeking help, if required, and the consequences, if any, of failure to update their KYC in time. Issue of such advance intimation/ reminder shall be duly recorded in the RE's system against each customer for audit trail. The RE shall expeditiously implement the same but not later than January 01, 2026.",
    confidenceScore: 99.8,

    affectedPolicy: "Aarohan Bank Operations Policy v3.0",
    relevantPolicySection: "Section 6.1 (Customer Communication & KYC Updation Notices)",
    matchStatus: "GAP",
    matchExplanation: "Aarohan Bank Operations Policy v3.0 §6.1 currently prescribes dispatching a single digital SMS/email alert 15 days prior to expiry and contains zero provision for physical postal letters or systematic 3+3 interval tracking.",
    gapDetails: "Total absence of physical postal letter generation workflow, lack of post-due reminder cadence (minimum 3 letters required), and lack of an immutable system audit trail certifying dispatch timestamps prior to customer account freezing.",

    riskLevel: "Critical",
    regulatoryImpact: "Direct statutory violation of RBI Paragraph 38(e) enforceable with monetary penalties under Section 47A of Banking Regulation Act, 1949 after January 01, 2026 deadline.",
    operationalImpact: "Immediate integration needed with India Post / postal dispatch API; core banking batch notification pipeline must be overhauled.",
    customerImpact: "Customer accounts unlawfully restricted without prescribed statutory notices will trigger Banking Ombudsman complaints and class-action scrutiny.",
    riskConfidence: 99.4,

    departments: ["Operations", "KYC Compliance", "IT & Systems", "Customer Experience"],

    timelineType: "Regulatory timeline specified by source",
    timelineDate: "2026-01-01",
    timelineDisplay: "January 01, 2026 (Mandatory Statutory Deadline stated by RBI)",

    recommendedAction: {
      id: "ACT-KYC-38E",
      actionCode: "ACT-2025-01",
      title: "Deploy Automated 3+3 Multi-Channel & Physical Letter Intimation Engine for KYC Updation",
      description: "Amend Aarohan Bank Operations Policy v3.0 Section 6.1 to mandate 3 advance notices (1 via physical letter) and 3 post-due reminders (1 via letter). Integrate postal tracking barcodes into Core Banking system audit trail before January 01, 2026.",
      affectedPolicy: "Aarohan Bank Operations Policy v3.0",
      department: "Operations",
      owner: "Neha Sharma (Head of Banking Operations)",
      ownerInitials: "NS",
      priority: "Critical",
      dueDate: "Jan 01, 2026",
      status: "Pending"
    }
  },

  // 2. Low-Risk KYC Updation Window & Non-Disruption (Page 40, Para 38)
  {
    id: "RBI-KYC-002",
    obligationCode: "OBL-KYC-38A",
    obligationTitle: "Unrestricted Transaction Processing & Updation Window for Low-Risk Individual Customers",
    obligationDescription: "REs shall allow all transactions and ensure updation of KYC within one year of its falling due or up to June 30, 2026, whichever is later, while subjecting accounts to regular monitoring. Immediate account freezing for low-risk customers is prohibited during this window.",
    sourceDocument: "RBI Master Direction - Know Your Customer (KYC) Direction, 2016 (Updated as on August 14, 2025)",
    sourcePage: 40,
    sourcePageLabel: "Page 40, Chapter VI",
    sourceClause: "Chapter VI, Paragraph 38 (Amended vide circular DOR.AML.REC. 30/14.01.001/2025-26 dated June 12, 2025)",
    verbatimEvidence: "Notwithstanding the provisions given above, in respect of an individual customer who is categorized as low risk, the RE shall allow all transactions and ensure the updation of KYC within one year of its falling due for KYC or upto June 30, 2026, whichever is later. The RE shall subject accounts of such customers to regular monitoring. This shall also be applicable to low-risk individual customers for whom periodic updation of KYC has already fallen due.",
    confidenceScore: 99.5,

    affectedPolicy: "Aarohan Bank KYC & Customer Due Diligence Policy v3.4",
    relevantPolicySection: "Section 3.2 & Section 7.1 (Periodic Updation Intervals & Restriction Protocols)",
    matchStatus: "GAP",
    matchExplanation: "Aarohan Bank KYC Policy v3.4 Section 7.1 enforces an automated debit-freeze rule on all accounts 30 days past due regardless of customer risk categorization, directly violating the RBI relief window granted until June 30, 2026.",
    gapDetails: "Core banking platform abruptly blocks low-risk customers whose KYC fell due, failing to allow transactions up to June 30, 2026, and lacks an automated background transaction monitoring flag for deferred accounts.",

    riskLevel: "High",
    regulatoryImpact: "Adverse inspection finding during RBI Annual Financial Inspection (AFI) for non-compliance with circular DOR.AML.REC. 30/14.01.001/2025-26.",
    operationalImpact: "Severe branch congestion caused by low-risk customers queueing for emergency unfreezing; customer support escalation load.",
    customerImpact: "Genuine salaried, pension, and basic savings bank account holders suffer blocked debits, failed EMIs, and utility bill bounces.",
    riskConfidence: 98.7,

    departments: ["KYC Compliance", "Operations", "IT & Systems"],

    timelineType: "Regulatory timeline specified by source",
    timelineDate: "2026-06-30",
    timelineDisplay: "June 30, 2026 (Statutory Relief Window stated by RBI)",

    recommendedAction: {
      id: "ACT-KYC-38A",
      actionCode: "ACT-2025-02",
      title: "Recalibrate CBS Debit-Freeze Rules for Low-Risk Customers to Enforce June 30, 2026 Window",
      description: "Amend Aarohan Bank KYC Policy v3.4 §7.1 and configure Finacle/CBS core engine to exempt low-risk individual customers from automatic debit freezes until June 30, 2026, enabling background monitoring tags instead.",
      affectedPolicy: "Aarohan Bank KYC & Customer Due Diligence Policy v3.4",
      department: "KYC Compliance",
      owner: "Rajesh Verma (Chief Compliance Officer)",
      ownerInitials: "RV",
      priority: "High",
      dueDate: "Jun 30, 2026",
      status: "Pending"
    }
  },

  // 3. Biometric Aadhaar Face Authentication via Business Correspondents (Page 26 & Page 41)
  {
    id: "RBI-KYC-003",
    obligationCode: "OBL-KYC-16BC",
    obligationTitle: "Deployment of Aadhaar Face Authentication & Business Correspondent KYC Capture Systems",
    obligationDescription: "REs are permitted and directed to enable Business Correspondents (BCs) and bank officials to perform biometric e-KYC authentication including Aadhaar Face Authentication. BCs may capture customer self-declarations electronically with instant acknowledgment receipts.",
    sourceDocument: "RBI Master Direction - Know Your Customer (KYC) Direction, 2016 (Updated as on August 14, 2025)",
    sourcePage: 26,
    sourcePageLabel: "Pages 26 & 41, Chapters V & VI",
    sourceClause: "Chapter V, Paragraph 16 Explanation 2 & Paragraph 38(a)(iia) (Amended vide circular DOR.AML.REC.46/14.01.001/2025-26 dated August 14, 2025)",
    verbatimEvidence: "Explanation 2: Biometric based e-KYC authentication, including Aadhaar Face Authentication can be done by bank official/business correspondents/business facilitators. Paragraph 38(a)(iia): The bank shall enable its BC systems for recording these self-declarations and supporting documents thereof in electronic form in the bank’s systems. The bank shall obtain the self-declaration including the supporting documents, if required, in the electronic mode from the customer through the BC, after successful biometric based e-KYC authentication... The BC shall provide the customer an acknowledgment of receipt of such declaration /submission of documents.",
    confidenceScore: 98.4,

    affectedPolicy: "Aarohan Bank KYC & Customer Due Diligence Policy v3.4",
    relevantPolicySection: "Section 3.6 (Business Correspondent Channels & Digital Onboarding)",
    matchStatus: "PARTIAL MATCH",
    matchExplanation: "Aarohan Bank KYC Policy v3.4 §3.6 recognizes BCs for collecting physical KYC xeroxes, but does not authorize or provision Aadhaar Face Authentication RD services on mobile BC Micro-ATMs, nor does it generate electronic acknowledgment slips.",
    gapDetails: "Absence of certified UIDAI Face RD Service on 4,200 Aarohan Bank BC field terminals; lack of real-time electronic acknowledgment SMS/print dispatch mechanism at remote customer touchpoints.",

    riskLevel: "Medium",
    regulatoryImpact: "Sub-optimal compliance with 2025 inclusive digital banking guidelines; reliance on legacy fingerprint scanners leading to high failure rates among rural senior citizens.",
    operationalImpact: "High cost of manual physical document collation and transit from rural BC points to central scanning processing hubs.",
    customerImpact: "Doorstep banking customers cannot complete facial KYC; forced to travel long distances to physical branches.",
    riskConfidence: 97.8,

    departments: ["Digital Banking", "IT & Systems", "Operations"],

    timelineType: "Internal Recommended Target",
    timelineDate: "2026-11-30",
    timelineDisplay: "November 30, 2026 (Internal Target for BC Software Rollout)",

    recommendedAction: {
      id: "ACT-KYC-16BC",
      actionCode: "ACT-2025-03",
      title: "Provision UIDAI Face Authentication & Digital Receipt System on All BC Handheld Terminals",
      description: "Update Aarohan Bank KYC Policy v3.4 §3.6 to include Aadhaar Face Authentication; push UIDAI certified Face RD service update to all BC Android terminals with automated electronic receipt generation.",
      affectedPolicy: "Aarohan Bank KYC & Customer Due Diligence Policy v3.4",
      department: "IT & Systems",
      owner: "Amitava Roy (Chief Technology Officer)",
      ownerInitials: "AR",
      priority: "Medium",
      dueDate: "Nov 30, 2026",
      status: "Pending"
    }
  },

  // 4. Bi-annual Risk Categorization Review (Page 39, Para 37(a))
  {
    id: "RBI-KYC-004",
    obligationCode: "OBL-KYC-37A",
    obligationTitle: "Mandatory Six-Month Periodic Review of Customer Risk Categorisation",
    obligationDescription: "REs must establish a formalized system of periodic review of risk categorisation of all accounts with a periodicity of at least once in six months, and systematically evaluate the need for applying enhanced due diligence (EDD) measures.",
    sourceDocument: "RBI Master Direction - Know Your Customer (KYC) Direction, 2016 (Updated as on August 14, 2025)",
    sourcePage: 39,
    sourcePageLabel: "Page 39, Chapter V",
    sourceClause: "Chapter V, Paragraph 37(a) (Extent of Monitoring Aligned with Risk Category)",
    verbatimEvidence: "A system of periodic review of risk categorisation of accounts, with such periodicity being at least once in six months, and the need for applying enhanced due diligence measures shall be put in place.",
    confidenceScore: 99.1,

    affectedPolicy: "Aarohan Bank Customer Risk Assessment Policy v2.1",
    relevantPolicySection: "Section 2.4 (Risk Categorization & Review Periodicity)",
    matchStatus: "GAP",
    matchExplanation: "Aarohan Bank Customer Risk Assessment Policy v2.1 §2.4 specifies that risk categorization review across savings and current accounts is scheduled annually (once every 12 months), directly breaching the statutory 6-month mandate.",
    gapDetails: "Annual review periodicity in bank policy allows accounts undergoing material transaction velocity jumps or high-risk activity to remain classified as 'Low Risk' or 'Medium Risk' for up to an extra 6 months without Enhanced Due Diligence.",

    riskLevel: "High",
    regulatoryImpact: "Direct non-compliance observation under RBI Supervisory Risk Assessment (SPARC) with potential monetary sanction for deficient AML controls.",
    operationalImpact: "Batch scoring server computing cycles must be scaled to execute 2x per year instead of annual run.",
    customerImpact: "High-risk accounts will be subjected to EDD and source-of-wealth validation faster, protecting genuine depositors from co-mingled illicit funds.",
    riskConfidence: 98.9,

    departments: ["Risk Management", "KYC Compliance", "IT & Systems"],

    timelineType: "Internal Recommended Target",
    timelineDate: "2026-10-31",
    timelineDisplay: "October 31, 2026 (Internal Target for Next Bi-Annual Batch Run)",

    recommendedAction: {
      id: "ACT-KYC-37A",
      actionCode: "ACT-2025-04",
      title: "Recalibrate Customer Risk Scoring Engine from Annual to 6-Month Periodicity",
      description: "Amend Aarohan Bank Customer Risk Assessment Policy v2.1 §2.4 to mandate bi-annual review (180 days). Reconfigure AML batch scheduler to trigger automated risk categorization re-evaluations every six months.",
      affectedPolicy: "Aarohan Bank Customer Risk Assessment Policy v2.1",
      department: "Risk Management",
      owner: "Arvind Nambiar (Chief Risk Officer)",
      ownerInitials: "AN",
      priority: "High",
      dueDate: "Oct 31, 2026",
      status: "Pending"
    }
  },

  // 5. Operation of Bank Accounts & Money Mules (Page 60-61, Para 59)
  {
    id: "RBI-KYC-005",
    obligationCode: "OBL-KYC-59M",
    obligationTitle: "Strict Meticulous Diligence & Mandatory STR Filing on Money Mule Operations",
    obligationDescription: "Banks shall undertake diligence measures and meticulous monitoring to identify accounts operated as Money Mules. If an account opened and operated is established to be a Money Mule and no STR was filed by the bank, non-compliance with RBI directions is statutorily deemed.",
    sourceDocument: "RBI Master Direction - Know Your Customer (KYC) Direction, 2016 (Updated as on August 14, 2025)",
    sourcePage: 60,
    sourcePageLabel: "Pages 60-61, Chapter X",
    sourceClause: "Chapter X, Paragraph 59 (Amended vide circular DOR.AML.REC.44/14.01.001/2023-24)",
    verbatimEvidence: "The instructions on opening of accounts and monitoring of transactions shall be strictly adhered to, in order to minimise the operations of 'Money Mules' which are used to launder the proceeds of fraud schemes (e.g., phishing and identity theft) by criminals who gain illegal access to deposit accounts by recruiting third parties which act as 'money mules.' Banks shall undertake diligence measures and meticulous monitoring to identify accounts which are operated as Money Mules and take appropriate action, including reporting of suspicious transactions to FIU-IND. Further, if it is established that an account opened and operated is that of a Money Mule, but no STR was filed by the concerned bank, it shall then be deemed that the bank has not complied with these directions.",
    confidenceScore: 99.6,

    affectedPolicy: "Aarohan Bank AML Policy v2.8",
    relevantPolicySection: "Section 4.2 (Transaction Monitoring & Red Flag Thresholds)",
    matchStatus: "PARTIAL MATCH",
    matchExplanation: "Aarohan Bank AML Policy v2.8 §4.2 monitors high-value transactions (> ₹50,000) and general structuring, but does not codify specialized mule heuristics (such as rapid multi-party UPI credits followed by immediate ATM cash-outs) nor explicitly acknowledge the statutory 'deemed non-compliance' liability.",
    gapDetails: "Absence of real-time burst velocity monitoring for newly opened accounts, absence of mule account operational triage workflows, and delayed escalation window to FIU-IND.",

    riskLevel: "Critical",
    regulatoryImpact: "Statutory presumption of non-compliance if an undetected mule account is flagged by Cyber Crime Police / I4C / FIU-IND before bank filing, risking supervisory penalties and license restriction.",
    operationalImpact: "High volume of cybercrime freeze notices from State Police; operational bottleneck in branch response teams.",
    customerImpact: "Students and vulnerable demographics unwittingly used as mules are subjected to severe account freezes and police investigations.",
    riskConfidence: 99.7,

    departments: ["KYC Compliance", "AML & Fraud Prevention", "Legal", "Operations"],

    timelineType: "Internal Recommended Target",
    timelineDate: "2026-11-15",
    timelineDisplay: "November 15, 2026 (Internal Target for Anti-Mule Model Deployment)",

    recommendedAction: {
      id: "ACT-KYC-59M",
      actionCode: "ACT-2025-05",
      title: "Codify Dedicated Money Mule Detection Rules & Automated FIU-IND Escalation in AML Policy",
      description: "Update Aarohan Bank AML Policy v2.8 Section 4.2 to incorporate behavioral money mule detection patterns (burst UPI inflows followed by immediate ATM drain) and establish a 24-hour expedited STR filing queue with FIU-IND.",
      affectedPolicy: "Aarohan Bank AML Policy v2.8",
      department: "KYC Compliance",
      owner: "Vikramaditya Sen (Principal AML Officer)",
      ownerInitials: "VS",
      priority: "Critical",
      dueDate: "Nov 15, 2026",
      status: "Pending"
    }
  }
];

export const rbiSummaryStats = {
  documentTitle: "RBI Master Direction - Know Your Customer (KYC) Direction, 2016",
  amendmentReference: "DBR.AML.BC.No.81/14.01.001/2015-16 (Updated as on August 14, 2025)",
  issuingAuthority: "Reserve Bank of India (Department of Regulation, Central Office)",
  totalMaterialChanges: 14,
  obligationsExtracted: 5,
  criticalGaps: 2,
  highGaps: 2,
  partialMatches: 2,
  policiesAnalyzed: [
    "Aarohan Bank KYC & Customer Due Diligence Policy v3.4",
    "Aarohan Bank Customer Risk Assessment Policy v2.1",
    "Aarohan Bank AML Policy v2.8",
    "Aarohan Bank Operations Policy v3.0"
  ],
  affectedDepartments: [
    "Operations",
    "KYC Compliance",
    "Risk Management",
    "IT & Systems",
    "Customer Experience",
    "Legal"
  ]
};
