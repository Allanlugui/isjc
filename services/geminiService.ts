import { GoogleGenAI, Type } from "@google/genai";
import { Devotional } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateDevotionalByTopic = async (topic: string): Promise<Devotional | null> => {
  if (!apiKey) {
    console.error("API Key missing");
    return null;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Gere um devocional cristão curto e inspirador sobre o tema: "${topic}". 
      O público alvo são membros de uma igreja moderna.
      Mantenha a reflexão em torno de 150-200 palavras. Use a versão NVI da bíblia para o versículo.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "Um título cativante para o devocional" },
            verse: { type: Type.STRING, description: "O texto do versículo bíblico chave" },
            verseReference: { type: Type.STRING, description: "A referência do versículo (ex: João 3:16)" },
            reflection: { type: Type.STRING, description: "O texto da reflexão devocional" },
            prayer: { type: Type.STRING, description: "Uma oração curta finalizando o devocional" },
          },
          required: ["title", "verse", "verseReference", "reflection", "prayer"],
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as Devotional;
    }
    return null;
  } catch (error) {
    console.error("Error generating devotional:", error);
    return null;
  }
};

export const generateComfortingPrayer = async (situation: string): Promise<string> => {
   if (!apiKey) {
    console.error("API Key missing");
    return "Não foi possível gerar a oração no momento.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Escreva uma oração curta, reconfortante e cheia de fé para alguém que está passando por: "${situation}".
      Use uma linguagem acolhedora e pastoral.`,
    });
    return response.text || "Erro ao gerar oração.";
  } catch (error) {
    console.error("Error generating prayer:", error);
    return "Erro ao gerar oração. Por favor, tente novamente.";
  }
}