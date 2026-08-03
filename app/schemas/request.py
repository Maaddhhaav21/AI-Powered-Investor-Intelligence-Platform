from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    """
    Request model for chat endpoint.
    """

    question: str = Field(
        ...,
        description="User question.",
    )