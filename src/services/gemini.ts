import { GoogleGenerativeAI } from "@google/generative-ai";
import { safeApiCall } from "../utils/safeApiCall";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const generateText = async (prompt: string): Promise<string> => {
  return await safeApiCall(async () => {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    return result.response.text();
  }, "Failed to generate AI response. Please try again later.");
};
