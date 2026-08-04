from typing import List

from langchain_chroma import Chroma

from app.core.config import (
    CHROMA_DB_DIR,
    settings,
)

from app.processing.embedding_generator import EmbeddingGenerator
from app.schemas.document import DocumentChunk


class VectorStore:
    """
    Handles all interactions with ChromaDB.
    """

    def __init__(self):
        self.embedding_model = EmbeddingGenerator().model
        self._connect()

    def _connect(self):
        """
        Reconnect to the Chroma collection.
        """
        self._collection = Chroma(
            collection_name=settings.CHROMA_COLLECTION,
            embedding_function=self.embedding_model,
            persist_directory=str(CHROMA_DB_DIR),
        )

    def add_chunks(
        self,
        chunks: List[DocumentChunk],
    ) -> None:
        """
        Replace the existing collection with the newly uploaded report.
        """

        print("Removing previous document embeddings...")

        try:
            self._collection.delete_collection()
        except Exception:
            pass

        # IMPORTANT:
        # recreate the collection after deleting it
        self._connect()

        print("Previous embeddings removed.")

        ids = []
        texts = []
        metadatas = []

        for chunk in chunks:
            vector_id = f"{chunk.document_name}_chunk_{chunk.chunk_id}"

            chunk.embedding_id = vector_id

            ids.append(vector_id)
            texts.append(chunk.content)

            metadatas.append(
                {
                    "document_name": chunk.document_name,
                    "chunk_id": chunk.chunk_id,
                    "character_count": chunk.character_count,
                }
            )

        self._collection.add_texts(
            texts=texts,
            metadatas=metadatas,
            ids=ids,
        )

        print("Embeddings stored.")

    def similarity_search(
        self,
        query: str,
        k: int = 5,
    ):
        """
        Perform Max Marginal Relevance search.
        """

        # reconnect if collection was deleted
        self._connect()

        return self._collection.max_marginal_relevance_search(
            query=query,
            k=k,
            fetch_k=max(20, k * 4),
            lambda_mult=0.5,
        )

    def delete_document(
        self,
        document_name: str,
    ) -> None:
        self._collection.delete(
            where={
                "document_name": document_name,
            }
        )

    def reset(self):
        try:
            self._collection.delete_collection()
        except Exception:
            pass

        self._connect()

    def count(self):
        self._connect()
        return self._collection._collection.count()