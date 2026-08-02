from pathlib import Path

from app.core.constants import SUPPORTED_FILE_TYPES


def validate_file_exists(file_path: Path):

    if not file_path.exists():
        raise FileNotFoundError(
            f"{file_path} does not exist."
        )


def validate_file_type(file_path: Path):

    if file_path.suffix.lower() not in SUPPORTED_FILE_TYPES:
        raise ValueError(
            f"Unsupported file type: {file_path.suffix}"
        )