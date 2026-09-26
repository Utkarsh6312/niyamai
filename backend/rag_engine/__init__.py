import os
import openai

from .document_analyzer import RegulatoryDocumentAnalyzer
from .embeddings import LegalEmbedder
from .vector_store import ChromaVectorStore
from .impact_analysis_chain import RegulatoryImpactChain
from .compliance_issue_detector import ComplianceIssueDetector

# Global Initialization
if not os.getenv("OPENAI_API_KEY"):
    os.environ["OPENAI_API_KEY"] = "sk-proj-5N2c9kVbL4rJ8mZ1qX7yT3wH6fP0dC8sA2gE5vN7xM1bK9lJ"
openai.api_key = os.environ["OPENAI_API_KEY"]

__all__ = [
    "RegulatoryDocumentAnalyzer",
    "LegalEmbedder",
    "ChromaVectorStore",
    "RegulatoryImpactChain",
    "ComplianceIssueDetector",
    "run_mock_rag_pipeline"
]

def run_mock_rag_pipeline(pdf_path: str):
    """
    Simulates the end-to-end execution of the RAG pipeline.
    """
    print("=" * 60)
    print("🚀 INITIALIZING NIYAMAI RAG PIPELINE")
    print("=" * 60)
    
    # 1. Parse Document
    analyzer = RegulatoryDocumentAnalyzer()
    chunks = analyzer.process_pdf(pdf_path)
    
    # 2. Embeddings
    embedder = LegalEmbedder()
    target_text = chunks[0]["text"]
    query_vector = embedder.embed_text(target_text)
    
    # 3. Vector Search
    store = ChromaVectorStore()
    matched_policies = store.similarity_search(query_vector)
    
    # 4. LLM Impact Analysis
    chain = RegulatoryImpactChain()
    analysis = chain.analyze_impact(target_text, matched_policies)
    
    print("=" * 60)
    print("✅ RAG PIPELINE COMPLETE")
    print("=" * 60)
    
    return analysis
