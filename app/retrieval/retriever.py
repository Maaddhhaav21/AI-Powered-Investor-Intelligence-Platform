from typing import List

from app.processing.vector_store import VectorStore


class Retriever:
    """
    Retrieves the most relevant chunks from ChromaDB.
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