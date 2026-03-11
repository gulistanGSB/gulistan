import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

async function generate() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          text: 'Crispy, buttery biscuits baked with fresh coconut flakes.',
        },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1",
      }
    }
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      const base64EncodeString = part.inlineData.data;
      const buffer = Buffer.from(base64EncodeString, 'base64');
      fs.writeFileSync(path.join(process.cwd(), 'public', 'coconut-biscuit.jpg'), buffer);
      console.log('Image saved successfully!');
      return;
    }
  }
}

generate().catch(console.error);
