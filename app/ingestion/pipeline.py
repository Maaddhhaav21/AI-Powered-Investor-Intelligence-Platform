from pathlib import Path
import json

from app.core.config import (
    CHUNK_DIR,
    MARKDOWN_DIR,
)

from app.core.logger import logger

from app.ingestion.pdf_loader import PDFLoader
from app.ingestion.markdown_converter import MarkdownConverter
from app.ingestion.markdown_cleaner import MarkdownCleaner
from app.ingestion.metadata_extractor import MetadataExtractor

from app.processing.chunker import Chunker
from app.processing.vector_store import VectorStore


class IngestionPipeline:
    """
    Complete document ingestion pipeline.

    PDF
        ↓
    Markdown
        ↓
    Clean Markdown
        ↓
    Chunks
        ↓
    JSON
        ↓
    ChromaDB
    """

    def __init__(self):

        self.converter = MarkdownConverter()

        self.cleaner = MarkdownCleaner()

        self.metadata_extractor = MetadataExtractor()

        self.chunker = Chunker()

        self.vector_store = VectorStore()

    def ingest(
        self,
        pdf_path: Path,
    ):

        logger.info("Starting ingestion pipeline...")

        # -----------------------------------------------------
        # Validate PDF
        # -----------------------------------------------------

        loader = PDFLoader(pdf_path)

        pdf_path = loader.load()

        logger.success("PDF validated.")

        # -----------------------------------------------------
        # Convert PDF -> Markdown
        # -----------------------------------------------------

        markdown = self.converter.convert(pdf_path)

        logger.success("Markdown generated.")

        # -----------------------------------------------------
        # Clean Markdown
        # -----------------------------------------------------

        markdown = self.cleaner.clean(markdown)

        logger.success("Markdown cleaned.")

        # -----------------------------------------------------
        # Save Markdown
        # -----------------------------------------------------

        markdown_path = MARKDOWN_DIR / f"{pdf_path.stem}.md"

        self.converter.save(
            markdown,
            markdown_path,
        )

        logger.success("Markdown saved.")

        # -----------------------------------------------------
        # Chunk Markdown
        # -----------------------------------------------------

        chunks = self.chunker.chunk_document(
            markdown_path
        )

        logger.success(
            f"{len(chunks)} chunks created."
        )

        # -----------------------------------------------------
        # Save Chunk JSON
        # -----------------------------------------------------

        json_path = CHUNK_DIR / f"{pdf_path.stem}.json"

        json_path.write_text(
            json.dumps(
                [
                    chunk.model_dump()
                    for chunk in chunks
                ],
                indent=4,
            ),
            encoding="utf-8",
        )

        logger.success("Chunk JSON saved.")

        # -----------------------------------------------------
        # RESET CHROMADB
        # -----------------------------------------------------

        logger.info("Removing previous document embeddings...")

        self.vector_store.reset()

        logger.success("Previous embeddings removed.")

        # -----------------------------------------------------
        # Store New Chunks
        # -----------------------------------------------------

        self.vector_store.add_chunks(
            chunks
        )

        logger.success(
            "Embeddings stored in ChromaDB."
        )

        # -----------------------------------------------------
        # Extract Metadata
        # -----------------------------------------------------

        metadata = self.metadata_extractor.extract(
            pdf_path
        )

        logger.success(
            "Metadata extracted."
        )

        logger.success(
            "Ingestion completed."
        )

        return metadata