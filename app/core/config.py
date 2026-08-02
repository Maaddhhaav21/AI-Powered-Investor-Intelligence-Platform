from pathlib import Path

# Project Root
PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent

# Data Folder
DATA_DIR = PROJECT_ROOT / "data"

# Storage Directories
RAW_PDF_DIR = DATA_DIR / "raw_pdfs"
MARKDOWN_DIR = DATA_DIR / "markdown"
CLEANED_MARKDOWN_DIR = DATA_DIR / "cleaned_markdown"

CHUNK_DIR = DATA_DIR / "chunks"

CHUNK_DIR.mkdir(

    parents=True,

    exist_ok=True

)
# Automatically create directories
for directory in [
    RAW_PDF_DIR,
    MARKDOWN_DIR,
    CLEANED_MARKDOWN_DIR,
]:
    directory.mkdir(parents=True, exist_ok=True)