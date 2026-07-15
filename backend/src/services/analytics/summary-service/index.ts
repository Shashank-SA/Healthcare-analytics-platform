import { GeminiClient } from '../prompt-parser/gemini/client.js';
import { ParsedClinicalIntent } from '../prompt-parser/index.js';
import { CalculatedReportData } from '../query-builder/index.js';

export class SummaryService {
  private geminiClient: GeminiClient;

  constructor() {
    this.geminiClient = new GeminiClient();
  }

  /**
   * Compiles secure statistical data arrays into brief clinician-ready summaries.
   * STRICT HIPAA GUARD: Never includes raw patient databases or PII elements.
   */
  public async generateClinicalSummary(intent: ParsedClinicalIntent, calculatedData: CalculatedReportData): Promise<string> {
    try {
      // Create a heavily anonymized, aggregated text representation of the analytical outputs
      const statsSummary = `
Clinical Report Query Type: ${intent.queryType}
Primary Entities Analyzed: ${intent.primaryEntity}
Top-Level Statistics Summary:
${calculatedData.kpis.map(kpi => `- ${kpi.label}: ${kpi.value} (Change: ${kpi.change})`).join('\n')}

Chart Distributions:
${calculatedData.chartData.map(point => `- ${point.name}: ${point.value}`).join('\n')}

Aggregate Patient Cohort size: ${calculatedData.cohortList.length} subjects.
`;

      console.log('[Summary Service] Compiling HIPAA safe aggregate outline to send to Gemini.');
      
      // Request model to generate summary of aggregated parameters
      const summaryMarkdown = await this.geminiClient.generateSummaryMarkdown(statsSummary);
      return summaryMarkdown;
    } catch (error) {
      console.warn('[Summary Service] AI summary generation unavailable. Utilizing offline medical template engine.');
      return this.generateOfflineSummary(intent, calculatedData);
    }
  }

  /**
   * Safe, offline deterministic summarization fallback.
   */
  private generateOfflineSummary(intent: ParsedClinicalIntent, calculatedData: CalculatedReportData): string {
    const primaryKpi = calculatedData.kpis[0];
    const trendKpi = calculatedData.kpis[1] || primaryKpi;
    
    return `### **Clinical Report Executive Summary (Deterministic Fallback)**
The query for **${intent.queryType}** has completed successfully. Analytical aggregation indicates that **${primaryKpi.label}** reached **${primaryKpi.value}** (reflecting a change metric of **${primaryKpi.change}**). Furthermore, **${trendKpi.label}** is logged at **${trendKpi.value}** with a delta of **${trendKpi.change}**. 

*This report was generated using the local medical calculation matrix. AI-assisted diagnostic commentary was skipped to guarantee continuous system availability.*`;
  }
}
