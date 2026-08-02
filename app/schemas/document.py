from typing import Optional

from pydantic import BaseModel, Field


class DocumentChunk(BaseModel):
    """
    Represents a single chunk extracted from a document.
    """

    chunk_id: int = Field(
        ...,
        description="Chunk number inside the document."
    )

    document_name: str = Field(
        ...,
        description="Original document name."
    )

    content: str = Field(
        ...,
        description="Chunk content."
    )

    character_count: int = Field(
        ...,
        description="Number of characters in the chunk."
    )

    embedding_id: Optional[str] = Field(
        default=None,
        description="Vector database identifier."
    )