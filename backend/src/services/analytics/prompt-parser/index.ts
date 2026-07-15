import { GeminiClient } from './gemini/client.js';

export interface ParsedClinicalIntent {
  queryType: 'VISITS' | 'DIAGNOSES' | 'MEDICATIONS' | 'VACCINATIONS' | 'TRENDS' | 'GENERIC_SUMMARY';
  primaryEntity: string;
  aggregations: Array<{ field: string; type: 'COUNT' | 'AVERAGE' | 'TREND' }>;
  filters: Record<string, any>;
  chartPreference: 'LINE' | 'BAR' | 'DONUT' | 'AREA';
}

export class PromptParserService {
  private geminiClient: GeminiClient;

  constructor() {
    this.geminiClient = new GeminiClient();
  }

  /**
   * Concurrently processes and structure-maps clinical questions using Google Gemini models.
   */
  public async parseClinicalIntent(prompt: string): Promise<ParsedClinicalIntent> {
    try {
      // Send the sanitized query structure to Gemini parser
      const structuredResult = await this.geminiClient.queryModelForIntent(prompt);
      return structuredResult;
    } catch (error) {
      console.warn('[Prompt Parser] Gemini connection unavailable. Invoking local offline fallback dictionary.');
      return this.localFallbackParser(prompt);
    }
  }

  /**
   * Safe clinical-dictionary mapping designed for emergency offline execution or failover.
   */
  private localFallbackParser(prompt: string): ParsedClinicalIntent {
    const lowercase = prompt.toLowerCase();
    
    if (lowercase.includes('visit') || lowercase.includes('active doctor')) {
      return {
        queryType: 'VISITS',
        primaryEntity: 'encounter',
        aggregations: [{ field: 'id', type: 'COUNT' }],
        filters: { days: 1 },
        chartPreference: 'BAR'
      };
    }
    
    if (lowercase.includes('diagnos')) {
      return {
        queryType: 'DIAGNOSES',
        primaryEntity: 'diagnosis',
        aggregations: [{ field: 'id', type: 'COUNT' }],
        filters: { days: 30 },
        chartPreference: 'DONUT'
      };
    }

    if (lowercase.includes('medicat') || lowercase.includes('drug')) {
      return {
        queryType: 'MEDICATIONS',
        primaryEntity: 'medication',
        aggregations: [{ field: 'prescriptions', type: 'TREND' }],
        filters: { days: 90 },
        chartPreference: 'LINE'
      };
    }

    // Default to dynamic trends report structure
    return {
      queryType: 'TRENDS',
      primaryEntity: 'demographics',
      aggregations: [{ field: 'patient_cohort', type: 'COUNT' }],
      filters: { days: 30 },
      chartPreference: 'AREA'
    };
  }
}
