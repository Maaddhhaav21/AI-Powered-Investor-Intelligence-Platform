from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Application configuration loaded from .env
    """

    # ------------------------
    # OpenAI
    # ------------------------

    OPENAI_API_KEY: str

    CHAT_MODEL: str

    EMBEDDING_MODEL: str

    # ------------------------
    # Chroma
    # ------------------------

    CHROMA_COLLECTION: str

    # ------------------------
    # FastAPI
    # ------------------------

    API_HOST: str = "127.0.0.1"

    API_PORT: int = 8000

    # ------------------------
    # Logging
    # ------------------------

    LOG_LEVEL: str = "INFO"

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
    )


settings = Settings()

# ============================================================
# Project Paths
# ============================================================

PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent

DATA_DIR = PROJECT_ROOT / "data"

RAW_PDF_DIR = DATA_DIR / "raw_pdfs"

MARKDOWN_DIR = DATA_DIR / "markdown"

CHUNK_DIR = DATA_DIR / "chunks"

REPORT_DIR = DATA_DIR / "reports"

CHROMA_DB_DIR = PROJECT_ROOT / "chroma_db"

# ============================================================
# Create folders automatically
# ============================================================

for directory in [
    RAW_PDF_DIR,
    MARKDOWN_DIR,
    CHUNK_DIR,
    REPORT_DIR,
    CHROMA_DB_DIR,
]:
    directory.mkdir(
        parents=True,
        exist_ok=True,
    )