from typing import List

from app.processing.vector_store import VectorStore


class Retriever:
    """
    Retrieves relevant chunks from ChromaDB.
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
        """
        Retrieve a broad set of chunks for
        document-level analysis.

        Uses a generic financial query instead of
        the user's instruction.
        """

        return self.vector_store.similarity_search(
            query="financial performance revenue risk cash flow operations business strategy annual report",
            k=top_k,
        )