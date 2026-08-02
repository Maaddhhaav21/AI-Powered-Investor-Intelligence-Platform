from pathlib import Path

from langchain_text_splitters import RecursiveCharacterTextSplitter

from app.schemas.document import DocumentChunk


class Chunker:

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

                ""

            ]

        )

    def chunk_document(

        self,

        markdown_path: Path

    ):

        markdown = markdown_path.read_text(

            encoding="utf-8"

        )

        chunks = self.splitter.split_text(

            markdown

        )

        output = []

        for index, chunk in enumerate(

            chunks,

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