from fastapi import APIRouter

router = APIRouter(
    prefix="/health",
    tags=["Health"],
)


@router.get("/")
def health():

    return {
        "status": "healthy",
        "application": "AI Powered Investor Intelligence Platform",
    }