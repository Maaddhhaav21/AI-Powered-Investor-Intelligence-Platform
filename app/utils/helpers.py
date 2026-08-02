from pathlib import Path


def ensure_directory(directory: Path) -> None:
    directory.mkdir(parents=True, exist_ok=True)


def get_file_stem(file_path: Path) -> str:
    return file_path.stem