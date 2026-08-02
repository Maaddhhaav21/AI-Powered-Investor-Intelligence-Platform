from app.retrieval.retrieval_chain import RetrievalChain

chain = RetrievalChain()

documents = chain.invoke(

    "What was Apple's revenue?"

)

print()

for doc in documents:

    print("=" * 80)

    print(doc.page_content[:500])

    print()