import fitz  # PyMuPDF
import re

def extract_text_from_pdf(file_bytes: bytes) -> str:
    """
    Extracts text from a PDF file provided as bytes.
    Normalizes whitespace and returns lowercase text.
    """
    try:
        doc = fitz.open(stream=file_bytes, filetype="pdf")
        text = ""
        for page in doc:
            text += page.get_text() + " "
        
        # Normalize whitespace and lowercase
        text = re.sub(r'\s+', ' ', text).strip().lower()
        return text
    except Exception as e:
        print(f"Error extracting PDF: {e}")
        return ""
