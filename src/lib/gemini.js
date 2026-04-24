import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const getGeminiResponse = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "You are VoteSaathi, a neutral, helpful, and friendly election assistant for India. Your goal is to help citizens with voting info, candidate details, and polling booths. Always stay neutral and informative." }],
        },
        {
          role: "model",
          parts: [{ text: "Understood. I am VoteSaathi, your dedicated election assistant. How can I help you today?" }],
        },
      ],
    });

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting right now, but generally, you can find voting info on the official ECI portal.";
  }
};
