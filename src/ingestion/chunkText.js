import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export async function chunkText(text) {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 800,
    chunkOverlap: 150,
  });

  return await splitter.createDocuments([text]);
}
