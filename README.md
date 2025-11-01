# GetStream.io Server

A comprehensive Node.js Express server providing a complete backend API for GetStream.io video calls, including token generation, user management, call management, and webhook handling.

**TypeScript** • **Express.js** • **MVC Architecture** • **@stream-io/node-sdk v0.7.17**

## Quick Start

```bash
# Install dependencies
yarn install

# Setup environment (copy and update with your credentials)
cp .env.example .env

# Run development server
yarn dev
```

Visit `http://localhost:3000/health` to verify the server is running.

## Documentation

Complete guides, API reference, and examples are in the [`/docs`](./docs/) folder:

- 📖 **[Documentation Index](./docs/index.md)** - Start here
- ⚡ **[Quick Start Guide](./docs/quick-start.md)** - Setup in 5 minutes
- 🔧 **[API Reference](./docs/api/index.md)** - All endpoints with examples
- 📋 **[Configuration Guide](./docs/configuration.md)** - Environment setup
- 🚀 **[Deployment Guide](./docs/deployment.md)** - Production deployment
- ❓ **[FAQ](./docs/faq.md)** - Common questions
- 🧪 **[Testing Guide](./docs/development/testing.md)** - Postman & cURL examples

## Available Scripts

```bash
yarn dev      # Development mode with hot reload
yarn build    # Compile TypeScript to JavaScript
yarn start    # Run production build
yarn watch    # Watch mode for TypeScript
```

## Testing

Import the included Postman collection and environment:

- `GetStream-IO-Server.postman_collection.json` (37 pre-configured requests)
- `GetStream-IO-Server.postman_environment.json` (environment variables)

Or use cURL:

```bash
curl -X POST http://localhost:3000/api/tokens/user \
  -H "Content-Type: application/json" \
  -d '{"userId": "test-user"}'
```

## Requirements

- Node.js 18+
- Yarn package manager
- GetStream.io account ([Sign up](https://getstream.io/))

## Folder Structure

## Project Layout

```plaintext
getstream-io-server/
├── src/                    # Source code
│   ├── config/            # Stream SDK configuration
│   ├── controllers/       # Business logic (token, user, call, webhook)
│   ├── middleware/        # Validation, error handling, webhook verification
│   ├── routes/            # API endpoint definitions
│   ├── types/             # TypeScript definitions
│   └── index.ts           # Application entry
├── docs/                   # Documentation
│   ├── api/               # API reference
│   ├── development/       # Development guides
│   └── *.md               # Guides and documentation
├── dist/                   # Compiled JavaScript (generated)
├── GetStream-IO-Server.postman_collection.json
├── GetStream-IO-Server.postman_environment.json
├── package.json
├── tsconfig.json
└── README.md
```

## Tech Stack

- **Language**: TypeScript 5.2.2
- **Framework**: Express.js 4.18.2
- **SDK**: @stream-io/node-sdk 0.7.17
- **Validation**: express-validator
- **Other**: CORS, dotenv

## Environment Variables

```env
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
PORT=3000
WEBHOOK_SECRET=your_webhook_secret  # For webhook signature verification
```

## Architecture

Clean **MVC** pattern with separation of concerns:

- **Controllers**: Request handling and business logic
- **Routes**: Endpoint definitions with validation
- **Middleware**: Cross-cutting concerns (validation, errors, auth)
- **Config**: Centralized SDK initialization

## Security

- Never commit `.env` with real credentials
- Store secrets in environment variables only
- Webhook signatures are verified automatically
- CORS is enabled for cross-origin requests
- Request validation on all endpoints

## License

ISC

## Support

- 📚 [GetStream.io Documentation](https://getstream.io/video/docs/)
- 💬 [GetStream Community](https://discord.gg/getstream)
- 📝 [Project Issues](https://github.com/AbhinayMe/getstream-io-server/issues)
