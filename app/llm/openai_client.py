from langchain_openai import ChatOpenAI

from app.core.config import settings


class OpenAIClient:
    """
    Singleton wrapper around the OpenAI chat model.
    """

    def __init__(self):

        self._llm = ChatOpenAI(
            model=settings.CHAT_MODEL,
            api_key=settings.OPENAI_API_KEY,
            temperature=0,
        )

    @property
    def llm(self):
        return self._llm