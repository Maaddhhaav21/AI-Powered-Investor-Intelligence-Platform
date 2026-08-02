from typing import List

from langchain_chroma import Chroma

from app.processing.embedding_generator import EmbeddingGenerator
from app.schemas.document import DocumentChunk
from app.core.config import settings, CHROMA_DB_DIR


class VectorStore:
    """
    Handles every interaction with ChromaDB.
    """

    def __init__(self):

        embedding_model = EmbeddingGenerator().get_model()

        self.db = Chroma(

            collection_name=settings.CHROMA_COLLECTION,

            embedding_function=embedding_model,

            persist_directory=str(CHROMA_DB_DIR),

        )

    def store_chunks(
        self,
        chunks: List[DocumentChunk],
    ):

        texts = []

        metadatas = []

        ids = []

        for chunk in chunks:

            chunk_id = f"{chunk.document_name}_{chunk.chunk_id}"

            chunk.embedding_id = chunk_id

            ids.append(chunk_id)

            texts.append(chunk.content)

            metadatas.append(

                {

                    "document_name": chunk.document_name,

                    "chunk_id": chunk.chunk_id,

                    "character_count": chunk.character_count,

                }

            )

        self.db.add_texts(

            texts=texts,

            metadatas=metadatas,

            ids=ids,

        )