from pathlib import Path

import json

from app.core.logger import logger
from app.core.config import MARKDOWN_DIR, CHUNK_DIR

from app.ingestion.pdf_loader import PDFLoader
from app.ingestion.markdown_converter import MarkdownConverter
from app.ingestion.markdown_cleaner import MarkdownCleaner
from app.ingestion.metadata_extractor import MetadataExtractor

from app.processing.chunker import Chunker
from app.processing.vector_store import VectorStore


class IngestionPipeline:

    def __init__(self):

        self.converter = MarkdownConverter()

        self.cleaner = MarkdownCleaner()

        self.metadata = MetadataExtractor()

        self.chunker = Chunker()

        self.vector_store = VectorStore()

    def ingest(self, pdf_path: Path):

        loader = PDFLoader(pdf_path)

        pdf_path = loader.load()

        logger.info("PDF validated.")

        markdown = self.converter.convert(pdf_path)

        logger.success("Markdown generated.")

        markdown = self.cleaner.clean(markdown)

        logger.success("Markdown cleaned.")

        markdown_path = MARKDOWN_DIR / f"{pdf_path.stem}.md"

        self.converter.save(

            markdown,

            markdown_path,

        )

        logger.success("Markdown saved.")

        chunks = self.chunker.chunk_document(

            markdown_path

        )

        logger.success(

            f"{len(chunks)} chunks created."

        )

        chunk_json = CHUNK_DIR / f"{pdf_path.stem}.json"

        chunk_json.write_text(

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

        self.vector_store.store_chunks(

            chunks

        )

        logger.success("Chunks indexed into ChromaDB.")

        metadata = self.metadata.extract(pdf_path)

        logger.success("Metadata extracted.")

        return metadata