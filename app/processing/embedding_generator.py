from langchain_openai import OpenAIEmbeddings

from app.core.config import settings


class EmbeddingGenerator:
    """
    Creates and provides the embedding model.
    """

    def __init__(self):

        self._embedding_model = OpenAIEmbeddings(
            model=settings.EMBEDDING_MODEL,
            api_key=settings.OPENAI_API_KEY,
        )

    @property
    def model(self):
        """
        Returns the embedding model.
        """
        return self._embedding_model