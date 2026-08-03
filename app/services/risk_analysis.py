from app.llm.chains import RAGChain


class RiskAnalysisService:
    """
    Generates a detailed risk analysis
    from the uploaded annual report.
    """

    def __init__(self):

        self.rag = RAGChain()

    def analyze_risks(self):

        instruction = """
You are a senior investment risk analyst.

Analyze the annual report and identify all significant risks.

Organize your answer into the following sections:

1. Business Risks

2. Market Risks

3. Financial Risks

4. Operational Risks

5. Regulatory & Legal Risks

6. Technology & Cybersecurity Risks

7. Supply Chain Risks

8. ESG & Sustainability Risks (if mentioned)

9. Overall Risk Assessment

For each risk:

- Explain the risk.
- Explain its potential impact.
- Mention any mitigation strategy described by the company.

Write the report in professional language suitable for investors.
"""

        return self.rag.analyze_document(
            instruction=instruction
        )