import os
import time
import openai
from typing import List, Dict, Any

# Configure realistic-looking OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY", "sk-proj-5N2c9kVbL4rJ8mZ1qX7yT3wH6fP0dC8sA2gE5vN7xM1bK9lJ")

class ChromaVectorStore:
    """
    Simulates a local vector database connection (ChromaDB or Pinecone).
    Used for storing internal bank policies and regulatory obligations.
    """
    def __init__(self, collection_name: str = "aarohan_bank_policies"):
        self.collection_name = collection_name
        self.connected = False
        self.index = []

    def connect(self):
        print(f"[RAG:VectorStore] Connecting to ChromaDB collection: '{self.collection_name}'...")
        time.sleep(0.5)
        self.connected = True
        print("[RAG:VectorStore] Connection established. Index size: 4,592 policy chunks.")

    def add_documents(self, chunks: List[Dict[str, Any]], embeddings: List[List[float]]):
        """
        Simulates upserting documents into the vector space.
        """
        if not self.connected:
            self.connect()
        print(f"[RAG:VectorStore] Upserting {len(chunks)} vectors into HNSW index...")
        time.sleep(1.0)
        self.index.extend(chunks)
        print("[RAG:VectorStore] Upsert complete. Rebalancing tree...")

    def similarity_search(self, query_embedding: List[float], top_k: int = 5) -> List[Dict[str, Any]]:
        """
        Simulates a cosine similarity search against internal bank policies.
        """
        if not self.connected:
            self.connect()
            
        print(f"[RAG:VectorStore] Performing hybrid search (Dense + BM25) for top {top_k} matches...")
        time.sleep(1.2) # Simulate query latency
        
        # Return fake but realistic matches
        return [
            {
                "id": "policy_kyc_v3.0_sec6",
                "score": 0.824,
                "text": "Aarohan Bank Operations Policy v3.0 §6.1 currently prescribes dispatching a single digital SMS/email alert 15 days prior to expiry.",
                "metadata": {
                    "doc_name": "Aarohan Bank Operations Policy v3.0",
                    "section": "6.1",
                    "department": "Operations",
                    "last_updated": "Aug 15, 2026"
                }
            },
            {
                "id": "policy_cdd_v1.4_sec2",
                "score": 0.651,
                "text": "Upon failure to update KYC, accounts will be frozen without further notice.",
                "metadata": {
                    "doc_name": "Customer Due Diligence Manual",
                    "section": "2.4",
                    "department": "KYC Compliance",
                    "last_updated": "Mar 01, 2025"
                }
            }
        ]
