import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from "./constant";

const genAi = new GoogleGenerativeAI(GEMINI_API_KEY);
const aiModel = genAi.getGenerativeModel({
  model: "gemini-2.5-flash-lite",
});

export async function chatWithAi(promp: string) {
  const res = await aiModel.generateContent(promp);

  return res.response.text();
}
