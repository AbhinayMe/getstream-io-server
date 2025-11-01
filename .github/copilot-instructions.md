# GetStream.io Server

This is a comprehensive Node.js Express server project that provides a complete backend API for GetStream.io video calls, including token generation, user management, call management, and webhook handling.

## Project Type
- Language: TypeScript 5.2.2
- Framework: Express.js 4.18.2
- SDK: @stream-io/node-sdk@0.7.17
- Package Manager: Yarn (required)
- Architecture: MVC (Model-View-Controller)

## Project Structure
```
getstream-io-server/
├── src/
│   ├── config/          # Stream client configuration
│   ├── controllers/     # Business logic (token, user, call, webhook)
│   ├── middleware/      # Request validation, error handling, webhook verification
│   ├── routes/          # API endpoint definitions
│   ├── types/           # TypeScript type definitions
│   └── index.ts         # Main application entry
├── dist/                # Compiled JavaScript output
├── docs/                # Static Markdown documentation
├── GetStream-IO-Server.postman_collection.json
├── GetStream-IO-Server.postman_environment.json
├── package.json
├── tsconfig.json
└── .env                 # Environment configuration
```

## Development Guidelines
- Use TypeScript for all source files
- Follow Express.js best practices
- Store sensitive credentials in .env file (never commit .env)
- Use async/await for asynchronous operations
- Always use Yarn as package manager (not npm)
- Follow MVC architecture pattern
- Implement request validation using express-validator
- Handle errors through centralized error middleware
- Use environment variables for all configuration

## API Endpoints

### Token Management
- `POST /api/tokens/user` - Generate user authentication token
- `POST /api/tokens/call` - Generate call-specific token with role

### User Management
- `GET /api/users` - List users with pagination
- `POST /api/users` - Create or update user
- `GET /api/users/:userId` - Get user details
- `PUT /api/users/:userId` - Update user profile
- `DELETE /api/users/:userId` - Delete user

### Call Management
- `GET /api/calls` - List all calls
- `POST /api/calls` - Create new call (requires createdBy)
- `GET /api/calls/:type/:id` - Get call details
- `PUT /api/calls/:type/:id` - Update call settings
- `POST /api/calls/:type/:id/end` - End active call

### Webhooks
- `POST /api/webhooks` - Process GetStream.io webhook events

## Important Notes
- Call creation requires `createdBy` field (user ID who creates the call)
- Token validity defaults to 3600 seconds (1 hour)
- Call tokens support roles: admin, moderator, member
- Webhook signature verification is implemented
- Use `client.generateUserToken()` and `client.generateCallToken()` (not deprecated methods)
- User operations use `client.upsertUsers([userData])` (array format)
- Call operations use `call.end()` (not deprecated endCall())

## Testing
- Postman collection: `GetStream-IO-Server.postman_collection.json` (37 API requests organized in 5 folders)
- Postman environment: `GetStream-IO-Server.postman_environment.json` (pre-configured variables)
- Import both files into Postman for complete API testing
- Documentation: `/docs` folder contains static Markdown files
- Run `yarn dev` to start development server
- Run `yarn build` to compile TypeScript
- Run `yarn start` to run production build

## Environment Variables
Required in `.env` file:
```env
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
PORT=3000
WEBHOOK_SECRET=your_webhook_secret
```
