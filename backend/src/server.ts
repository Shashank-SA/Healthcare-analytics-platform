import { app } from './app.js';
import { config, validateEnvironment } from './config/environment.js';

const PORT = config.port;

function startServer() {
  validateEnvironment();
  
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Enterprise Server] Online & listening at http://0.0.0.0:${PORT}`);
    console.log(`[Enterprise Server] Environment Mode: ${config.environment}`);
  });

  // Handle system signals for safe, graceful shutdown (releasing pool connections)
  const shutdown = () => {
    console.log('[Enterprise Server] Shutting down, resolving pending clinical queries...');
    server.close(() => {
      console.log('[Enterprise Server] Server offline. Database pools released.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

startServer();
