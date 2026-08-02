from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):

    OPENAI_API_KEY: str

    CHAT_MODEL: str

    EMBEDDING_MODEL: str

    CHROMA_COLLECTION: str

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
    )


settings = Settings()


PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent

DATA_DIR = PROJECT_ROOT / "data"

RAW_PDF_DIR = DATA_DIR / "raw_pdfs"

MARKDOWN_DIR = DATA_DIR / "markdown"

CHUNK_DIR = DATA_DIR / "chunks"

REPORT_DIR = DATA_DIR / "reports"

CHROMA_DB_DIR = PROJECT_ROOT / "chroma_db"

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