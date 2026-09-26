from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
import os

os.makedirs('dummy_pdfs', exist_ok=True)

cases = [
    ("dummy_pdfs/1_Transaction_Policy.pdf", "Transactions below ₹25,000 are approved without SMS OTP authentication for faster processing. Ensure proper transaction authentication logging."),
    ("dummy_pdfs/2_Dormant_Accounts.pdf", "Any dormant account reactivation request must undergo basic customer verification. Inactive accounts can be activated at the branch."),
    ("dummy_pdfs/3_Cash_Monitoring.pdf", "The new AML guidelines dictate that large cash deposits exceeding 10 Lakhs require reporting, but structuring below the threshold loophole remains an issue. Transaction monitoring is vital."),
    ("dummy_pdfs/4_Digital_Beneficiary.pdf", "When a new beneficiary is added, ensure there is a cooling period for beneficiary activation to prevent unauthorized immediate transfer."),
    ("dummy_pdfs/5_Device_Binding.pdf", "A device change request must initiate device binding to prevent unauthorized login from a new phone.")
]

for filename, content in cases:
    c = canvas.Canvas(filename, pagesize=letter)
    c.drawString(100, 750, "Banking Policy Document")
    c.drawString(100, 700, content)
    c.save()
