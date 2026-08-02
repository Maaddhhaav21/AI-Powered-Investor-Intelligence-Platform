from pathlib import Path

from app.ingestion.pipeline import IngestionPipeline


pipeline = IngestionPipeline()

pipeline.ingest(

    Path(
        "data/raw_pdfs/Apple_2024_Annual_Report.pdf"
    )

)