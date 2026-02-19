export async function search(collection, queryEmbedding, sectionFilter) {
  const results = await collection.query({
    queryEmbeddings: [queryEmbedding],
    nResults: 3,
    where: sectionFilter
      ? { section: sectionFilter }
      : undefined,
  });

  return results.documents[0];
}
