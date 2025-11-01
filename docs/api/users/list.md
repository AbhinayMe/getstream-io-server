# List Users

Retrieve a paginated list of all users in the system.

## Endpoint

```
GET /api/users
```

## Description

Returns a paginated list of users with their basic information. Supports pagination through query parameters for handling large user bases efficiently.

## Request

### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `limit` | number | ❌ | 25 | Number of users to return (max: 100) |
| `offset` | number | ❌ | 0 | Number of users to skip for pagination |

### Example Request

```bash
# Get first 25 users
GET /api/users

# Get users 26-50
GET /api/users?limit=25&offset=25

# Get first 10 users
GET /api/users?limit=10
```

## Response

### Success Response (200)

```json
{
  "success": true,
  "data": [
    {
      "id": "user123",
      "name": "John Doe",
      "image": "https://example.com/avatar.jpg",
      "role": "admin",
      "created_at": "2025-11-01T10:00:00.000Z",
      "updated_at": "2025-11-01T11:30:00.000Z",
      "custom": {
        "department": "Engineering",
        "title": "Senior Developer"
      }
    },
    {
      "id": "user456",
      "name": "Jane Smith",
      "image": null,
      "role": "member",
      "created_at": "2025-11-01T09:15:00.000Z",
      "updated_at": "2025-11-01T09:15:00.000Z",
      "custom": {}
    }
  ]
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique user identifier |
| `name` | string | User's display name |
| `image` | string/null | URL to user's avatar image |
| `role` | string | User role (admin, moderator, member) |
| `created_at` | string | ISO 8601 timestamp of creation |
| `updated_at` | string | ISO 8601 timestamp of last update |
| `custom` | object | Additional custom user data |

### Empty Response

```json
{
  "success": true,
  "data": []
}
```

### Error Response (500)

```json
{
  "success": false,
  "error": "Failed to retrieve users"
}
```

## Usage Examples

### Basic List

```bash
curl -X GET http://localhost:3000/api/users
```

### Paginated List

```bash
# Page 1: Users 1-25
curl -X GET "http://localhost:3000/api/users?limit=25&offset=0"

# Page 2: Users 26-50
curl -X GET "http://localhost:3000/api/users?limit=25&offset=25"

# Page 3: Users 51-75
curl -X GET "http://localhost:3000/api/users?limit=25&offset=50"
```

### Small Batch

```bash
curl -X GET "http://localhost:3000/api/users?limit=5"
```

## Pagination Notes

- Use `offset` to skip records for pagination
- Combine with `limit` for page-based navigation
- Maximum `limit` is 100 users per request
- Default `limit` is 25 users per request
- For large user bases, implement proper pagination in your frontend

## Performance Considerations

- Large `limit` values may impact response time
- Consider caching user lists for frequently accessed data
- Use appropriate pagination for better UX
- Monitor API usage for optimization opportunities

## Related Endpoints

- [Create User](./create.md) - Add new users
- [Get User](./get.md) - Get specific user details
- [Update User](./update.md) - Modify user information
- [Delete User](./delete.md) - Remove users