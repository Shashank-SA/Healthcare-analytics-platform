import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/environment.js';
import { analyticsRouter } from './routes/analytics/index.js';

const app = express();

// Standard Enterprise Security Hardening Middlewares
app.use(helmet());
app.use(cors({
  origin: true, // Allow EMR ingress frames
  credentials: true
}));
app.use(express.json());

// Custom Audit-Log Middleware (HIPAA requirement)
app.use((req: Request, res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString();
  console.log(`[HIPAA AUDIT] ${timestamp} | IP: ${req.ip} | ${req.method} ${req.url}`);
  next();
});

// Mount Analytics routes
app.use('/api/analytics', analyticsRouter);

// Health Check Endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Healthcare Analytics Module'
  });
});

// Centralized Error-Handling boundary (prevents internal server trace leaks)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('[SYSTEM EXCEPTION]', err);
  res.status(500).json({
    error: 'Internal Clinical Service Exception',
    requestId: Math.random().toString(36).substring(2, 9),
    message: 'A secure error log was recorded. Please contact your EMR system administrator.'
  });
});

export { app };
