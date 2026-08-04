from pathlib import Path
import shutil
from app.services.report_registry import ReportRegistry

from fastapi import (
    APIRouter,
    File,
    HTTPException,
    UploadFile,
)

from app.core.config import RAW_PDF_DIR
from app.ingestion.pipeline import IngestionPipeline

router = APIRouter(
    prefix="/upload",
    tags=["Upload"],
)


@router.post("/")
async def upload_pdf(
    file: UploadFile = File(...)
):

    if not file.filename.lower().endswith(".pdf"):

        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed.",
        )

    destination = RAW_PDF_DIR / file.filename

    with destination.open("wb") as buffer:

        shutil.copyfileobj(
            file.file,
            buffer,
        )

    pipeline = IngestionPipeline()

    metadata = pipeline.ingest(
        Path(destination)
    )

    metadata["pdf_path"] = str(destination)

    registry = ReportRegistry()

    report = registry.add(
        file.filename,
        metadata,
    )

    return {
        "report": report
    }