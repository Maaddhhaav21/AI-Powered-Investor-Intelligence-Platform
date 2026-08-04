from fastapi import APIRouter

from app.services.report_registry import ReportRegistry

router = APIRouter(
    prefix="/reports",
    tags=["Reports"],
)


@router.get("/")
def list_reports():

    registry = ReportRegistry()

    return registry.list()
