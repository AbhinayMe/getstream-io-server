# Create User

Create a new user in the GetStream.io system.

## Endpoint

```
POST /api/users
```

## Description

Creates a new user profile with the provided information. The user will be available for video calls and can be assigned to calls with appropriate permissions.

## Request

### Headers

```
Content-Type: application/json
```

### Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | ✅ | Unique identifier for the user (max 255 chars) |
| `name` | string | ❌ | User's display name |
| `image` | string | ❌ | URL to user's avatar image |
| `role` | string | ❌ | User role: "admin", "moderator", "member" |
| `custom` | object | ❌ | Additional custom user data |

### Example Request

```json
{
  "id": "john_doe",
  "name": "John Doe",
  "image": "https://example.com/avatars/john.jpg",
  "role": "member",
  "custom": {
    "department": "Engineering",
    "title": "Senior Developer",
    "location": "San Francisco"
  }
}
```

## Response

### Success Response (201)

```json
{
  "success": true,
  "data": {
    "id": "john_doe",
    "name": "John Doe",
    "image": "https://example.com/avatars/john.jpg",
    "role": "member",
    "created_at": "2025-11-01T10:00:00.000Z",
    "updated_at": "2025-11-01T10:00:00.000Z",
    "custom": {
      "department": "Engineering",
      "title": "Senior Developer",
      "location": "San Francisco"
    }
  }
}
```

### Error Responses

#### Validation Error (422)

```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    {
      "field": "id",
      "message": "ID is required"
    }
  ]
}
```

#### User Already Exists (409)

```json
{
  "success": false,
  "error": "User already exists"
}
```

#### Server Error (500)

```json
{
  "success": false,
  "error": "Failed to create user"
}
```

## Usage Examples

### Basic User Creation

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "id": "john_doe",
    "name": "John Doe"
  }'
```

### Complete User Profile

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "id": "jane_smith",
    "name": "Jane Smith",
    "image": "https://example.com/avatar.jpg",
    "role": "admin",
    "custom": {
      "department": "Engineering",
      "title": "Tech Lead",
      "skills": ["React", "Node.js", "TypeScript"]
    }
  }'
```

### Admin User

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "id": "admin_user",
    "name": "Admin User",
    "role": "admin"
  }'
```

## Field Validation

### ID Requirements
- Required field
- Must be unique across all users
- Maximum 255 characters
- Can contain letters, numbers, hyphens, and underscores
- Case-sensitive

### Name Requirements
- Optional but recommended
- Maximum 255 characters
- Will be displayed in video call interfaces

### Image Requirements
- Optional
- Must be a valid HTTP/HTTPS URL
- Recommended size: 256x256 pixels or larger
- Supported formats: JPG, PNG, GIF, WebP

### Role Values
- `admin`: Full system access
- `moderator`: Call management permissions
- `member`: Standard user permissions (default)

### Custom Data
- Optional object for additional user information
- No specific schema requirements
- Can contain any valid JSON data
- Useful for storing user preferences, metadata, etc.

## Notes

- User creation is idempotent - creating the same user twice will update the existing user
- Roles determine call participation permissions
- Custom data is preserved and returned in all user queries
- User IDs cannot be changed after creation
- Consider implementing user authentication before calling this endpoint in production