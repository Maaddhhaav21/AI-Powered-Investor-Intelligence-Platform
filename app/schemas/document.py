from pydantic import BaseModel


class DocumentChunk(BaseModel):

    chunk_id: int

    document_name: str

    content: str

    character_count: int