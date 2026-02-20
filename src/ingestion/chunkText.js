import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export async function chunkText(text) {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 100,
  });

  const docs = await splitter.createDocuments([text]);

  // Attach metadata cleanly
  return docs.map(doc => ({
    pageContent: doc.pageContent,
    metadata: {
      section: inferSection(doc.pageContent),
      source: "sample.txt",
    },
  }));
}

// Simple heuristic (can be replaced later)
function inferSection(text) {
  const lower = text.toLowerCase();

  if (lower.includes("why rag is important")) return "importance";
  if (lower.includes("core components")) return "components";
  if (lower.includes("introduction")) return "introduction";

  return "general";
}