export function rerank(chunks, question) {
  const q = question.toLowerCase();

  return chunks
    .map(text => {
      let score = 0;

      // Boost chunks that repeat question terms
      q.split(/\s+/).forEach(word => {
        if (word.length > 3 && text.toLowerCase().includes(word)) {
          score += 1;
        }
      });

      // Boost “important” sections slightly
      if (text.toLowerCase().includes("important")) {
        score += 0.5;
      }

      return { text, score };
    })
    .sort((a, b) => b.score - a.score)
    .map(r => r.text);
}