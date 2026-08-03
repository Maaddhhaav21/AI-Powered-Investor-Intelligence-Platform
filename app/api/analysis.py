from fastapi import APIRouter

from app.services.summary_service import SummaryService
from app.services.financial_analysis import FinancialAnalysisService
from app.services.risk_analysis import RiskAnalysisService
from app.services.metrics_service import MetricsService
from app.services.investment_report import InvestmentReportService

router = APIRouter(
    prefix="/analysis",
    tags=["Analysis"],
)

summary_service = SummaryService()
financial_service = FinancialAnalysisService()
risk_service = RiskAnalysisService()
metrics_service = MetricsService()
investment_service = InvestmentReportService()


@router.get("/summary")
def summary():

    return summary_service.generate_summary()


@router.get("/financial-analysis")
def financial_analysis():

    return financial_service.analyze_financials()


@router.get("/risk-analysis")
def risk_analysis():

    return risk_service.analyze_risks()


@router.get("/metrics")
def metrics():

    return metrics_service.extract_metrics()


@router.get("/investment-report")
def investment_report():

    report = investment_service.generate_report()

    return {

        "report": report

    }