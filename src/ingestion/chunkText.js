import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export async function chunkText(text) {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 400,
    chunkOverlap: 50,
  });

  const docs = await splitter.createDocuments([text]);

  return docs.map((doc) => {
    let section = "general";

    if (doc.pageContent.includes("Why RAG is Important")) {
      section = "importance";
    } else if (doc.pageContent.includes("Introduction to Retrieval-Augmented Generation")) {
      section = "introduction";
    } else if (doc.pageContent.includes("Core Components")) {
      section = "components";
    }

    return {
      pageContent: doc.pageContent,
      metadata: {
        section,
        source: "rag_doc",
      },
    };
  });
}
