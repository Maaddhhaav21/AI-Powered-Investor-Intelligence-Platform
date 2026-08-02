from pathlib import Path

from app.core.config import MARKDOWN_DIR
from app.core.logger import logger

from app.ingestion.pdf_loader import PDFLoader
from app.ingestion.markdown_converter import MarkdownConverter
from app.ingestion.metadata_extractor import MetadataExtractor


class IngestionPipeline:

    def __init__(self):

        self.converter = MarkdownConverter()

        self.metadata = MetadataExtractor()

    def ingest(
        self,
        pdf_path: Path,
    ):

        loader = PDFLoader(pdf_path)

        pdf_path = loader.load()

        logger.info("Converting PDF to Markdown...")

        markdown = self.converter.convert(
            pdf_path
        )

        output_path = (
            MARKDOWN_DIR /
            f"{pdf_path.stem}.md"
        )

        self.converter.save(
            markdown,
            output_path,
        )

        metadata = self.metadata.extract(
            pdf_path
        )

        logger.success(
            "Markdown created successfully."
        )

        return metadata