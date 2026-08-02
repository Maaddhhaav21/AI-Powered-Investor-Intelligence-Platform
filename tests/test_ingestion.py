from pathlib import Path

from app.ingestion.pipeline import IngestionPipeline


def main():
    pipeline = IngestionPipeline()

    metadata = pipeline.ingest(
        Path("data/raw_pdfs/Apple_2024_Annual_Report.pdf")
    )

    print("\nMetadata:")
    print(metadata)


if __name__ == "__main__":
    main()