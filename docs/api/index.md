# API Reference

Complete API documentation for GetStream.io Server endpoints.

## Base URL

```
http://localhost:3000/api
```

## Authentication

All API endpoints are public. Authentication tokens are generated server-side and provided to clients.

## Response Format

All responses follow this structure:

```json
{
  "success": boolean,
  "data": object | array | null,
  "error": string | null
}
```

## Endpoints Overview

### Health & Status
- [GET /health](../health.md) - Server health check

### Token Management
- [POST /tokens/user](./tokens/user.md) - Generate user authentication token
- [POST /tokens/call](./tokens/call.md) - Generate call-specific token

### User Management
- [GET /users](./users/list.md) - List users with pagination
- [POST /users](./users/create.md) - Create new user
- [GET /users/:userId](./users/get.md) - Get user details
- [PUT /users/:userId](./users/update.md) - Update user profile
- [DELETE /users/:userId](./users/delete.md) - Delete user

### Call Management
- [GET /calls](./calls/list.md) - List all calls
- [POST /calls](./calls/create.md) - Create new call
- [GET /calls/:type/:id](./calls/get.md) - Get call details
- [PUT /calls/:type/:id](./calls/update.md) - Update call settings
- [POST /calls/:type/:id/end](./calls/end.md) - End active call

### Webhooks
- [POST /webhooks](./webhooks/process.md) - Process GetStream.io webhook events

## Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request - Invalid input parameters |
| 404 | Not Found - Resource doesn't exist |
| 422 | Validation Error - Request validation failed |
| 500 | Internal Server Error - Server-side error |

## Rate Limiting

Currently no rate limiting is implemented. Consider adding rate limiting for production use.

## SDK Versions

- **@stream-io/node-sdk**: 0.7.17
- **Node.js**: 18.0.0+
- **TypeScript**: 5.2.2+