from typing import List

from app.processing.vector_store import VectorStore


class Retriever:
    """
    Retrieves relevant chunks from ChromaDB using
    Max Marginal Relevance (MMR).
    """

    def __init__(self):

        self.vector_store = VectorStore()

    def retrieve(
        self,
        query: str,
        top_k: int = 5,
    ) -> List:

        return self.vector_store.similarity_search(
            query=query,
            k=top_k,
        )

    def retrieve_all(
        self,
        top_k: int = 30,
    ) -> List:

        return self.vector_store.similarity_search(
            query="financial performance revenue cash flow risk business strategy annual report",
            k=top_k,
        )