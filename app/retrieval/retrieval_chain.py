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

    ):

        documents = self.retriever.retrieve(

            question

        )

        return documents