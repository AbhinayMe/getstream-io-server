import express, { Request, Response } from 'express';
import cors from 'cors';
import { validateConfig, config } from './config/stream';
import routes from './routes';
import { errorHandler, notFound } from './middleware/errorHandler';

// Validate configuration
validateConfig();

const app = express();
const PORT = config.server.port;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'GetStream.io Server is running',
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use('/api', routes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 GetStream.io Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`\n📚 API Endpoints:`);
  console.log(`   Tokens:`);
  console.log(`   - POST /api/tokens/user          (Generate user token)`);
  console.log(`   - POST /api/tokens/call          (Generate call token)`);
  console.log(`   Users:`);
  console.log(`   - GET /api/users                 (List users)`);
  console.log(`   - POST /api/users                (Create user)`);
  console.log(`   - GET /api/users/:userId         (Get user)`);
  console.log(`   - PUT /api/users/:userId         (Update user)`);
  console.log(`   - DELETE /api/users/:userId      (Delete user)`);
  console.log(`   Calls:`);
  console.log(`   - GET /api/calls                 (List calls)`);
  console.log(`   - POST /api/calls                (Create call)`);
  console.log(`   - GET /api/calls/:type/:id       (Get call)`);
  console.log(`   - PUT /api/calls/:type/:id       (Update call)`);
  console.log(`   - POST /api/calls/:type/:id/end  (End call)`);
  console.log(`   Webhooks:`);
  console.log(`   - POST /api/webhooks             (Process events)`);
});

export default app;
