from typing import Optional

from pydantic import BaseModel


class DocumentChunk(BaseModel):
    """
    Represents one chunk of a document.
    """

    chunk_id: int

    document_name: str

    content: str

    character_count: int

    embedding_id: Optional[str] = None