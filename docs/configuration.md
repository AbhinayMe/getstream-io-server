# Configuration Guide

Complete configuration reference for GetStream.io Server.

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `STREAM_API_KEY` | Your GetStream.io API key | `sk_1234567890abcdef` |
| `STREAM_API_SECRET` | Your GetStream.io API secret | `secret_abcdef1234567890` |

### Optional Variables

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `PORT` | Server port | `3000` | `8080` |
| `WEBHOOK_SECRET` | Secret for webhook signature verification | `undefined` | `whsec_abcdef123456` |
| `NODE_ENV` | Environment mode | `development` | `production` |

## Getting Your API Credentials

1. **Sign up/Login** to [GetStream.io](https://getstream.io/)
2. **Navigate** to your dashboard
3. **Create** a new application or select existing one
4. **Copy** the API Key and Secret from the credentials section
5. **Paste** them into your `.env` file

## Configuration Files

### .env File

Create a `.env` file in the project root:

```env
# GetStream.io Credentials (Required)
STREAM_API_KEY=your_api_key_here
STREAM_API_SECRET=your_api_secret_here

# Server Configuration (Optional)
PORT=3000

# Webhook Security (Optional)
WEBHOOK_SECRET=your_webhook_secret_here
```

### Environment-Specific Configurations

#### Development
```env
NODE_ENV=development
PORT=3000
```

#### Production
```env
NODE_ENV=production
PORT=8080
```

#### Testing
```env
NODE_ENV=test
PORT=3001
```

## Security Configuration

### Webhook Verification

Enable webhook signature verification:

```env
WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

Get your webhook secret from GetStream.io dashboard under Webhooks settings.

### API Key Security

- **Never commit** `.env` files to version control
- **Use environment variables** in production deployments
- **Rotate credentials** regularly
- **Restrict API key permissions** to necessary operations only

## Performance Tuning

### Connection Pooling

The server automatically handles connection pooling for GetStream.io API calls.

### Rate Limiting

Currently no rate limiting is implemented. For production use, consider adding:

```javascript
// Example middleware (not included)
const rateLimit = require('express-rate-limit');
app.use('/api/', rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}));
```

### Caching

Consider implementing caching for frequently accessed data:

- User information
- Call metadata
- Token validation results

## Monitoring & Logging

### Health Checks

The server provides a health endpoint at `/health`:

```bash
curl http://localhost:3000/health
```

### Logging

Currently uses console logging. For production, consider:

- Winston or Bunyan for structured logging
- Log aggregation services (Datadog, LogRocket)
- Error tracking (Sentry, Rollbar)

## Troubleshooting

### Common Configuration Issues

#### "Invalid API Key"
- Verify your API key in GetStream.io dashboard
- Check for typos in `.env` file
- Ensure the key is for the correct environment (development/production)

#### "Webhook signature verification failed"
- Verify `WEBHOOK_SECRET` matches GetStream.io dashboard
- Check webhook payload format
- Ensure webhook URL is accessible

#### "Port already in use"
- Change `PORT` in `.env` file
- Kill existing process: `lsof -ti:3000 | xargs kill -9`

### Environment Validation

The server validates configuration on startup. Check logs for:

```
✅ Configuration loaded successfully
✅ Stream client initialized
🚀 GetStream.io Server running on port 3000
```

## Advanced Configuration

### Custom Stream Client Options

Modify `src/config/stream.ts` for advanced client configuration:

```typescript
const client = new StreamClient(apiKey, apiSecret, {
  timeout: 3000,
  baseURL: 'https://api.stream-io-api.com',
  // Additional options...
});
```

### CORS Configuration

Modify CORS settings in `src/index.ts`:

```typescript
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true
}));
```

### Request Validation

Customize validation rules in `src/middleware/validator.ts`.