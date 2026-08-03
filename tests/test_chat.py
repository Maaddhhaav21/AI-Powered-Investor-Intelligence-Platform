from app.llm.chains import RAGChain


def main():

    rag = RAGChain()

    response = rag.invoke(

        question="What was Apple's total revenue?"

    )

    print("\n")

    print("=" * 100)

    print("ANSWER")

    print("=" * 100)

    print(response["answer"])

    print("\n")

    print("=" * 100)

    print("SOURCES")

    print("=" * 100)

    for source in response["sources"]:

        print(source)


if __name__ == "__main__":

    main()