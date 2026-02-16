import { ChromaClient } from "chromadb";

const client = new ChromaClient({
  host: "localhost",
  port: 8000,
  ssl: false,
});


export async function storeVectors(chunks, embeddings) {
  const collection = await client.getOrCreateCollection({
    name: "rag-day2",
  });

  await collection.add({
    ids: chunks.map((_, i) => `chunk-${i}`),
    embeddings,
    documents: chunks,
  });

  return collection;
}
