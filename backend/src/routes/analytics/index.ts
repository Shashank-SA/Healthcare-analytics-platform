import { Router } from 'express';
import { PromptController } from '../../controllers/analytics/promptController.js';

const router = Router();

// Instantiate Controller cleanly (Dependency Injection pattern)
const promptController = new PromptController();

// Define clean routing endpoints
router.post('/query', (req, res, next) => promptController.evaluatePrompt(req, res, next));

export { router as analyticsRouter };
