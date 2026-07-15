import { GoogleGenAI } from '@google/genai';
import { config } from '../../../config/environment.js';

export class GeminiClient {
  private ai: GoogleGenAI | null = null;

  constructor() {
    if (config.geminiApiKey) {
      this.ai = new GoogleGenAI({ apiKey: config.geminiApiKey });
    }
  }

  /**
   * Processes safe, anonymized text inside prompt models and forces a rigid JSON structure output.
   */
  public async queryModelForIntent(prompt: string): Promise<any> {
    if (!this.ai) {
      throw new Error('Gemini SDK is uninitialized: GEMINI_API_KEY missing.');
    }

    const systemInstruction = `You are an EMR Analytics Prompt Parser. Your job is to translate a clinician's natural language question into a structured JSON configuration representing their clinical intent.
You are strictly forbidden from writing or suggesting SQL code. Only output JSON matching this typescript interface:
interface ParsedClinicalIntent {
  queryType: 'VISITS' | 'DIAGNOSES' | 'MEDICATIONS' | 'VACCINATIONS' | 'TRENDS' | 'GENERIC_SUMMARY';
  primaryEntity: 'encounter' | 'diagnosis' | 'medication' | 'vaccination' | 'patient';
  aggregations: Array<{ field: string; type: 'COUNT' | 'AVERAGE' | 'TREND' }>;
  filters: { days?: number; department?: string; providerId?: string };
  chartPreference: 'LINE' | 'BAR' | 'DONUT' | 'AREA';
}`;

    const response = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        temperature: 0.1 // Low temperature ensures rigid, precise mappings
      }
    });

    const contentText = response.text;
    if (!contentText) {
      throw new Error('Empty payload returned from prompt parser model.');
    }

    return JSON.parse(contentText);
  }

  /**
   * Generates a descriptive medical aggregate summary without receiving PHI identifiers.
   */
  public async generateSummaryMarkdown(statsSummaryText: string): Promise<string> {
    if (!this.ai) {
      throw new Error('Gemini SDK is uninitialized: GEMINI_API_KEY missing.');
    }

    const systemInstruction = `You are a clinical chief of medical analytics. You will receive raw anonymized statistical counts/summaries of EMR data. Summarize them in a professional, brief paragraph for hospital clinical directors. Focus strictly on key trends, spikes, or clinical anomalies. Do not include or make up patient names or individual identifiers. Use markdown styling.`;

    const response = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: statsSummaryText,
      config: {
        systemInstruction,
        temperature: 0.3
      }
    });

    return response.text || 'Unavailable';
  }
}
