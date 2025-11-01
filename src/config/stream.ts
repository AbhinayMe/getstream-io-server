import { StreamClient } from '@stream-io/node-sdk';
import dotenv from 'dotenv';

dotenv.config();

// Configuration
export const config = {
  stream: {
    apiKey: process.env.STREAM_API_KEY || '',
    apiSecret: process.env.STREAM_API_SECRET || '',
  },
  server: {
    port: parseInt(process.env.PORT || '3000', 10),
  },
  webhook: {
    secret: process.env.WEBHOOK_SECRET || '',
  },
};

// Validate configuration
export function validateConfig(): void {
  if (!config.stream.apiKey || !config.stream.apiSecret) {
    throw new Error(
      'STREAM_API_KEY and STREAM_API_SECRET must be set in .env file'
    );
  }
}

// Initialize Stream client
let streamClient: StreamClient | null = null;

export function getStreamClient(): StreamClient {
  if (!streamClient) {
    validateConfig();
    streamClient = new StreamClient(
      config.stream.apiKey,
      config.stream.apiSecret
    );
  }
  return streamClient;
}

export default {
  config,
  validateConfig,
  getStreamClient,
};
