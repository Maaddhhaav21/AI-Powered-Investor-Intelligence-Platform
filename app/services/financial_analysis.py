from app.llm.chains import RAGChain


class FinancialAnalysisService:
    """
    Generates a detailed financial analysis
    of the uploaded annual report.
    """

    def __init__(self):

        self.rag = RAGChain()

    def analyze_financials(self):

        instruction = """
You are a senior equity research analyst.

Prepare a detailed financial analysis of the company.

Include the following sections:

1. Revenue Analysis
   - Revenue growth
   - Segment performance
   - Revenue trends

2. Profitability
   - Gross Margin
   - Operating Margin
   - Net Profit Margin

3. Cash Flow Analysis
   - Operating Cash Flow
   - Investing Cash Flow
   - Financing Cash Flow

4. Balance Sheet Analysis
   - Cash Position
   - Debt
   - Liquidity

5. Financial Strengths

6. Financial Weaknesses

Write the report in professional language suitable for investors.
"""

        return self.rag.analyze_document(
            instruction=instruction
        )