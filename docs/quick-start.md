# Quick Start Guide

Get your GetStream.io Server up and running in under 5 minutes.

## Prerequisites

- Node.js 18+ ([Download here](https://nodejs.org/))
- Yarn package manager ([Install here](https://yarnpkg.com/))
- GetStream.io account ([Sign up here](https://getstream.io/))

## 1. Clone & Install

```bash
# Clone the repository
git clone https://github.com/yourusername/getstream-io-server.git
cd getstream-io-server

# Install dependencies
yarn install
```

## 2. Environment Setup

Create a `.env` file in the root directory:

```env
# Get these from your GetStream.io dashboard
STREAM_API_KEY=your_api_key_here
STREAM_API_SECRET=your_api_secret_here

# Optional: Customize port (default: 3000)
PORT=3000

# Optional: Webhook secret for signature verification
WEBHOOK_SECRET=your_webhook_secret_here
```

## 3. Start the Server

```bash
# Development mode (with hot reload)
yarn dev

# Production mode
yarn build && yarn start
```

## 4. Verify Installation

Visit `http://localhost:3000/health` to verify the server is running:

```json
{
  "status": "ok",
  "message": "GetStream.io Server is running",
  "timestamp": "2025-11-01T10:00:00.000Z"
}
```

## 5. Test with Postman

1. Import the Postman collection: `GetStream-IO-Server.postman_collection.json`
2. Import the environment: `GetStream-IO-Server.postman_environment.json`
3. Start testing the API endpoints!

Alternatively, test via cURL (see below).

## 6. First API Call

Try generating a user token:

```bash
curl -X POST http://localhost:3000/api/tokens/user \
  -H "Content-Type: application/json" \
  -d '{"userId": "test-user", "validityInSeconds": 3600}'
```

## Next Steps

- [Read the API documentation](./api/index.md)
- [Learn about configuration](./configuration.md)
- [View testing guide](./development/testing.md)
- [Deploy to production](./deployment.md)

## Need Help?

- Check the [FAQ](./faq.md)
- Open an issue on [GitHub](https://github.com/yourusername/getstream-io-server/issues)
- Join our [Discord community](https://discord.gg/getstream)