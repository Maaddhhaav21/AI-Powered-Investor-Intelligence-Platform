from app.llm.openai_client import OpenAIClient
from app.retrieval.retrieval_chain import RetrievalChain


class RAGChain:

    def __init__(self):

        self.retrieval_chain = RetrievalChain()

        self.llm = OpenAIClient().llm

    def invoke(
        self,
        question: str,
    ):

        documents = self.retrieval_chain.invoke(
            question=question,
            top_k=5,
        )

        context = "\n\n".join(
            doc.page_content
            for doc in documents
        )

        prompt = f"""
You are a financial analyst.

Answer ONLY using the provided context.

Context
-------
{context}

Question
--------
{question}

Answer:
"""

        response = self.llm.invoke(prompt)

        return {
            "answer": response.content,
            "sources": [
                doc.metadata
                for doc in documents
            ],
        }

    def analyze_document(
        self,
        instruction: str,
    ):

        documents = self.retrieval_chain.retriever.retrieve_all(
            top_k=30,
        )

        context = "\n\n".join(
            doc.page_content
            for doc in documents
        )

        prompt = f"""
You are a senior investment analyst.

Below is information extracted from an annual report.

{instruction}

Context
-------
{context}

Answer:
"""

        response = self.llm.invoke(prompt)

        return {
            "answer": response.content,
            "sources": [
                doc.metadata
                for doc in documents
            ],
        }