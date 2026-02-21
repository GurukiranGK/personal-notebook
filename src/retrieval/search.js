import { keywordScore } from "./keywordScore.js";

export async function search(collection, queryEmbedding, query, section) {
  const results = await collection.query({
    queryEmbeddings: [queryEmbedding],
    nResults: 6,
    where: section ? { section } : undefined,
    include: ["documents", "distances"],
  });

  const docs = results.documents[0];
  const distances = results.distances[0];

  // Convert distance → similarity score
  const vectorScores = distances.map(d => 1 / (1 + d));

  // Hybrid ranking
  const ranked = docs
    .map((text, i) => {
      return {
        text,
        score:
          0.7 * vectorScores[i] +
          0.3 * keywordScore(text, query),
      };
    })
    .sort((a, b) => b.score - a.score)
    .map(r => r.text);

  return ranked.slice(0, 3);
}