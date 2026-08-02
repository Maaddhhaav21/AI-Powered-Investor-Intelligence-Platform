from pathlib import Path

import pymupdf4llm

from app.core.constants import UTF8


class MarkdownConverter:

    def convert(self, pdf_path: Path) -> str:

        markdown = pymupdf4llm.to_markdown(
            str(pdf_path)
        )

        return markdown

    def save(
        self,
        markdown: str,
        output_path: Path,
    ):

        output_path.write_text(
            markdown,
            encoding=UTF8,
        )