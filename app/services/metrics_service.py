from app.llm.chains import RAGChain


class MetricsService:
    """
    Extracts important financial metrics
    from the annual report.
    """

    def __init__(self):

        self.rag = RAGChain()

    def extract_metrics(self):

        instruction = """
You are a professional financial analyst.

Extract the key financial metrics from the annual report.

Return the information as a Markdown table.

The table must contain the following metrics if available:

| Metric | Value |

Metrics:

- Total Revenue
- Net Income
- Gross Profit
- Operating Income
- Operating Margin
- Gross Margin
- Net Profit Margin
- Earnings Per Share (EPS)
- Cash & Cash Equivalents
- Total Assets
- Total Liabilities
- Total Debt
- Shareholders' Equity
- Operating Cash Flow
- Free Cash Flow
- Research & Development Expense
- Capital Expenditure
- Dividend Paid

If a metric is unavailable, write "Not Available".

After the table, provide a brief interpretation of the company's financial health.
"""

        return self.rag.analyze_document(
            instruction=instruction
        )