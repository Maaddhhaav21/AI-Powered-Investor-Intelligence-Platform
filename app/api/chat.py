from fastapi import APIRouter, HTTPException

from app.llm.chains import RAGChain
from app.schemas.request import ChatRequest
from app.schemas.response import ChatResponse


router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)


rag = RAGChain()


@router.post(
    "/",
    response_model=ChatResponse,
)
def chat(
    request: ChatRequest,
):

    if not request.question.strip():

        raise HTTPException(
            status_code=400,
            detail="Question cannot be empty.",
        )

    result = rag.invoke(
        question=request.question,
    )

    return ChatResponse(
        answer=result["answer"],
        sources=result["sources"],
    )