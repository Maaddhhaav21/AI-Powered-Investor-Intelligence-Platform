from app.llm.chains import RAGChain


class SummaryService:

    def __init__(self):

        self.rag = RAGChain()

    def generate_summary(self):

        instruction = """
Generate a professional executive summary.

Include:

- Company overview
- Financial performance
- Business highlights
- Risks
- Future outlook

Write in investor-friendly language.
"""

        return self.rag.analyze_document(
            instruction=instruction
        )