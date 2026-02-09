import { loadText } from "./ingestion/loadText.js";
import { chunkText } from "./ingestion/chunkText.js";

async function main() {
  const text = loadText("sample.txt");
  const chunks = await chunkText(text);

  console.log("Total chunks:", chunks.length);
  console.log("First chunk:\n", chunks[0].pageContent);
}

main();
