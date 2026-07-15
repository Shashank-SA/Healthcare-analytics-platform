import { Request, Response, NextFunction } from 'express';
import { PromptParserService } from '../../services/analytics/prompt-parser/index.js';
import { PrivacyService } from '../../services/analytics/privacy/index.js';
import { QueryBuilderService } from '../../services/analytics/query-builder/index.js';
import { SummaryService } from '../../services/analytics/summary-service/index.js';

export class PromptController {
  private privacyService: PrivacyService;
  private promptParserService: PromptParserService;
  private queryBuilderService: QueryBuilderService;
  private summaryService: SummaryService;

  constructor() {
    this.privacyService = new PrivacyService();
    this.promptParserService = new PromptParserService();
    this.queryBuilderService = new QueryBuilderService();
    this.summaryService = new SummaryService();
  }

  /**
   * Orchestrates the Natural Language Clinical Prompt Evaluation pipeline.
   * Leverages 4 distinct analytical service modules to calculate results securely.
   */
  public async evaluatePrompt(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { prompt, dateRange, hospitalId } = req.body;

      if (!prompt || typeof prompt !== 'string') {
        res.status(400).json({ error: 'Valid natural language prompt string is required.' });
        return;
      }

      console.log(`[Prompt Pipeline] Starting evaluation: "${prompt.substring(0, 40)}..."`);

      // 1. Privacy Module redacts patient identifiers/PHI before sending outwards
      const sanitizedPrompt = await this.privacyService.sanitizeInputPrompt(prompt);

      // 2. Prompt Parser Service maps natural language clinical intent using Gemini
      const parsedIntent = await this.promptParserService.parseClinicalIntent(sanitizedPrompt);

      // 3. Query Builder builds a safe database operation from the parsed intent JSON (No AI SQL execution!)
      const calculatedData = await this.queryBuilderService.executeIntentQuery(parsedIntent, {
        dateRange,
        hospitalId
      });

      // 4. Summary Service compiles anonymized statistics into a secure outline for clinical explanations
      const aiSummary = await this.summaryService.generateClinicalSummary(parsedIntent, calculatedData);

      // 5. Send fully structured payload to EMR
      res.json({
        success: true,
        originalPrompt: prompt,
        sanitizedPrompt,
        intent: {
          queryType: parsedIntent.queryType,
          primaryEntity: parsedIntent.primaryEntity,
          aggregations: parsedIntent.aggregations
        },
        payload: {
          kpis: calculatedData.kpis,
          chartData: calculatedData.chartData,
          cohortList: calculatedData.cohortList,
          aiSummary: aiSummary
        }
      });
    } catch (error) {
      next(error);
    }
  }
}
