export function keywordScore(text, query) {
  const qWords = query
    .toLowerCase()
    .split(/\s+/)
    .filter(w => w.length > 2);

  const t = text.toLowerCase();

  let score = 0;
  for (const word of qWords) {
    if (t.includes(word)) score++;
  }

  return score;
}