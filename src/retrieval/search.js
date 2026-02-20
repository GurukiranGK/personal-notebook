export async function search(collection, queryEmbedding, section) {
  const results = await collection.query({
    queryEmbeddings: [queryEmbedding],
    nResults: 3,
    where: section ? { section } : undefined,
  });

  return results.documents[0] || [];
}