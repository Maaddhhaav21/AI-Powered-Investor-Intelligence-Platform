from typing import List

from app.retrieval.retriever import Retriever


class RetrievalChain:
    """
    Executes the retrieval pipeline.
    """

    def __init__(self):

        self.retriever = Retriever()

    def invoke(
        self,
        question: str,
        top_k: int = 5,
    ) -> List:

        return self.retriever.retrieve(
            query=question,
            top_k=top_k,
        )