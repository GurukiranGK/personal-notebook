import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({}); // reads GOOGLE_API_KEY automatically

export async function embedTexts(texts) {
  const response = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: texts,
  });

  return response.embeddings.map(e => e.values);
}
