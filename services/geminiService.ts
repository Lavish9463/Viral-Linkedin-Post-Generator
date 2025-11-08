
import { GoogleGenAI } from '@google/genai';
import { ViralStyle } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getSystemInstruction = (style: ViralStyle): string => {
  const baseInstruction = `You are an expert LinkedIn content creator specializing in writing viral posts. Your goal is to generate a post that is human-like, insightful, shareable, and optimized for engagement.

The post MUST follow this structure:
1.  **Powerful Hook:** Start with a very short, attention-grabbing first line (max 10-15 words) to stop the scroll.
2.  **Insightful Body:** Expand on the hook with 3-5 short paragraphs. Use simple language, storytelling, and provide clear value or a unique perspective. Use ample white space between paragraphs.
3.  **Strong Call-to-Action (CTA):** End with a question or prompt to encourage comments and discussion.
4.  **Relevant Hashtags:** Include 3-5 relevant, niche hashtags at the very end.

The final output should be ONLY the post content itself, without any preamble or explanation.`;

  switch (style) {
    case ViralStyle.Educational:
      return `${baseInstruction}\n\n**Tone:** Adopt an educational, helpful, and authoritative tone. Break down a complex topic into simple, actionable steps or insights. Provide tangible value to the reader.`;
    case ViralStyle.BoldContrarian:
      return `${baseInstruction}\n\n**Tone:** Adopt a bold, contrarian, and confident tone. Challenge a commonly held belief in the industry. State your unpopular opinion clearly and back it up with a brief, logical argument.`;
    case ViralStyle.RelatableStory:
      return `${baseInstruction}\n\n**Tone:** Adopt a personal, vulnerable, and relatable tone. Tell a story about a personal failure, lesson, or journey. Connect with the reader on an emotional level.`;
    case ViralStyle.Inspirational:
      return `${baseInstruction}\n\n**Tone:** Adopt an inspirational and motivational tone. Share a success story (yours or someone else's) and distill the key lessons learned. Aim to uplift and empower the reader.`;
    case ViralStyle.DataDriven:
      return `${baseInstruction}\n\n**Tone:** Adopt an analytical and credible tone. Use a surprising statistic or data point in the hook and build the post around it. Explain the "so what" of the data.`;
    case ViralStyle.QuestionBased:
        return `${baseInstruction}\n\n**Tone:** Adopt a curious and engaging tone. The hook itself should be a thought-provoking question. The body should briefly explore the context of the question before turning it back to the audience in the CTA.`;
    default:
      return baseInstruction;
  }
};


export const generateLinkedInPost = async (topic: string, style: ViralStyle): Promise<string> => {
  try {
    const systemInstruction = getSystemInstruction(style);
    const prompt = `Generate a LinkedIn post about the following topic: "${topic}"`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{text: prompt}] }],
      config: {
        systemInstruction,
        temperature: 0.7,
        topP: 1,
        topK: 1,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("The AI returned an empty response.");
    }
    return text.trim();
  } catch (error) {
    console.error('Error generating content from Gemini API:', error);
    throw new Error('Failed to generate post. The AI may be experiencing issues or the content could not be processed.');
  }
};
