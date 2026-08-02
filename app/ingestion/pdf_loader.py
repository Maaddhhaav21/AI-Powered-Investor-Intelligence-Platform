from pathlib import Path

from app.utils.validators import (
    validate_file_exists,
    validate_file_type,
)


class PDFLoader:

    def __init__(self, pdf_path: Path):

        self.pdf_path = pdf_path

    def load(self):

        validate_file_exists(self.pdf_path)

        validate_file_type(self.pdf_path)

        return self.pdf_path