from app.services.summary_service import SummaryService
from app.services.financial_analysis import FinancialAnalysisService
from app.services.risk_analysis import RiskAnalysisService
from app.services.metrics_service import MetricsService


class InvestmentReportService:
    """
    Generates a comprehensive investor report
    by combining all analyses.
    """

    def __init__(self):

        self.summary_service = SummaryService()

        self.financial_service = FinancialAnalysisService()

        self.risk_service = RiskAnalysisService()

        self.metrics_service = MetricsService()

    def generate_report(self):

        print("Generating Executive Summary...")
        summary = self.summary_service.generate_summary()["answer"]

        print("Generating Financial Analysis...")
        financial = self.financial_service.analyze_financials()["answer"]

        print("Generating Risk Analysis...")
        risks = self.risk_service.analyze_risks()["answer"]

        print("Extracting Financial Metrics...")
        metrics = self.metrics_service.extract_metrics()["answer"]

        report = f"""
# AI INVESTOR INTELLIGENCE REPORT

---

# Executive Summary

{summary}

---

# Financial Analysis

{financial}

---

# Risk Analysis

{risks}

---

# Key Financial Metrics

{metrics}

---
"""

        return report