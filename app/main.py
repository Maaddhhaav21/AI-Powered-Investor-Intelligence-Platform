from fastapi import FastAPI

from app.api.health import router as health_router
from app.api.upload import router as upload_router
from app.api.chat import router as chat_router
from app.api.analysis import router as analysis_router

app = FastAPI(

    title="AI Powered Investor Intelligence Platform",

    version="1.0.0",

    description="AI Powered Investor Intelligence Platform using RAG",

)

app.include_router(health_router)

app.include_router(upload_router)

app.include_router(chat_router)

app.include_router(analysis_router)


@app.get("/")
def root():

    return {

        "message": "AI Powered Investor Intelligence Platform",

        "version": "1.0.0",

    }