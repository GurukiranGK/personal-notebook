import "dotenv/config";
import { loadText } from "./ingestion/loadText.js";
import { chunkText } from "./ingestion/chunkText.js";
import { embedTexts } from "./embeddings/embed.js";
import { storeVectors } from "./retrieval/chromaStore.js";
import { search } from "./retrieval/search.js";
import { generateAnswer } from "./generation/answer.js";

async function main() {
  const question = "Why is RAG important?";
  const sectionFilter = "importance"; // 👈 metadata filter

  // 1️⃣ Load + chunk
  const text = loadText("sample.txt");
  const chunks = await chunkText(text);
  const chunkTexts = chunks.map(c => c.pageContent);

  // 2️⃣ Embed chunks
  const chunkEmbeddings = await embedTexts(chunkTexts);

  // 3️⃣ Store vectors
  const collection = await storeVectors(chunkTexts, chunkEmbeddings);

  // 4️⃣ Embed query
  const [queryEmbedding] = await embedTexts([question]);

  // 5️⃣ Retrieve relevant chunks
  const retrievedChunks = await search(
    collection,
    queryEmbedding,
    sectionFilter
  );

  console.log("\nRetrieved Chunks:\n");
  retrievedChunks.forEach((c, i) => {
    console.log(`--- Chunk ${i + 1} ---`);
    console.log(c);
  });

  // 6️⃣ Generate grounded answer
  const answer = await generateAnswer(question, retrievedChunks);

  console.log("\nFinal Answer:\n");
  console.log(answer);
}

main();
