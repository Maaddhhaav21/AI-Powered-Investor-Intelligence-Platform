from app.services.metrics_service import MetricsService


def main():

    service = MetricsService()

    report = service.extract_metrics()

    print()

    print("=" * 100)

    print("KEY FINANCIAL METRICS")

    print("=" * 100)

    print(report["answer"])


if __name__ == "__main__":

    main()