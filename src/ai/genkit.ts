
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';
import { openai } from 'genkitx-openai';

export const ai = genkit({
  plugins: [
    googleAI(),
    // DeepSeek работает через OpenAI плагин, так как их API совместимы
    openai({
      apiKey: process.env.DEEPSEEK_API_KEY,
      baseUrl: 'https://api.deepseek.com',
    }),
  ],
  // Чтобы переключиться на DeepSeek, измените модель на 'openai/deepseek-chat'
  model: 'googleai/gemini-2.5-flash',
});
