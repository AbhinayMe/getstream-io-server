# Generate User Token

Generate an authentication token for a user to access GetStream.io services.

## Endpoint

```
POST /api/tokens/user
```

## Description

Creates a JWT token that authenticates a user for GetStream.io operations. This token is required for client-side SDK initialization and user authentication.

## Request

### Headers

```
Content-Type: application/json
```

### Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `userId` | string | ✅ | Unique identifier for the user |
| `validityInSeconds` | number | ❌ | Token validity duration in seconds (default: 3600 = 1 hour) |
| `callId` | string | ❌ | Specific call ID to restrict token to |
| `callType` | string | ❌ | Call type (default: "default") |

### Example Request

```json
{
  "userId": "user123",
  "validityInSeconds": 7200,
  "callId": "call-456",
  "callType": "default"
}
```

## Response

### Success Response (200)

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "userId": "user123",
    "apiKey": "your_stream_api_key",
    "callId": "call-456",
    "callType": "default",
    "validityInSeconds": 7200
  }
}
```

### Error Response (400/422/500)

```json
{
  "success": false,
  "error": "Validation failed: userId is required"
}
```

## Usage Examples

### Basic User Token

```bash
curl -X POST http://localhost:3000/api/tokens/user \
  -H "Content-Type: application/json" \
  -d '{"userId": "john_doe"}'
```

### Token with Custom Validity

```bash
curl -X POST http://localhost:3000/api/tokens/user \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "john_doe",
    "validityInSeconds": 86400
  }'
```

### Call-Restricted Token

```bash
curl -X POST http://localhost:3000/api/tokens/user \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "john_doe",
    "callId": "meeting-123",
    "callType": "default"
  }'
```

## Client SDK Usage

```javascript
// Initialize Stream client with the token
import { StreamVideoClient } from '@stream-io/video-react-sdk';

const client = new StreamVideoClient({
  apiKey: 'your_api_key',
  user: { id: 'user123' },
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' // Token from this endpoint
});
```

## Notes

- Tokens expire after the specified `validityInSeconds` (default: 1 hour)
- Store tokens securely and refresh before expiration
- Use HTTPS in production to protect tokens in transit
- Tokens are specific to the user and optional call restrictions