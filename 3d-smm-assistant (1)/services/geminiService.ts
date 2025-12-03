import { GoogleGenAI, Type } from "@google/genai";
import { TrendItem, CopyVariant, CompetitorData, DailyBrief } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_FLASH = "gemini-2.5-flash";
const MODEL_PRO = "gemini-2.5-flash"; // Using Flash for speed/cost, ideally Pro for reasoning

export const GemService = {
  /**
   * Module 4: Trend Scanner using Google Search Grounding
   */
  async fetchTrends(): Promise<TrendItem[]> {
    try {
      const response = await ai.models.generateContent({
        model: MODEL_PRO,
        contents: "Find 5 currently trending topics related to 3D Art, CGI, Motion Design, or general Tech/AI trends relevant to digital artists. For each trend, explain how a 3D artist can adapt it, and write a short social media post draft.",
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                topic: { type: Type.STRING },
                relevance: { type: Type.STRING },
                adaptation: { type: Type.STRING },
                postDraft: { type: Type.STRING },
              },
              required: ["topic", "relevance", "adaptation", "postDraft"],
            },
          },
        },
      });

      const text = response.text;
      if (!text) return [];
      
      const trends = JSON.parse(text) as TrendItem[];
      
      // Attempt to attach grounding metadata if available (for URLs)
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks) {
        trends.forEach((t, i) => {
           // Simple heuristic to attach a link if available in corresponding chunks
           if (chunks[i]?.web?.uri) {
             t.sourceUrl = chunks[i].web?.uri;
           }
        });
      }
      
      return trends;
    } catch (error) {
      console.error("Error fetching trends:", error);
      // Fallback mock data if API fails or Search tool is restricted
      return [
        {
          topic: "AI Texture Generation",
          relevance: "High interest in AI tools for texturing",
          adaptation: "Show a comparison of hand-painted vs AI-generated textures.",
          postDraft: "Can AI really replace hand-painting? 🎨 Here is my experiment with #StableDiffusion for texturing. #3DArt #CGI",
          sourceUrl: "https://google.com"
        }
      ];
    }
  },

  /**
   * Module 13: Copywriter
   */
  async rewriteText(input: string): Promise<CopyVariant[]> {
    try {
      const response = await ai.models.generateContent({
        model: MODEL_FLASH,
        contents: `Act as an expert SMM copywriter for 3D artists. Rewrite the following text into 5 versions: 
        1. Short (punchy, for captions)
        2. Long (storytelling, educational)
        3. Emotional (engaging, personal)
        4. Twitter/X (280 chars, hashtags)
        5. LinkedIn (Professional, business-focused)
        
        Input Text: "${input}"`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                type: { type: Type.STRING, enum: ["Short", "Long", "Emotional", "Twitter", "LinkedIn"] },
                content: { type: Type.STRING },
              },
              required: ["type", "content"],
            },
          },
        },
      });

      return JSON.parse(response.text || "[]");
    } catch (error) {
      console.error("Error rewriting text:", error);
      return [];
    }
  },

  /**
   * Module 15: Competitor Analysis (Synthetic Simulation)
   * Note: Real-time social media scraping is restricted in browsers. 
   * We use Gemini to generate an analysis based on its internal knowledge or general patterns.
   */
  async analyzeCompetitor(username: string): Promise<CompetitorData | null> {
    try {
      const response = await ai.models.generateContent({
        model: MODEL_FLASH,
        contents: `Analyze the typical content strategy for a 3D artist similar to or named "${username}". 
        If specific data is unknown, generate a realistic synthetic analysis based on successful 3D artists in that niche (e.g., Blender Guru, pwnisher).
        Provide a summary, posting frequency, best format, simulated engagement data for a chart, and strategic insights.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              summary: { type: Type.STRING },
              postingFrequency: { type: Type.STRING },
              bestFormat: { type: Type.STRING },
              engagementData: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING, description: "Post type or Date" },
                    likes: { type: Type.NUMBER },
                    comments: { type: Type.NUMBER },
                  }
                }
              },
              insights: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
             required: ["name", "summary", "postingFrequency", "bestFormat", "engagementData", "insights"]
          },
        },
      });

      return JSON.parse(response.text || "{}");
    } catch (error) {
      console.error("Error analyzing competitor:", error);
      return null;
    }
  },

  /**
   * Module 16: Daily Notification/Briefing
   */
  async getDailyBriefing(): Promise<DailyBrief> {
     try {
      const response = await ai.models.generateContent({
        model: MODEL_FLASH,
        contents: "Generate a daily briefing for a 3D artist. Include: 1 creative idea for a render, 1 technical tip (Blender/Maya/C4D), and the best time to post today.",
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              idea: { type: Type.STRING },
              tip: { type: Type.STRING },
              bestTime: { type: Type.STRING },
            },
            required: ["idea", "tip", "bestTime"]
          },
        },
      });
      return JSON.parse(response.text || "{}");
    } catch (error) {
      return {
        idea: "Create a low-poly version of a household item.",
        tip: "Use HDRI maps for realistic lighting quickly.",
        bestTime: "18:00 - 20:00 Local Time"
      };
    }
  }
};