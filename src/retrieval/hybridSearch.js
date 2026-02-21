import { keywordScore } from "./keywordScore.js";

export function hybridRank({
  vectorResults,
  vectorScores,
  query,
  alpha = 0.7,
  beta = 0.3,
}) {
  return vectorResults
    .map((text, i) => {
      const vScore = vectorScores[i];      // similarity score
      const kScore = keywordScore(text, query);

      return {
        text,
        score: alpha * vScore + beta * kScore,
      };
    })
    .sort((a, b) => b.score - a.score)
    .map(r => r.text);
}