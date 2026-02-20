import { ChromaClient } from "chromadb";

const client = new ChromaClient({
  host: "localhost",
  port: 8000,
  ssl: false,
});

export async function storeVectors(docs, embeddings) {
  // DEV ONLY: clean slate
  try {
    await client.deleteCollection({ name: "rag-day4-final" });
  } catch {}

  const collection = await client.getOrCreateCollection({
    name: "rag-day4-final",
  });

  await collection.add({
    ids: docs.map((_, i) => `chunk-${i}`),
    documents: docs.map(d => d.pageContent),
    metadatas: docs.map(d => d.metadata),
    embeddings,
  });

  return collection;
}