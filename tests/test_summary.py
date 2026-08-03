from app.services.summary_service import SummaryService


def main():

    service = SummaryService()

    summary = service.generate_summary()

    print("\n")

    print("=" * 100)

    print("EXECUTIVE SUMMARY")

    print("=" * 100)

    print(summary["answer"])


if __name__ == "__main__":

    main()