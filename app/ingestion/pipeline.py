from pathlib import Path

from app.core.config import MARKDOWN_DIR
from app.core.logger import logger

from app.ingestion.pdf_loader import PDFLoader
from app.ingestion.markdown_converter import MarkdownConverter
from app.ingestion.markdown_cleaner import MarkdownCleaner
from app.ingestion.metadata_extractor import MetadataExtractor


class IngestionPipeline:

    def __init__(self):

        self.converter = MarkdownConverter()
        self.cleaner = MarkdownCleaner()
        self.metadata = MetadataExtractor()

    def ingest(self, pdf_path: Path):

        # Step 1: Validate PDF
        loader = PDFLoader(pdf_path)
        pdf_path = loader.load()

        logger.info("PDF validated successfully.")

        # Step 2: Convert PDF -> Markdown
        logger.info("Converting PDF to Markdown...")

        markdown = self.converter.convert(pdf_path)

        logger.success("Markdown conversion completed.")

        # Step 3: Clean Markdown
        logger.info("Cleaning Markdown...")

        clean_markdown = self.cleaner.clean(markdown)

        logger.success("Markdown cleaned successfully.")

        # Step 4: Save Markdown
        output_path = MARKDOWN_DIR / f"{pdf_path.stem}.md"

        self.converter.save(
            clean_markdown,
            output_path,
        )

        logger.success(f"Markdown saved at {output_path}")

        # Step 5: Extract Metadata
        metadata = self.metadata.extract(pdf_path)

        logger.success("Metadata extracted successfully.")

        return metadata