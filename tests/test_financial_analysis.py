from app.services.financial_analysis import FinancialAnalysisService


def main():

    service = FinancialAnalysisService()

    report = service.analyze_financials()

    print("\n")

    print("=" * 100)

    print("FINANCIAL ANALYSIS")

    print("=" * 100)

    print(report["answer"])


if __name__ == "__main__":

    main()