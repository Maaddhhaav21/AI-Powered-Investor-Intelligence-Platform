import re
from pathlib import Path

from langchain_text_splitters import RecursiveCharacterTextSplitter

from app.schemas.document import DocumentChunk


class Chunker:
    """
    Creates clean, production-quality chunks for RAG.
    """

    MIN_CHUNK_SIZE = 250

    def __init__(
        self,
        chunk_size: int = 1000,
        chunk_overlap: int = 200,
    ):

        self.splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
            separators=[
                "\n\n",
                "\n",
                ". ",
                " ",
                "",
            ],
        )

    def _clean_markdown(
        self,
        text: str,
    ) -> str:
        """
        Remove markdown artifacts before chunking.
        """

        # Normalize line endings
        text = text.replace("\r\n", "\n")

        # Remove repeated empty lines
        text = re.sub(r"\n{3,}", "\n\n", text)

        # Remove markdown horizontal rules
        text = re.sub(r"^-{3,}$", "", text, flags=re.MULTILINE)

        # Remove page separators
        text = re.sub(r"^Page\s+\d+$", "", text, flags=re.MULTILINE)

        # Remove markdown headers with no content
        text = re.sub(r"^#+\s*$", "", text, flags=re.MULTILINE)

        # Remove excessive spaces
        text = re.sub(r"[ \t]+", " ", text)

        return text.strip()

    def chunk_document(
        self,
        markdown_path: Path,
    ):

        markdown = markdown_path.read_text(
            encoding="utf-8"
        )

        markdown = self._clean_markdown(markdown)

        raw_chunks = self.splitter.split_text(markdown)

        merged_chunks = []

        buffer = ""

        for chunk in raw_chunks:

            chunk = chunk.strip()

            if not chunk:
                continue

            if len(chunk) < self.MIN_CHUNK_SIZE:

                if buffer:
                    buffer += "\n\n" + chunk
                else:
                    buffer = chunk

                continue

            if buffer:

                chunk = buffer + "\n\n" + chunk

                buffer = ""

            merged_chunks.append(chunk)

        if buffer:

            if merged_chunks:

                merged_chunks[-1] += "\n\n" + buffer

            else:

                merged_chunks.append(buffer)

        output = []

        for index, chunk in enumerate(
            merged_chunks,
            start=1,
        ):

            output.append(
                DocumentChunk(
                    chunk_id=index,
                    document_name=markdown_path.stem,
                    content=chunk,
                    character_count=len(chunk),
                )
            )

        return output