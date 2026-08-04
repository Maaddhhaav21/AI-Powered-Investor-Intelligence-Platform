from app.llm.chains import RAGChain


class InvestmentReportService:
    """
    Generates a professional investment research report
    from the uploaded annual report.
    """

    def __init__(self):
        self.rag = RAGChain()

    def generate_report(self):

        instruction = """
You are a Senior Equity Research Analyst at Goldman Sachs.

Analyze the uploaded annual report and generate a professional investment research report.

Return the entire report in GitHub Markdown.

Use EXACTLY the following structure.

# Investment Analysis Report: <Company Name> (<Fiscal Year>)

---

## Executive Summary

Write 2-3 concise paragraphs summarizing:

- Overall company performance
- Financial position
- Major opportunities
- Major risks
- Final investor takeaway

---

## Company Overview

Explain:

- Business model
- Products & Services
- Revenue Streams
- Geographic Presence
- Competitive Advantages

---

## Financial Performance

### Revenue Trends

Create a Markdown table.

| Segment | Current Year | Previous Year | Change | % Change |

Include every revenue segment found in the report.

Then explain the revenue trends.

---

### Profitability

Discuss:

- Revenue
- Gross Profit
- Operating Income
- Net Income
- EPS
- Gross Margin
- Operating Margin
- Net Margin

---

### Cash Flow

Discuss:

- Operating Cash Flow
- Investing Cash Flow
- Financing Cash Flow
- Free Cash Flow

---

### Balance Sheet

Discuss:

- Cash
- Short-term Investments
- Total Assets
- Total Liabilities
- Total Debt
- Equity

---

## Business Strengths

Provide bullet points explaining the company's strengths.

---

## Business Weaknesses

Provide bullet points explaining the company's weaknesses.

---

## Risk Analysis

Split into sections.

### Operational Risks

### Financial Risks

### Market Risks

### Regulatory Risks

### Technology Risks

### Supply Chain Risks

Explain each category.

---

## Growth Opportunities

Discuss:

- AI
- Automation
- Robotics
- Energy
- International Expansion
- New Products

(if mentioned)

---

## Competitive Position

Compare with competitors if information is available.

---

## Valuation Discussion

Discuss whether the company appears:

- Undervalued
- Fairly Valued
- Overvalued

based ONLY on information available in the report.

Do NOT invent valuation ratios.

---

## Investment Recommendation

Choose ONE:

# BUY

OR

# HOLD

OR

# SELL

Provide detailed justification.

---

## Conclusion

Summarize the report in one paragraph.

Formatting Rules:

- Use proper Markdown headings.
- Use Markdown tables wherever numerical information exists.
- Use bullet points whenever appropriate.
- Never output JSON.
- Never output HTML.
- Never mention the prompt.
- Keep the report professional like an equity research report from Goldman Sachs, Morgan Stanley, or JP Morgan.
"""

        result = self.rag.analyze_document(
            instruction=instruction
        )

        return result