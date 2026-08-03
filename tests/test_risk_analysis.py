from app.services.risk_analysis import RiskAnalysisService


def main():

    service = RiskAnalysisService()

    report = service.analyze_risks()

    print()

    print("=" * 100)

    print("RISK ANALYSIS")

    print("=" * 100)

    print(report["answer"])


if __name__ == "__main__":

    main()