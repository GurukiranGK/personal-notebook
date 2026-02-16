export async function search(collection, queryEmbedding, k = 2) {
  const results = await collection.query({
    queryEmbeddings: [queryEmbedding],
    nResults: k,
  });

  return results.documents[0];
}
