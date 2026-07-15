import dotenv from 'dotenv';
import path from 'path';

// Load variables
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  environment: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/emr_analytics',
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  presidioApiUrl: process.env.PRESIDIO_API_URL || 'http://localhost:5083',
  jwtSecret: process.env.JWT_SECRET || 'emr-secret-jwt-key'
};

// Verify critical environment configurations on boot
export function validateEnvironment() {
  const missingKeys: string[] = [];
  
  if (!process.env.GEMINI_API_KEY) {
    missingKeys.push('GEMINI_API_KEY');
  }
  
  if (missingKeys.length > 0) {
    console.warn(`[Enterprise Config] Warning: Missing environment keys: ${missingKeys.join(', ')}. Some AI features might fallback to simulated clinical profiles.`);
  }
}
