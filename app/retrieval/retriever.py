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

    ):

        results = self.vector_store.db.similarity_search(

            query,

            k=top_k,

        )

        return results