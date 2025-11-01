# Update User

Update an existing user's information and profile data.

## Endpoint

```
PUT /api/users/:userId
```

## Description

Modifies user information including name, avatar, role, and custom metadata. Only provided fields will be updated - omitted fields remain unchanged.

## Request

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `userId` | string | ✅ | Unique identifier of the user to update |

### Headers

```
Content-Type: application/json
```

### Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | ❌ | Updated display name |
| `image` | string | ❌ | Updated avatar image URL |
| `role` | string | ❌ | Updated user role |
| `custom` | object | ❌ | Updated custom user data (replaces entire object) |

### Example Request

```json
{
  "name": "John Smith",
  "image": "https://example.com/new-avatar.jpg",
  "custom": {
    "department": "Engineering",
    "title": "Tech Lead",
    "skills": ["React", "Node.js", "TypeScript", "Python"]
  }
}
```

## Response

### Success Response (200)

```json
{
  "success": true,
  "data": {
    "id": "john_doe",
    "name": "John Smith",
    "image": "https://example.com/new-avatar.jpg",
    "role": "member",
    "created_at": "2025-11-01T10:00:00.000Z",
    "updated_at": "2025-11-01T12:00:00.000Z",
    "custom": {
      "department": "Engineering",
      "title": "Tech Lead",
      "skills": ["React", "Node.js", "TypeScript", "Python"]
    }
  }
}
```

### Error Responses

#### User Not Found (404)

```json
{
  "success": false,
  "error": "User not found"
}
```

#### Validation Error (422)

```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    {
      "field": "image",
      "message": "Invalid URL format"
    }
  ]
}
```

#### Server Error (500)

```json
{
  "success": false,
  "error": "Failed to update user"
}
```

## Usage Examples

### Update User Name

```bash
curl -X PUT http://localhost:3000/api/users/john_doe \
  -H "Content-Type: application/json" \
  -d '{"name": "John Smith"}'
```

### Update Avatar

```bash
curl -X PUT http://localhost:3000/api/users/john_doe \
  -H "Content-Type: application/json" \
  -d '{"image": "https://example.com/new-avatar.jpg"}'
```

### Update Role

```bash
curl -X PUT http://localhost:3000/api/users/john_doe \
  -H "Content-Type: application/json" \
  -d '{"role": "moderator"}'
```

### Update Custom Data

```bash
curl -X PUT http://localhost:3000/api/users/john_doe \
  -H "Content-Type: application/json" \
  -d '{
    "custom": {
      "department": "Engineering",
      "title": "Senior Engineer",
      "location": "New York"
    }
  }'
```

### Partial Update

```bash
# Only update name, leave other fields unchanged
curl -X PUT http://localhost:3000/api/users/john_doe \
  -H "Content-Type: application/json" \
  -d '{"name": "Johnny Doe"}'
```

## Field Behavior

### Partial Updates
- Only provided fields are updated
- Omitted fields retain their current values
- `custom` object is replaced entirely if provided

### Validation Rules
- `name`: Optional, max 255 characters
- `image`: Optional, must be valid URL if provided
- `role`: Optional, must be "admin", "moderator", or "member"
- `custom`: Optional, any valid JSON object

### Timestamps
- `created_at`: Never changes
- `updated_at`: Automatically set to current time on successful update

## Use Cases

### Profile Updates

```javascript
// Update user profile from frontend
const updateProfile = async (userId, profileData) => {
  const response = await fetch(`/api/users/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profileData)
  });

  const result = await response.json();
  return result.success ? result.data : null;
};
```

### Role Management

```javascript
// Promote user to moderator
const promoteToModerator = async (userId) => {
  return await updateProfile(userId, { role: 'moderator' });
};
```

### Settings Updates

```javascript
// Update user preferences
const updateUserSettings = async (userId, settings) => {
  const currentUser = await fetch(`/api/users/${userId}`).then(r => r.json());

  const updatedCustom = {
    ...currentUser.data.custom,
    settings: settings
  };

  return await updateProfile(userId, { custom: updatedCustom });
};
```

## Notes

- User ID cannot be changed through this endpoint
- Custom data object is replaced entirely (not merged)
- All changes are immediately reflected in active calls
- Consider implementing authorization checks for role updates
- Changes are persisted to GetStream.io immediately