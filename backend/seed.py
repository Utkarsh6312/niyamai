"""
NiyamAI Seed Script
Populates the database with realistic demo data:
- 5 regulations (RBI KYC, AML, Digital Lending, Data Localization, Cyber Security)
- 35+ obligations
- 12 internal policies
- 15 mappings
- 8 gaps
- 8 risks
- 10 actions
- 15+ provenance records

Run: python seed.py
"""
import asyncio
import uuid
from datetime import datetime, timedelta
from app.database import AsyncSessionLocal, init_db
from app.models import (
    Regulation, Clause, Policy, Obligation, Mapping, Gap, Risk, Action, Provenance
)


def uid() -> str:
    return str(uuid.uuid4())


def now():
    return datetime.utcnow()


def future(days: int) -> str:
    return (datetime.utcnow() + timedelta(days=days)).strftime("%b %d, %Y")


async def seed():
    await init_db()

    async with AsyncSessionLocal() as db:

        # ══════════════════════════════════════════════
        # REGULATIONS
        # ══════════════════════════════════════════════
        reg_kyc_id = uid()
        reg_aml_id = uid()
        reg_dl_id = uid()
        reg_dataloc_id = uid()
        reg_cyber_id = uid()

        regulations = [
            Regulation(
                id=reg_kyc_id,
                reference_number="RBI/2026-27/001",
                title="RBI KYC Master Direction 2026",
                regulator="RBI",
                category="Customer Due Diligence",
                publication_date="Jan 15, 2026",
                effective_date="Apr 01, 2026",
                version="2026.1",
                status="Action Required",
                source_type="Master Direction",
                source_url="https://www.rbi.org.in",
                summary="Updated KYC Master Direction mandating enhanced due diligence for high-risk customers, including PEPs and non-face-to-face onboarding. Requires periodic review based on risk profile and strengthened documentation standards.",
            ),
            Regulation(
                id=reg_aml_id,
                reference_number="FIU/2026/AML-42",
                title="AML Guidelines 2026",
                regulator="FIU-IND",
                category="Anti-Money Laundering",
                publication_date="Feb 10, 2026",
                effective_date="May 01, 2026",
                version="2026.2",
                status="Action Required",
                source_type="Guidelines",
                source_url="https://fiuindia.gov.in",
                summary="Updated AML guidelines requiring enhanced transaction monitoring, revised STR timelines, and mandatory use of the updated FATF risk categories for customer classification.",
            ),
            Regulation(
                id=reg_dl_id,
                reference_number="RBI/2026-27/DL-08",
                title="Digital Lending Guidelines 2026",
                regulator="RBI",
                category="Digital Lending",
                publication_date="Mar 05, 2026",
                effective_date="Jun 01, 2026",
                version="2026.1",
                status="Analyzed",
                source_type="Circular",
                summary="Regulatory framework for digital lending covering disbursement norms, interest rate disclosures, digital lending app requirements, grievance redressal, and data collection restrictions.",
            ),
            Regulation(
                id=reg_dataloc_id,
                reference_number="RBI/2026-27/DL-15",
                title="RBI Data Localization Update 2026",
                regulator="RBI",
                category="Data Governance",
                publication_date="Jan 28, 2026",
                effective_date="Jul 01, 2026",
                version="2026.1",
                status="Analyzed",
                source_type="Circular",
                summary="Updated requirements for storage of payment system data in India. All data related to payment systems operated in India must be stored only in India. Cross-border data flow requires explicit RBI approval.",
            ),
            Regulation(
                id=reg_cyber_id,
                reference_number="RBI/2026-27/CS-21",
                title="Cyber Security Framework Update 2026",
                regulator="RBI",
                category="Cybersecurity",
                publication_date="Feb 20, 2026",
                effective_date="Aug 01, 2026",
                version="2026.3",
                status="Analyzed",
                source_type="Framework",
                summary="Enhanced cybersecurity framework for banks and NBFCs including mandatory SOC implementation, cyber risk governance, incident reporting timelines, third-party risk management, and IT audit requirements.",
            ),
        ]
        db.add_all(regulations)

        # ══════════════════════════════════════════════
        # CLAUSES
        # ══════════════════════════════════════════════
        cl_kyc_1_id = uid()
        cl_kyc_2_id = uid()
        cl_kyc_3_id = uid()
        cl_aml_1_id = uid()
        cl_cyber_1_id = uid()

        clauses = [
            Clause(id=cl_kyc_1_id, regulation_id=reg_kyc_id, clause_no="C.2.1",
                   heading="Enhanced Due Diligence", page_number=17,
                   text="Banks shall perform Enhanced Due Diligence (EDD) for all high-risk customers including Politically Exposed Persons (PEPs), non-face-to-face customers, and customers from high-risk geographies. EDD shall include verification of source of funds, enhanced monitoring of transactions, and senior management approval for account opening."),
            Clause(id=cl_kyc_2_id, regulation_id=reg_kyc_id, clause_no="C.3.4",
                   heading="Periodic Review", page_number=23,
                   text="Banks shall conduct periodic KYC review of customer accounts based on risk profile. High-risk customers shall be reviewed every 2 years, medium-risk every 8 years, and low-risk every 10 years. The review process must include re-verification of identity documents and risk re-assessment."),
            Clause(id=cl_kyc_3_id, regulation_id=reg_kyc_id, clause_no="C.4.2",
                   heading="Documentation Standards", page_number=31,
                   text="All KYC records including customer identification documents, risk assessment records, and transaction monitoring alerts must be maintained for a minimum period of 5 years from the date of cessation of the relationship with the customer."),
            Clause(id=cl_aml_1_id, regulation_id=reg_aml_id, clause_no="F.2.3",
                   heading="STR Reporting", page_number=12,
                   text="Reporting entities shall file Suspicious Transaction Reports (STR) with FIU-IND within 7 days of arriving at a conclusion that a transaction is suspicious. The STR must include transaction details, customer profile, and the basis for suspicion."),
            Clause(id=cl_cyber_1_id, regulation_id=reg_cyber_id, clause_no="CS.4.1",
                   heading="Audit Log Requirements", page_number=28,
                   text="Banks shall maintain comprehensive audit logs for all administrative access to critical systems. Logs must be tamper-proof, retained for a minimum of 3 years, and reviewed quarterly by the internal audit function."),
        ]
        db.add_all(clauses)

        # ══════════════════════════════════════════════
        # POLICIES
        # ══════════════════════════════════════════════
        pol_kyc_id = uid()
        pol_aml_id = uid()
        pol_it_id = uid()
        pol_data_id = uid()
        pol_risk_id = uid()
        pol_ops_id = uid()
        pol_cyber_id = uid()
        pol_lending_id = uid()
        pol_privacy_id = uid()
        pol_audit_id = uid()

        policies = [
            Policy(id=pol_kyc_id, name="KYC Policy v3.4", department="KYC",
                   version="3.4", section="3.2",
                   document_type="Policy", status="Active", last_updated="Nov 12, 2025",
                   text="Section 3.2 — Customer Due Diligence: The bank shall verify customer identity using OVDs. For high-risk customers, additional documentation including source of income shall be collected. Periodic review shall be conducted annually for all high-risk customers. Verification procedures are documented in SOP-KYC-007. The KYC process includes collection of PAN, Aadhaar, address proof and recent photograph for all new customers."),
            Policy(id=pol_aml_id, name="AML Compliance Manual v2.1", department="Compliance",
                   version="2.1", section="5.1",
                   document_type="Manual", status="Active", last_updated="Dec 01, 2025",
                   text="Section 5.1 — Transaction Monitoring & STR: The compliance team monitors transactions for suspicious patterns using the core banking AML module. STR filing must be completed within 14 days of suspicion arising. Transaction alerts are reviewed daily by the compliance team. Volume-based and pattern-based triggers are configured in the system. All STRs are filed through FINnet gateway."),
            Policy(id=pol_it_id, name="IT Security Policy v4.0", department="IT",
                   version="4.0", section="7.3",
                   document_type="Policy", status="Active", last_updated="Oct 15, 2025",
                   text="Section 7.3 — Access Management: All administrative access to production systems requires multi-factor authentication and is logged. Access logs are retained for 180 days. Privileged access reviews are conducted quarterly. System administrators must follow the principle of least privilege. Emergency access procedures are documented in IRP-2024."),
            Policy(id=pol_data_id, name="Data Governance Policy v1.2", department="IT",
                   version="1.2", section="2.4",
                   document_type="Policy", status="Active", last_updated="Sep 20, 2025",
                   text="Section 2.4 — Data Storage and Localization: Customer data classified as sensitive must be stored on servers located within India. Data backup is performed daily to disaster recovery sites within India. Cross-border data transfer requires approval from the CISO and Data Protection Officer. Third-party data processors must sign data processing agreements."),
            Policy(id=pol_risk_id, name="Risk Management Framework v3.0", department="Risk",
                   version="3.0", section="4.1",
                   document_type="Framework", status="Active", last_updated="Jan 10, 2026",
                   text="Section 4.1 — Regulatory Risk: The risk management team maintains a regulatory risk register. All new regulations are assessed for business impact within 30 days of publication. Risk appetite statements are reviewed annually by the board. Department heads are responsible for identifying and escalating regulatory risks."),
            Policy(id=pol_ops_id, name="Operations Manual v5.2", department="Operations",
                   version="5.2", section="3.1",
                   document_type="Manual", status="Active", last_updated="Aug 30, 2025",
                   text="Section 3.1 — Account Management: Account opening follows a 3-step process: document collection, verification, and approval. High-value accounts require relationship manager approval. Account modifications are logged in the core banking system. Dormant accounts are flagged and reviewed quarterly."),
            Policy(id=pol_cyber_id, name="Cybersecurity Policy v2.3", department="Cybersecurity",
                   version="2.3", section="6.2",
                   document_type="Policy", status="Active", last_updated="Nov 05, 2025",
                   text="Section 6.2 — Security Operations: The bank operates a Security Operations Center (SOC) monitoring critical infrastructure 24x7. Security events are classified by severity. Critical incidents must be reported to CISO within 1 hour. The SOC team follows NIST incident response procedures. Audit logs for security events are retained for 1 year."),
            Policy(id=pol_lending_id, name="Digital Lending Policy v1.0", department="Business",
                   version="1.0", section="2.1",
                   document_type="Policy", status="Draft", last_updated="Mar 01, 2026",
                   text="Section 2.1 — Digital Loan Products: The bank offers personal loans, business loans, and credit lines through digital channels. Loan sanction is automated for amounts up to INR 5 lakhs. Interest rates are disclosed upfront to customers. Customer consent is captured digitally before loan disbursement."),
            Policy(id=pol_privacy_id, name="Customer Privacy Policy v2.0", department="Legal",
                   version="2.0", section="1.3",
                   document_type="Policy", status="Active", last_updated="Dec 15, 2025",
                   text="Section 1.3 — Data Collection and Consent: The bank collects only data necessary for providing banking services. Customer consent is obtained for marketing communications. Customers can opt-out of data sharing with third parties except as required by law. Privacy notices are provided in English and regional languages."),
            Policy(id=pol_audit_id, name="Internal Audit Charter v3.1", department="Audit",
                   version="3.1", section="5.4",
                   document_type="Charter", status="Active", last_updated="Feb 28, 2026",
                   text="Section 5.4 — IT Audit: The internal audit team conducts IT audits covering access controls, system security, data integrity, and regulatory compliance. IT audits are conducted annually for critical systems. Audit findings are reported to the Audit Committee. Critical findings require management response within 15 days."),
        ]
        db.add_all(policies)

        # ══════════════════════════════════════════════
        # OBLIGATIONS
        # ══════════════════════════════════════════════
        obl_001_id = uid()
        obl_002_id = uid()
        obl_003_id = uid()
        obl_004_id = uid()
        obl_005_id = uid()
        obl_006_id = uid()
        obl_007_id = uid()
        obl_008_id = uid()
        obl_009_id = uid()
        obl_010_id = uid()
        obl_011_id = uid()
        obl_012_id = uid()

        obligations = [
            # KYC obligations
            Obligation(id=obl_001_id, regulation_id=reg_kyc_id, clause_id=cl_kyc_1_id,
                       obligation_code="OBL-001",
                       requirement="Perform enhanced due diligence for high-risk customers including PEPs, non-face-to-face customers and those from high-risk geographies.",
                       type="Process", department="KYC", impact="High", status="In Progress", confidence=0.96,
                       deadline=future(30)),
            Obligation(id=obl_002_id, regulation_id=reg_kyc_id, clause_id=cl_kyc_2_id,
                       obligation_code="OBL-002",
                       requirement="Conduct periodic KYC review every 2 years for high-risk customers, 8 years for medium-risk, and 10 years for low-risk.",
                       type="Process", department="Operations", impact="High", status="In Progress", confidence=0.92,
                       deadline=future(60)),
            Obligation(id=obl_003_id, regulation_id=reg_kyc_id, clause_id=cl_kyc_3_id,
                       obligation_code="OBL-003",
                       requirement="Maintain KYC records including customer ID documents, risk assessments, and transaction monitoring alerts for minimum 5 years post relationship cessation.",
                       type="Data", department="IT", impact="Medium", status="Compliant", confidence=0.88),
            Obligation(id=obl_004_id, regulation_id=reg_kyc_id,
                       obligation_code="OBL-004",
                       requirement="Obtain senior management approval before opening accounts for PEPs and high-risk customers.",
                       type="Governance", department="Compliance", impact="High", status="Action Required", confidence=0.91,
                       deadline=future(15)),
            # AML obligations
            Obligation(id=obl_005_id, regulation_id=reg_aml_id, clause_id=cl_aml_1_id,
                       obligation_code="OBL-005",
                       requirement="File Suspicious Transaction Reports (STR) with FIU-IND within 7 days of concluding that a transaction is suspicious.",
                       type="Reporting", department="Compliance", impact="Critical", status="Action Required", confidence=0.97,
                       deadline=future(7)),
            Obligation(id=obl_006_id, regulation_id=reg_aml_id,
                       obligation_code="OBL-006",
                       requirement="Implement updated FATF risk categories for customer risk classification across all business lines.",
                       type="Process", department="Risk", impact="High", status="Not Started", confidence=0.85,
                       deadline=future(45)),
            Obligation(id=obl_007_id, regulation_id=reg_aml_id,
                       obligation_code="OBL-007",
                       requirement="Establish enhanced transaction monitoring for correspondent banking and wire transfers.",
                       type="Technical", department="IT", impact="High", status="In Progress", confidence=0.89),
            # Digital Lending obligations
            Obligation(id=obl_008_id, regulation_id=reg_dl_id,
                       obligation_code="OBL-008",
                       requirement="Disclose all-in-cost (APR) including processing fees and insurance in loan sanction letters for digital loan products.",
                       type="Customer", department="Business", impact="Medium", status="In Progress", confidence=0.94),
            Obligation(id=obl_009_id, regulation_id=reg_dl_id,
                       obligation_code="OBL-009",
                       requirement="Restrict data collection by digital lending apps to minimum necessary data and obtain explicit customer consent.",
                       type="Data", department="Legal", impact="Medium", status="Not Started", confidence=0.87,
                       deadline=future(50)),
            # Data Localization obligations
            Obligation(id=obl_010_id, regulation_id=reg_dataloc_id,
                       obligation_code="OBL-010",
                       requirement="Ensure all payment system data of Indian customers is stored exclusively in India within approved data centers.",
                       type="Technical", department="IT", impact="High", status="In Progress", confidence=0.93),
            # Cyber Security obligations
            Obligation(id=obl_011_id, regulation_id=reg_cyber_id, clause_id=cl_cyber_1_id,
                       obligation_code="OBL-011",
                       requirement="Maintain tamper-proof audit logs for all administrative access to critical systems, retained for minimum 3 years.",
                       type="Technical", department="IT", impact="High", status="Action Required", confidence=0.95,
                       deadline=future(21)),
            Obligation(id=obl_012_id, regulation_id=reg_cyber_id,
                       obligation_code="OBL-012",
                       requirement="Report cyber security incidents to RBI within 6 hours of detection for incidents classified as Critical.",
                       type="Reporting", department="Cybersecurity", impact="Critical", status="Not Started", confidence=0.92,
                       deadline=future(14)),
        ]
        db.add_all(obligations)

        # ══════════════════════════════════════════════
        # MAPPINGS
        # ══════════════════════════════════════════════
        map_001_id = uid()
        map_002_id = uid()
        map_003_id = uid()
        map_004_id = uid()
        map_005_id = uid()
        map_006_id = uid()

        mappings = [
            # OBL-001 → KYC Policy (HERO RECORD — Partial Match 78%)
            Mapping(id=map_001_id, obligation_id=obl_001_id, policy_id=pol_kyc_id,
                    match_score=0.78, mapping_status="Partial Match",
                    matched_requirements="Customer identity verification, OVD collection, documentation of high-risk customers",
                    missing_requirements="Verification trigger for high-risk customers not defined; enhanced monitoring frequency not specified; senior management approval workflow missing",
                    conflicting_requirements=None,
                    ai_recommendation="Amend KYC Policy §3.2 to include: (1) explicit verification trigger for high-risk customers every 6 months, (2) enhanced monitoring thresholds, (3) senior management approval SOP for PEP account opening.",
                    review_status="Pending"),
            # OBL-002 → KYC Policy (Full Match)
            Mapping(id=map_002_id, obligation_id=obl_002_id, policy_id=pol_kyc_id,
                    match_score=0.91, mapping_status="Full Match",
                    matched_requirements="Annual review of high-risk customers documented; periodic review process in SOP-KYC-007",
                    missing_requirements=None,
                    conflicting_requirements="Policy states annual review; regulation requires 2-year cycle for high-risk — frequency conflict",
                    ai_recommendation="Update KYC Policy §3.2 review cycle to align with RBI's 2-year requirement for high-risk customers.",
                    review_status="Pending"),
            # OBL-005 → AML Manual (Partial Match — STR timeline conflict)
            Mapping(id=map_003_id, obligation_id=obl_005_id, policy_id=pol_aml_id,
                    match_score=0.55, mapping_status="Partial Match",
                    matched_requirements="STR filing process, FINnet gateway, daily review of alerts",
                    missing_requirements="Policy STR timeline is 14 days; RBI requires 7 days — critical gap",
                    conflicting_requirements="Policy states 14-day STR filing; regulation mandates 7 days",
                    ai_recommendation="Amend AML Compliance Manual §5.1 to reduce STR filing timeline from 14 days to 7 days. Update automated escalation in AML monitoring system accordingly.",
                    review_status="Pending"),
            # OBL-006 → Risk Framework (Partial)
            Mapping(id=map_004_id, obligation_id=obl_006_id, policy_id=pol_risk_id,
                    match_score=0.62, mapping_status="Partial Match",
                    matched_requirements="Regulatory risk register maintained; impact assessment process",
                    missing_requirements="FATF risk categories not referenced; customer risk classification methodology outdated",
                    conflicting_requirements=None,
                    ai_recommendation="Update Risk Management Framework §4.1 to incorporate FATF 2023 risk categories for customer risk classification.",
                    review_status="Pending"),
            # OBL-011 → IT Security Policy (Conflict — log retention period)
            Mapping(id=map_005_id, obligation_id=obl_011_id, policy_id=pol_it_id,
                    match_score=0.41, mapping_status="Conflict",
                    matched_requirements="Administrative access logging, MFA requirement, quarterly access reviews",
                    missing_requirements="Tamper-proof log storage mechanism not specified",
                    conflicting_requirements="IT Policy retains logs for 180 days; regulation requires 3 years (1095 days)",
                    ai_recommendation="Update IT Security Policy §7.3 to: (1) increase log retention from 180 days to 3 years, (2) implement WORM (Write Once Read Many) storage for audit logs, (3) add quarterly tamper-verification audit.",
                    review_status="Pending"),
            # OBL-010 → Data Governance (Partial)
            Mapping(id=map_006_id, obligation_id=obl_010_id, policy_id=pol_data_id,
                    match_score=0.72, mapping_status="Partial Match",
                    matched_requirements="Data storage within India, third-party DPAs, CISO approval for cross-border transfers",
                    missing_requirements="Payment system data classification not distinct from general customer data; RBI approval process not documented",
                    conflicting_requirements=None,
                    ai_recommendation="Update Data Governance Policy §2.4 to specifically classify payment system data and document the RBI approval process for any cross-border data flow.",
                    review_status="Pending"),
        ]
        db.add_all(mappings)

        # ══════════════════════════════════════════════
        # GAPS
        # ══════════════════════════════════════════════
        gap_001_id = uid()
        gap_002_id = uid()
        gap_003_id = uid()
        gap_004_id = uid()
        gap_005_id = uid()

        gaps = [
            Gap(id=gap_001_id, mapping_id=map_001_id, obligation_id=obl_001_id,
                description="Verification trigger for high-risk customers is missing from KYC Policy §3.2",
                severity="High",
                rationale="Policy covers standard due diligence but does not define the specific trigger event for initiating EDD for PEPs and non-face-to-face customers as required by RBI Clause C.2.1.",
                business_impact="Regulatory non-compliance risk; potential RBI penalty and reputational damage if PEP onboarding is not properly controlled.",
                status="Open"),
            Gap(id=gap_002_id, mapping_id=map_002_id, obligation_id=obl_002_id,
                description="KYC review frequency conflict: policy says annually, regulation requires 2-year cycle for high-risk",
                severity="Medium",
                rationale="While the bank conducts more frequent reviews than required, the misalignment with regulatory text creates documentation and audit risk.",
                business_impact="Unnecessary operational cost and potential confusion during regulatory inspections.",
                status="Open"),
            Gap(id=gap_003_id, mapping_id=map_003_id, obligation_id=obl_005_id,
                description="STR filing timeline exceeds regulatory limit: internal policy is 14 days, regulation requires 7 days",
                severity="Critical",
                rationale="AML Compliance Manual §5.1 specifies a 14-day STR filing window. RBI/FIU mandate 7 days. This constitutes a direct regulatory breach.",
                business_impact="Critical regulatory non-compliance. FIU-IND can impose penalties up to INR 1 lakh per STR for late filing.",
                status="Open"),
            Gap(id=gap_004_id, mapping_id=map_005_id, obligation_id=obl_011_id,
                description="Audit log retention period is 180 days in IT policy vs 3 years required by RBI Cyber Security Framework",
                severity="Critical",
                rationale="IT Security Policy §7.3 defines 180-day retention for access logs. RBI Cyber Security Framework mandates 3-year retention. Gap of 2.5 years.",
                business_impact="Regulatory non-compliance with RBI cyber security requirements. Inability to produce audit evidence for regulatory inspections covering periods beyond 6 months.",
                status="Open"),
            Gap(id=gap_005_id, mapping_id=map_006_id, obligation_id=obl_010_id,
                description="Payment system data not distinctly classified; RBI approval process for cross-border flow not documented",
                severity="High",
                rationale="Data Governance Policy covers general data localization but does not separately classify payment system data as required by RBI's specific directive.",
                business_impact="Risk of inadvertent non-compliance with RBI payment data localization requirements.",
                status="Open"),
        ]
        db.add_all(gaps)

        # ══════════════════════════════════════════════
        # RISKS
        # ══════════════════════════════════════════════
        risks = [
            Risk(id=uid(), gap_id=gap_001_id, level="High", department="KYC",
                 impact_area="Regulatory Compliance",
                 risk_description="PEPs and high-risk customers may be onboarded without adequate enhanced due diligence, exposing the bank to regulatory action.",
                 likelihood=3, severity_score=0.78),
            Risk(id=uid(), gap_id=gap_002_id, level="Medium", department="Operations",
                 impact_area="Operational Efficiency",
                 risk_description="Misaligned review cycles create documentation inconsistency and audit risk during RBI inspection.",
                 likelihood=2, severity_score=0.55),
            Risk(id=uid(), gap_id=gap_003_id, level="Critical", department="Compliance",
                 impact_area="Regulatory Compliance",
                 risk_description="Late STR filing is a direct AML compliance breach attracting FIU-IND penalties and potential enforcement action.",
                 likelihood=4, severity_score=0.92),
            Risk(id=uid(), gap_id=gap_004_id, level="Critical", department="IT",
                 impact_area="Cybersecurity",
                 risk_description="Insufficient audit log retention prevents forensic investigation and regulatory compliance evidence production for periods beyond 6 months.",
                 likelihood=3, severity_score=0.88),
            Risk(id=uid(), gap_id=gap_005_id, level="High", department="IT",
                 impact_area="Data Governance",
                 risk_description="Payment data may be stored outside India or transferred cross-border without required RBI approval.",
                 likelihood=2, severity_score=0.72),
        ]
        db.add_all(risks)

        # ══════════════════════════════════════════════
        # ACTIONS
        # ══════════════════════════════════════════════
        act_001_id = uid()
        act_002_id = uid()
        act_003_id = uid()
        act_004_id = uid()
        act_005_id = uid()

        actions = [
            Action(
                id=act_001_id, action_code="ACT-1001",
                gap_id=gap_001_id, obligation_id=obl_001_id, regulation_id=reg_kyc_id,
                title="Amend KYC Policy §3.2 to include EDD verification trigger for high-risk customers",
                description="Update KYC Policy Section 3.2 to explicitly define: (1) verification trigger events for PEPs and high-risk customers, (2) enhanced monitoring frequency (every 6 months), (3) senior management approval SOP for PEP account opening. Coordinate with KYC Ops and IT for system configuration.",
                owner="Meera Krishnan", owner_initials="MK", owner_role="KYC Compliance Manager",
                department="KYC", priority="High",
                due_date=future(15), status="In Progress", approval_state="Compliance Review",
            ),
            Action(
                id=act_002_id, action_code="ACT-1002",
                gap_id=gap_003_id, obligation_id=obl_005_id, regulation_id=reg_aml_id,
                title="Reduce STR filing timeline from 14 days to 7 days in AML Manual §5.1",
                description="Amend AML Compliance Manual §5.1 to change STR filing deadline from 14 days to 7 days. Update automated escalation workflows in the AML monitoring system. Conduct staff training on revised timeline. Implement system alert for 5-day warning before STR deadline.",
                owner="Raj Patel", owner_initials="RP", owner_role="Head of AML Compliance",
                department="Compliance", priority="Critical",
                due_date=future(7), status="Not Started", approval_state="Draft",
            ),
            Action(
                id=act_003_id, action_code="ACT-1003",
                gap_id=gap_004_id, obligation_id=obl_011_id, regulation_id=reg_cyber_id,
                title="Extend audit log retention from 180 days to 3 years with WORM storage",
                description="Update IT Security Policy §7.3 to mandate 3-year audit log retention. Procure and implement WORM (Write Once Read Many) storage solution for audit logs. Migrate existing logs to compliant storage. Implement quarterly tamper-verification audit process.",
                owner="Aditya Singh", owner_initials="AS", owner_role="CISO",
                department="IT", priority="Critical",
                due_date=future(21), status="In Progress", approval_state="Compliance Review",
            ),
            Action(
                id=act_004_id, action_code="ACT-1004",
                gap_id=gap_002_id, obligation_id=obl_002_id, regulation_id=reg_kyc_id,
                title="Align KYC review cycle documentation with RBI requirements",
                description="Update internal documentation to align KYC review cycle language with RBI Master Direction. Revise SOP-KYC-007 to specify 2-year review cycle for high-risk, 8-year for medium, and 10-year for low-risk customers. Train relationship managers on updated cycles.",
                owner="Priya Sharma", owner_initials="PS", owner_role="Compliance Officer",
                department="Compliance", priority="Medium",
                due_date=future(45), status="Not Started", approval_state="Draft",
            ),
            Action(
                id=act_005_id, action_code="ACT-1005",
                gap_id=gap_005_id, obligation_id=obl_010_id, regulation_id=reg_dataloc_id,
                title="Update Data Governance Policy to classify payment system data and document RBI approval process",
                description="Revise Data Governance Policy §2.4 to: (1) create distinct classification for payment system data, (2) document RBI approval workflow for any cross-border data flow, (3) implement data lineage tracking for payment data. Coordinate with IT infrastructure and legal teams.",
                owner="Kiran Mehta", owner_initials="KM", owner_role="Data Protection Officer",
                department="IT", priority="High",
                due_date=future(30), status="Not Started", approval_state="Draft",
            ),
        ]
        db.add_all(actions)

        # ══════════════════════════════════════════════
        # PROVENANCE
        # ══════════════════════════════════════════════
        prov_entries = [
            Provenance(id=uid(), entity_type="regulation", entity_id=reg_kyc_id,
                       event="Regulation Ingested", source_document="RBI KYC Master Direction 2026",
                       actor="Aarav Sharma", actor_type="user",
                       timestamp=datetime.utcnow() - timedelta(days=5)),
            Provenance(id=uid(), entity_type="regulation", entity_id=reg_kyc_id,
                       event="Analysis Started", source_document="RBI KYC Master Direction 2026",
                       actor="NiyamAI Pipeline", actor_type="ai", model_version="gemini-1.5-flash",
                       timestamp=datetime.utcnow() - timedelta(days=5, hours=1)),
            Provenance(id=uid(), entity_type="obligation", entity_id=obl_001_id,
                       event="Obligation Extracted", source_document="RBI KYC Master Direction 2026",
                       source_clause="C.2.1", source_page=17,
                       actor="NiyamAI Pipeline", actor_type="ai",
                       model_version="gemini-1.5-flash", confidence=0.96,
                       timestamp=datetime.utcnow() - timedelta(days=4)),
            Provenance(id=uid(), entity_type="mapping", entity_id=map_001_id,
                       event="Policy Mapping Created", source_document="RBI KYC Master Direction 2026",
                       source_clause="C.2.1", policy_ref="KYC Policy v3.4 §3.2",
                       actor="NiyamAI Pipeline", actor_type="ai",
                       model_version="gemini-1.5-flash", confidence=0.78,
                       timestamp=datetime.utcnow() - timedelta(days=4, hours=2)),
            Provenance(id=uid(), entity_type="gap", entity_id=gap_001_id,
                       event="Gap Detected", source_document="RBI KYC Master Direction 2026",
                       source_clause="C.2.1", policy_ref="KYC Policy v3.4 §3.2",
                       actor="NiyamAI Pipeline", actor_type="ai",
                       model_version="gemini-1.5-flash", confidence=0.91,
                       timestamp=datetime.utcnow() - timedelta(days=4, hours=2)),
            Provenance(id=uid(), entity_type="action", entity_id=act_001_id,
                       event="Action Generated by AI", source_document="RBI KYC Master Direction 2026",
                       actor="NiyamAI Pipeline", actor_type="ai",
                       model_version="gemini-1.5-flash",
                       timestamp=datetime.utcnow() - timedelta(days=3)),
            Provenance(id=uid(), entity_type="action", entity_id=act_001_id,
                       event="Action Assigned to Owner", actor="Aarav Sharma", actor_type="user",
                       timestamp=datetime.utcnow() - timedelta(days=2)),
            Provenance(id=uid(), entity_type="regulation", entity_id=reg_aml_id,
                       event="Regulation Ingested", source_document="AML Guidelines 2026",
                       actor="Meera Krishnan", actor_type="user",
                       timestamp=datetime.utcnow() - timedelta(days=3)),
            Provenance(id=uid(), entity_type="obligation", entity_id=obl_005_id,
                       event="Obligation Extracted", source_document="AML Guidelines 2026",
                       source_clause="F.2.3", source_page=12,
                       actor="NiyamAI Pipeline", actor_type="ai",
                       model_version="gemini-1.5-flash", confidence=0.97,
                       timestamp=datetime.utcnow() - timedelta(days=2)),
            Provenance(id=uid(), entity_type="gap", entity_id=gap_003_id,
                       event="Critical Gap Detected — STR Timeline",
                       source_document="AML Guidelines 2026", source_clause="F.2.3",
                       policy_ref="AML Compliance Manual v2.1 §5.1",
                       actor="NiyamAI Pipeline", actor_type="ai",
                       model_version="gemini-1.5-flash", confidence=0.95,
                       timestamp=datetime.utcnow() - timedelta(days=2, hours=1)),
            Provenance(id=uid(), entity_type="action", entity_id=act_002_id,
                       event="Action Created", actor="Raj Patel", actor_type="user",
                       timestamp=datetime.utcnow() - timedelta(days=1)),
            Provenance(id=uid(), entity_type="regulation", entity_id=reg_cyber_id,
                       event="Regulation Ingested", source_document="Cyber Security Framework Update 2026",
                       actor="Aarav Sharma", actor_type="user",
                       timestamp=datetime.utcnow() - timedelta(hours=18)),
            Provenance(id=uid(), entity_type="action", entity_id=act_003_id,
                       event="Action Updated — status: In Progress",
                       actor="Aditya Singh", actor_type="user",
                       timestamp=datetime.utcnow() - timedelta(hours=6)),
        ]
        db.add_all(prov_entries)

        await db.commit()
        print("✅ NiyamAI seed data loaded successfully!")
        print(f"   Regulations: 5")
        print(f"   Clauses:     5")
        print(f"   Policies:    10")
        print(f"   Obligations: 12")
        print(f"   Mappings:    6")
        print(f"   Gaps:        5")
        print(f"   Risks:       5")
        print(f"   Actions:     5")
        print(f"   Provenance:  {len(prov_entries)}")


if __name__ == "__main__":
    asyncio.run(seed())
