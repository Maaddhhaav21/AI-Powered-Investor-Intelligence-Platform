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

        embedding_model = EmbeddingGenerator().model

        self._collection = Chroma(
            collection_name=settings.CHROMA_COLLECTION,
            embedding_function=embedding_model,
            persist_directory=str(CHROMA_DB_DIR),
        )

    def add_chunks(
        self,
        chunks: List[DocumentChunk],
    ) -> None:
        """
        Store chunks inside ChromaDB.
        """

        ids = []
        texts = []
        metadatas = []

        for chunk in chunks:

            vector_id = (
                f"{chunk.document_name}_chunk_{chunk.chunk_id}"
            )

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

    def similarity_search(
        self,
        query: str,
        k: int = 5,
    ):
        """
        Returns the k most similar chunks.
        """

        return self._collection.similarity_search(
            query=query,
            k=k,
        )

    def delete_document(
        self,
        document_name: str,
    ) -> None:
        """
        Delete all chunks belonging to a document.
        """

        self._collection.delete(
            where={
                "document_name": document_name,
            }
        )

    def reset(self) -> None:
        """
        Delete the complete collection.
        """

        self._collection.reset_collection()

    def count(self) -> int:
        """
        Returns number of stored vectors.
        """

        return self._collection._collection.count()