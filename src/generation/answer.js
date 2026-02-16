import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export async function generateAnswer(question, retrievedChunks) {
  const context = retrievedChunks.join("\n\n");

  const prompt = `
Answer the question ONLY using the context below.
If the answer is not present, say:
"I don't know based on the provided documents."

Context:
${context}

Question:
${question}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash", // ✅ WORKS with your key
    contents: prompt,
  });

  return response.text;
}
