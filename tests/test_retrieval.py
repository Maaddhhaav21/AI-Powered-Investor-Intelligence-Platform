from app.retrieval.retrieval_chain import RetrievalChain


def main():

    chain = RetrievalChain()

    results = chain.invoke(

        question="What was Apple's revenue?",

        top_k=5,

    )

    print("\n")

    print("=" * 100)

    print("Retrieved Chunks")

    print("=" * 100)

    for index, document in enumerate(results, start=1):

        print(f"\nChunk {index}")

        print("-" * 80)

        print(document.page_content[:700])

        print()

        print(document.metadata)

        print()


if __name__ == "__main__":

    main()