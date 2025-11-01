# GetStream.io Server

A comprehensive Node.js Express server that provides a complete backend API for GetStream.io video calls, including token generation, user management, call management, and webhook handling.

## Features

- 🔐 **Token Generation** - Create JWT tokens for user authentication
- 👥 **User Management** - Create, update, retrieve, and delete users
- 📞 **Call Management** - Create calls, update settings, and end calls
- 🔔 **Webhook Handling** - Process GetStream.io webhook events
- 🚀 **Built with TypeScript** - Type-safe development
- 📦 **Uses @stream-io/node-sdk v0.7.17**
- 🔑 **Environment-based configuration**
- 🌐 **CORS enabled** for cross-origin requests
- ✅ **Request validation** with express-validator
- 🏗️ **MVC Architecture** - Clean, organized project structure

## Prerequisites

- Node.js (v18 or higher)
- Yarn package manager
- GetStream.io account with API credentials

## Installation

1. Clone the repository (if applicable) or navigate to the project directory:

```bash
cd getstream-io-server
```

2. Install dependencies:

```bash
yarn install
```

3. Create a `.env` file by copying the example:

```bash
cp .env.example .env
```

4. Update the `.env` file with your GetStream.io credentials:

```
STREAM_API_KEY=your_actual_api_key
STREAM_API_SECRET=your_actual_api_secret
PORT=3000
```

## Usage

### Development Mode

Run the server in development mode with hot reload:

```bash
yarn dev
```

### Production Mode

1. Build the TypeScript code:

```bash
yarn build
```

2. Start the server:

```bash
yarn start
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

## Documentation

Complete API documentation is available in the `/docs` folder. Start here:

- 📖 [Full Documentation](./docs/index.md) - API reference, guides, and FAQs
- ⚡ [Quick Start](./docs/quick-start.md) - Get running in 5 minutes
- 🔧 [Configuration Guide](./docs/configuration.md) - Environment setup
- 🚀 [Deployment Guide](./docs/deployment.md) - Production deployment
- ❓ [FAQ](./docs/faq.md) - Common questions and troubleshooting

## Testing with Postman

This project includes a complete Postman collection and environment for testing all API endpoints.

### Import Collection and Environment

1. **Import the Collection:**
   - Open Postman
   - Click **Import** button
   - Select `GetStream-IO-Server.postman_collection.json`
   - The collection includes 37 pre-configured API requests organized in folders

2. **Import the Environment:**
   - Click **Import** button again
   - Select `GetStream-IO-Server.postman_environment.json`
   - Select the "GetStream.io Server - Local" environment from the dropdown

3. **Configure Environment Variables:**
   - Click the eye icon (👁️) next to the environment dropdown
   - Update the variables if needed:
     - `baseUrl`: Server URL (default: http://localhost:3000)
     - `userId`: Test user ID (default: user123)
     - `callId`: Test call ID (default: call-123)
     - `callType`: Call type (default: default)

4. **Start Testing:**
   - Ensure your server is running (`yarn dev`)
   - Select requests from the collection folders:
     - Health & Status
     - Token Management
     - User Management
     - Call Management
     - Webhooks

## API Endpoints

All API endpoints are prefixed with `/api`.

### Health Check

Check if the server is running:

```http
GET /health
```

**Response:**
```json
{
  "status": "ok",
  "message": "GetStream.io Server is running",
  "timestamp": "2025-11-01T10:00:00.000Z"
}
```

---

### Token Generation

#### Generate User Token

Generate an authentication token for a user.

```http
POST /api/tokens/generate-token
Content-Type: application/json
```

**Request Body:**
```json
{
  "userId": "user123",
  "callId": "optional-call-id",
  "callType": "default",
  "validityInSeconds": 3600
}
```

**Parameters:**
- `userId` (required): Unique identifier for the user
- `callId` (optional): Unique identifier for the call
- `callType` (optional): Type of call (default: "default")
- `validityInSeconds` (optional): Token validity in seconds (default: 3600 = 1 hour)

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGc...",
    "userId": "user123",
    "apiKey": "your_api_key",
    "callId": "call_1699999999",
    "callType": "default"
  }
}
```

#### Generate Call Token

Generate a token with specific call access and optional role.

```http
POST /api/tokens/generate-call-token
Content-Type: application/json
```

**Request Body:**
```json
{
  "userId": "user123",
  "callId": "my-call-123",
  "callType": "default",
  "validityInSeconds": 3600,
  "role": "admin"
}
```

**Parameters:**
- `userId` (required): Unique identifier for the user
- `callId` (required): Unique identifier for the call
- `callType` (optional): Type of call (default: "default")
- `validityInSeconds` (optional): Token validity in seconds (default: 3600)
- `role` (optional): Call role (e.g., "admin", "moderator")

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGc...",
    "userId": "user123",
    "apiKey": "your_api_key",
    "callId": "my-call-123",
    "callType": "default"
  }
}
```

---

### User Management

#### List Users

Get a paginated list of all users.

```http
GET /api/users?limit=25&offset=0
```

**Query Parameters:**
- `limit` (optional): Number of users to return (default: 25)
- `offset` (optional): Number of users to skip for pagination (default: 0)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "user123",
      "name": "John Doe",
      "image": "https://example.com/avatar.jpg",
      "created_at": "2025-11-01T10:00:00.000Z",
      "updated_at": "2025-11-01T10:00:00.000Z"
    }
  ]
}
```

#### Create User

Create a new user in the GetStream system.

```http
POST /api/users
Content-Type: application/json
```

**Request Body:**
```json
{
  "id": "user123",
  "name": "John Doe",
  "image": "https://example.com/avatar.jpg",
  "role": "admin",
  "custom": {
    "department": "Engineering"
  }
}
```

**Parameters:**
- `id` (required): Unique user identifier
- `name` (optional): User's display name
- `image` (optional): URL to user's avatar
- `role` (optional): User role
- `custom` (optional): Custom metadata object

#### Get User

Retrieve user information.

```http
GET /api/users/:userId
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user123",
    "name": "John Doe",
    "image": "https://example.com/avatar.jpg",
    "role": "admin",
    "created_at": "2025-11-01T10:00:00.000Z",
    "updated_at": "2025-11-01T10:00:00.000Z"
  }
}
```

#### Update User

Update user information.

```http
PUT /api/users/:userId
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Jane Doe",
  "image": "https://example.com/new-avatar.jpg",
  "custom": {
    "title": "Senior Engineer"
  }
}
```

#### Delete User

Remove a user from the system.

```http
DELETE /api/users/:userId
```

**Response:**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

### Call Management

#### List Calls

Get all calls.

```http
GET /api/calls
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "call-123",
      "type": "default",
      "created_at": "2025-11-01T10:00:00.000Z"
    }
  ]
}
```

#### Create Call

Create a new video call.

```http
POST /api/calls
Content-Type: application/json
```

**Request Body:**
```json
{
  "callId": "my-call-123",
  "callType": "default",
  "createdBy": "user123",
  "members": [
    {
      "user_id": "user123",
      "role": "admin"
    }
  ],
  "settings": {
    "video": {
      "camera_default_on": true,
      "enabled": true
    },
    "recording": {
      "mode": "available"
    }
  }
}
```

#### Get Call

Retrieve call details.

```http
GET /api/calls/:callType/:callId
```

**Response:**
```json
{
  "success": true,
  "data": {
    "call": {
      "id": "my-call-123",
      "type": "default",
      "created_at": "2025-11-01T10:00:00.000Z",
      "settings": {}
    },
    "members": []
  }
}
```

#### Update Call

Update call settings.

```http
PUT /api/calls/:callType/:callId
Content-Type: application/json
```

**Request Body:**
```json
{
  "settings": {
    "recording": {
      "mode": "disabled"
    }
  }
}
```

#### End Call

Terminate an active call.

```http
POST /api/calls/:callType/:callId/end
```

**Response:**
```json
{
  "success": true,
  "message": "Call ended successfully"
}
```

---

### Webhooks

#### Process Webhook Events

Receive and process GetStream.io webhook events.

```http
POST /api/webhooks
Content-Type: application/json
X-Signature: webhook_signature_here
```

**Supported Event Types:**
- `call.created` - Call was created
- `call.ended` - Call was terminated
- `call.live_started` - Call went live
- `call.member_added` - Member joined call
- `call.member_removed` - Member left call
- `call.recording_started` - Recording started
- `call.recording_stopped` - Recording stopped

**Request Body Example:**
```json
{
  "type": "call.created",
  "created_at": "2025-11-01T10:00:00.000Z",
  "call_cid": "default:my-call-123",
  "call": {
    "id": "my-call-123",
    "type": "default"
  }
}
```

## Testing with cURL

List users:

```bash
curl -X GET http://localhost:3000/api/users?limit=10&offset=0
```

Generate a user token:

```bash
curl -X POST http://localhost:3000/api/tokens/generate-token \
  -H "Content-Type: application/json" \
  -d '{"userId": "user123"}'
```

Create a user:

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"id": "user123", "name": "John Doe"}'
```

Create a call:

```bash
curl -X POST http://localhost:3000/api/calls \
  -H "Content-Type: application/json" \
  -d '{"callId": "my-call-123", "callType": "default"}'
```

## Project Structure

```plaintext
getstream-io-server/
├── src/
│   ├── config/
│   │   └── stream.ts          # Stream client configuration
│   ├── controllers/
│   │   ├── tokenController.ts  # Token generation logic
│   │   ├── userController.ts   # User management logic
│   │   ├── callController.ts   # Call management logic
│   │   └── webhookController.ts # Webhook handling logic
│   ├── middleware/
│   │   ├── errorHandler.ts    # Error handling middleware
│   │   ├── validator.ts       # Request validation middleware
│   │   └── webhook.ts         # Webhook signature verification
│   ├── routes/
│   │   ├── index.ts           # Route aggregator
│   │   ├── tokenRoutes.ts     # Token endpoints
│   │   ├── userRoutes.ts      # User endpoints
│   │   ├── callRoutes.ts      # Call endpoints
│   │   └── webhookRoutes.ts   # Webhook endpoints
│   ├── types/
│   │   └── index.ts           # TypeScript type definitions
│   └── index.ts               # Main application entry
├── dist/                       # Compiled JavaScript (generated)
├── .env                        # Environment variables (create from .env.example)
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
├── package.json                # Project dependencies
├── tsconfig.json               # TypeScript configuration
└── README.md                   # This file
```

## Scripts

- `yarn dev` - Run in development mode with ts-node
- `yarn build` - Compile TypeScript to JavaScript
- `yarn start` - Run the compiled server
- `yarn watch` - Watch mode for TypeScript compilation

## Technology Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **SDK**: @stream-io/node-sdk v0.7.17
- **Validation**: express-validator
- **Additional**: CORS, dotenv

## Architecture

This project follows a clean **MVC (Model-View-Controller)** architecture:

- **Config**: Centralized configuration and client initialization
- **Controllers**: Business logic for handling requests
- **Routes**: API endpoint definitions and validation rules
- **Middleware**: Request processing, validation, and error handling
- **Types**: TypeScript interfaces and type definitions

## Security Notes

- Never commit your `.env` file with real credentials
- Keep your `STREAM_API_SECRET` secure
- Use environment variables for sensitive data
- Webhook signature verification is implemented (set `WEBHOOK_SECRET` in `.env`)
- Consider adding rate limiting for production use
- Add authentication middleware for user-specific endpoints in production

## Environment Variables

Create a `.env` file with the following variables:

```env
# Required
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret

# Optional
PORT=3000
WEBHOOK_SECRET=your_webhook_secret
```

## License

ISC

## Support

For GetStream.io documentation, visit: [GetStream Video Docs](https://getstream.io/video/docs/)
