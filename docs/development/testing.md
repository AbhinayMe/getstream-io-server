# Testing Guide

Learn how to test the GetStream.io Server API endpoints.

## Testing Tools

### Postman Collection

The project includes a comprehensive Postman collection with 37 pre-configured API requests.

**Import the collection:**

1. Open Postman
2. Click **Import**
3. Select `GetStream-IO-Server.postman_collection.json`
4. Select `GetStream-IO-Server.postman_environment.json`
5. Choose the "GetStream-IO-Server" environment

**Collection structure:**

- Token Management (2 requests)
- User Management (5 requests)
- Call Management (5 requests)
- Webhooks (1 request)

### Manual Testing with cURL

All API documentation includes cURL examples for testing.

## Running Tests

### 1. Start the Server

```bash
yarn dev
```

Server will be available at `http://localhost:3000`

### 2. Health Check

```bash
curl http://localhost:3000/health
```

Expected response:

```json
{
  "status": "ok",
  "message": "GetStream.io Server is running"
}
```

### 3. Test Token Generation

**Generate User Token:**

```bash
curl -X POST http://localhost:3000/api/tokens/user \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "test_user_123",
    "validity": 3600
  }'
```

**Generate Call Token:**

```bash
curl -X POST http://localhost:3000/api/tokens/call \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "test_user_123",
    "callType": "default",
    "callId": "test_call_456",
    "role": "admin"
  }'
```

### 4. Test User Management

**Create User:**

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "id": "test_user_123",
    "name": "Test User",
    "role": "user"
  }'
```

**Get User:**

```bash
curl http://localhost:3000/api/users/test_user_123
```

**List Users:**

```bash
curl "http://localhost:3000/api/users?limit=10"
```

### 5. Test Call Management

**Create Call:**

```bash
curl -X POST http://localhost:3000/api/calls \
  -H "Content-Type: application/json" \
  -d '{
    "id": "test_call_456",
    "type": "default",
    "created_by": "test_user_123"
  }'
```

**Get Call:**

```bash
curl http://localhost:3000/api/calls/default/test_call_456
```

**End Call:**

```bash
curl -X POST http://localhost:3000/api/calls/default/test_call_456/end
```

## Test Scenarios

### Scenario 1: Complete Call Flow

1. Create a user
2. Generate user token
3. Create a call
4. Generate call token with admin role
5. Get call details
6. Update call settings
7. End the call

### Scenario 2: User Management

1. List existing users
2. Create a new user
3. Get user details
4. Update user profile
5. Delete user

### Scenario 3: Token Validation

1. Generate tokens with different validity periods
2. Test token expiration
3. Verify role-based call tokens

## Error Testing

Test error cases to ensure proper validation:

**Missing required fields:**

```bash
curl -X POST http://localhost:3000/api/tokens/user \
  -H "Content-Type: application/json" \
  -d '{}'
```

**Invalid call type:**

```bash
curl -X POST http://localhost:3000/api/calls \
  -H "Content-Type: application/json" \
  -d '{
    "type": "invalid_type",
    "created_by": "test_user_123"
  }'
```

## Automated Testing

### Unit Tests

To be implemented using Jest:

```bash
yarn test
```

### Integration Tests

To be implemented for API endpoints:

```bash
yarn test:integration
```

## Testing Checklist

- [ ] All endpoints return expected status codes
- [ ] Error messages are clear and helpful
- [ ] Input validation works correctly
- [ ] Tokens are generated successfully
- [ ] Users can be created, read, updated, deleted
- [ ] Calls can be managed properly
- [ ] Webhooks can be processed
- [ ] Environment variables are loaded
- [ ] GetStream.io SDK integration works

## Troubleshooting

### Server won't start

- Check `.env` file has correct credentials
- Verify port 3000 is not in use
- Run `yarn install` to install dependencies

### API returns 500 errors

- Check GetStream.io credentials
- Verify API key and secret are correct
- Check server logs for details

### Token generation fails

- Verify `STREAM_API_KEY` and `STREAM_API_SECRET` in `.env`
- Check user exists before generating call tokens
- Ensure validity is a positive number
