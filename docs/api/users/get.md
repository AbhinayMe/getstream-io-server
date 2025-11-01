# Get User

Retrieve detailed information about a specific user.

## Endpoint

```
GET /api/users/:userId
```

## Description

Fetches complete user information including profile data, roles, and custom metadata for the specified user ID.

## Request

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `userId` | string | ✅ | Unique identifier of the user to retrieve |

### Example Request

```bash
GET /api/users/john_doe
```

## Response

### Success Response (200)

```json
{
  "success": true,
  "data": {
    "id": "john_doe",
    "name": "John Doe",
    "image": "https://example.com/avatars/john.jpg",
    "role": "member",
    "created_at": "2025-11-01T10:00:00.000Z",
    "updated_at": "2025-11-01T11:30:00.000Z",
    "custom": {
      "department": "Engineering",
      "title": "Senior Developer",
      "skills": ["React", "Node.js", "TypeScript"],
      "last_login": "2025-11-01T11:30:00.000Z"
    }
  }
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

### Error Responses

#### User Not Found (404)

```json
{
  "success": false,
  "error": "User not found"
}
```

#### Server Error (500)

```json
{
  "success": false,
  "error": "Failed to retrieve user"
}
```

## Usage Examples

### Get Specific User

```bash
curl -X GET http://localhost:3000/api/users/john_doe
```

### Get Admin User

```bash
curl -X GET http://localhost:3000/api/users/admin_user
```

### Handle Not Found

```bash
curl -X GET http://localhost:3000/api/users/nonexistent_user
# Returns 404 with error message
```

## Use Cases

### User Profile Display

```javascript
// Frontend: Display user profile
const fetchUserProfile = async (userId) => {
  try {
    const response = await fetch(`/api/users/${userId}`);
    const result = await response.json();

    if (result.success) {
      const user = result.data;
      displayUserProfile(user);
    } else {
      showError(result.error);
    }
  } catch (error) {
    showError('Failed to load user profile');
  }
};
```

### Permission Checks

```javascript
// Check if user has admin role
const checkAdminPermissions = async (userId) => {
  const response = await fetch(`/api/users/${userId}`);
  const result = await response.json();

  return result.success && result.data.role === 'admin';
};
```

### User Validation

```javascript
// Validate user exists before proceeding
const validateUser = async (userId) => {
  const response = await fetch(`/api/users/${userId}`);

  if (response.status === 404) {
    throw new Error('User does not exist');
  }

  const result = await response.json();
  return result.success ? result.data : null;
};
```

## Performance Notes

- This endpoint queries the GetStream.io API directly
- Consider caching frequently accessed user data
- Response includes all user metadata
- Custom fields are preserved as-is

## Related Endpoints

- [List Users](./list.md) - Get multiple users with pagination
- [Update User](./update.md) - Modify user information
- [Delete User](./delete.md) - Remove user
- [Create User](./create.md) - Add new users