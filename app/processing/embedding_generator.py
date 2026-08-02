from langchain_openai import OpenAIEmbeddings

from app.core.config import settings


class EmbeddingGenerator:
    """
    Creates the embedding model used throughout
    the application.
    """

    def __init__(self):

        self.model = OpenAIEmbeddings(
            model=settings.EMBEDDING_MODEL,
            api_key=settings.OPENAI_API_KEY,
        )

    def get_model(self):

        return self.model