from pathlib import Path

from app.services.investment_report import InvestmentReportService


def main():

    report = InvestmentReportService().generate_report()

    output_file = Path(
        "data/reports/investment_report.md"
    )

    output_file.write_text(
        report,
        encoding="utf-8",
    )

    print()

    print("=" * 100)

    print("INVESTMENT REPORT GENERATED")

    print("=" * 100)

    print(output_file.resolve())


if __name__ == "__main__":

    main()