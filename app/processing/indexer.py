import json

from pathlib import Path

from typing import List

from app.schemas.document import DocumentChunk


class ChunkIndexer:

    def save(

        self,

        chunks: List[DocumentChunk],

        output_path: Path,

    ):

        output_path.write_text(

            json.dumps(

                [

                    chunk.model_dump()

                    for chunk in chunks

                ],

                indent=4,

            ),

            encoding="utf-8",

        )

    def load(

        self,

        chunk_file: Path,

    ):

        data = json.loads(

            chunk_file.read_text(

                encoding="utf-8"

            )

        )

        return [

            DocumentChunk(

                **item

            )

            for item in data

        ]