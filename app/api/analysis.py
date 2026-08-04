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
    result = summary_service.generate_summary()
    return {"markdown": result["answer"]}


@router.get("/financial-analysis")
def financial_analysis():
    result = financial_service.analyze_financials()
    return {"markdown": result["answer"]}


@router.get("/risk-analysis")
def risk_analysis():
    result = risk_service.analyze_risks()
    return {"markdown": result["answer"]}


@router.get("/investment-report")
def investment_report():
    result = investment_service.generate_report()
    return {"markdown": result["answer"]}