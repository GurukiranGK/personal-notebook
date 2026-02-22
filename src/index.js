import "dotenv/config";

import { loadText } from "./ingestion/loadText.js";
import { chunkText } from "./ingestion/chunkText.js";
import { embedTexts } from "./embeddings/embed.js";
import { storeVectors } from "./retrieval/chromaStore.js";
import { search } from "./retrieval/search.js";
import { rerank } from "./retrieval/rerank.js";
import { generateAnswer } from "./generation/answer.js";

async function main() {
  const question = "Why is RAG important?";
  const sectionFilter = "importance";

  // 1️⃣ Load document
  const text = loadText("sample.txt");

  // 2️⃣ Chunk document
  const chunks = await chunkText(text);

  // 3️⃣ Embed chunks (strings only)
  const chunkTexts = chunks.map(c => c.pageContent);
  const chunkEmbeddings = await embedTexts(chunkTexts);

  // 4️⃣ Store vectors + metadata
  const collection = await storeVectors(chunks, chunkEmbeddings);

  // 5️⃣ Embed query
  const [queryEmbedding] = await embedTexts([question]);

  // 6️⃣ Hybrid retrieval (vector + keyword)
  const retrievedChunks = await search(
    collection,
    queryEmbedding,
    question,
    sectionFilter
  );

  console.log("\nRetrieved Chunks (before reranking):\n");
  retrievedChunks.forEach((c, i) => {
    console.log(`--- Chunk ${i + 1} ---`);
    console.log(c);
  });

  // 7️⃣ Rerank retrieved chunks
  const rerankedChunks = rerank(retrievedChunks, question);

  // 8️⃣ Limit context (important)
  const finalContext = rerankedChunks.slice(0, 3);

  console.log("\nFinal Context (after reranking):\n");
  finalContext.forEach((c, i) => {
    console.log(`--- Context ${i + 1} ---`);
    console.log(c);
  });

  // 9️⃣ Generate grounded answer
  const answer = await generateAnswer(question, finalContext);

  console.log("\nFinal Answer:\n");
  console.log(answer);
}

main();