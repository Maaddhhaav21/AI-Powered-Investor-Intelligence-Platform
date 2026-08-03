from typing import Any

from pydantic import BaseModel, Field


class ChatResponse(BaseModel):
    """
    Response model for chat endpoint.
    """

    answer: str = Field(
        ...,
        description="Generated answer.",
    )

    sources: list[dict[str, Any]] = Field(
        default_factory=list,
        description="Retrieved document metadata.",
    )