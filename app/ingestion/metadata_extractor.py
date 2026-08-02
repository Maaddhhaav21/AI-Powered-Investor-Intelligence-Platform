from pathlib import Path

import fitz


class MetadataExtractor:

    def extract(
        self,
        pdf_path: Path,
    ):

        document = fitz.open(pdf_path)

        metadata = {

            "filename": pdf_path.name,

            "company": pdf_path.stem,

            "pages": document.page_count,

            "title": document.metadata.get("title"),

            "author": document.metadata.get("author"),
        }

        document.close()

        return metadata