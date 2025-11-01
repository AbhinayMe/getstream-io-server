# Delete User

Remove a user from the GetStream.io system.

## Endpoint

```
DELETE /api/users/:userId
```

## Description

Permanently deletes a user and removes them from all associated calls and data. This action cannot be undone.

## Request

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `userId` | string | ✅ | Unique identifier of the user to delete |

### Example Request

```bash
DELETE /api/users/john_doe
```

## Response

### Success Response (200)

```json
{
  "success": true,
  "message": "User deleted successfully"
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

#### User in Active Call (409)

```json
{
  "success": false,
  "error": "Cannot delete user: currently in active call"
}
```

#### Server Error (500)

```json
{
  "success": false,
  "error": "Failed to delete user"
}
```

## Usage Examples

### Delete User

```bash
curl -X DELETE http://localhost:3000/api/users/john_doe
```

### Handle Errors

```bash
# Try to delete non-existent user
curl -X DELETE http://localhost:3000/api/users/nonexistent_user
# Returns 404 error
```

## Important Considerations

### ⚠️ Irreversible Action
- Deleted users cannot be recovered
- All user data is permanently removed
- User tokens become invalid immediately

### Active Call Check
- Users currently in active calls cannot be deleted
- End their call participation first, then delete
- This prevents disruption of ongoing meetings

### Cascade Effects
- User is removed from all future calls
- User tokens are invalidated
- Historical call data may still reference the user ID

## Use Cases

### User Account Deletion

```javascript
// Frontend: Delete user account
const deleteUserAccount = async (userId) => {
  try {
    const response = await fetch(`/api/users/${userId}`, {
      method: 'DELETE'
    });

    const result = await response.json();

    if (result.success) {
      // User deleted successfully
      logoutUser();
      redirectToHome();
    } else {
      showError(result.error);
    }
  } catch (error) {
    showError('Failed to delete account');
  }
};
```

### Admin User Management

```javascript
// Admin panel: Remove user
const removeUser = async (userId) => {
  const confirmDelete = confirm(`Delete user ${userId}? This cannot be undone.`);

  if (!confirmDelete) return;

  const response = await fetch(`/api/users/${userId}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    refreshUserList();
  } else {
    const error = await response.json();
    showError(error.error);
  }
};
```

### Cleanup Inactive Users

```javascript
// Batch delete inactive users (admin function)
const cleanupInactiveUsers = async (inactiveUserIds) => {
  const results = [];

  for (const userId of inactiveUserIds) {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE'
      });

      results.push({
        userId,
        success: response.ok,
        error: response.ok ? null : (await response.json()).error
      });
    } catch (error) {
      results.push({
        userId,
        success: false,
        error: error.message
      });
    }
  }

  return results;
};
```

## Best Practices

### Confirmation Required
- Always require explicit confirmation before deletion
- Show clear warning about irreversible nature
- Consider soft delete for important users

### Check Dependencies
- Verify user is not in active calls
- Check for any dependent resources
- Consider data export before deletion

### Audit Logging
- Log all user deletions for compliance
- Include timestamp, user ID, and requesting user
- Maintain deletion history if required

### Rate Limiting
- Implement rate limiting for delete operations
- Prevent accidental mass deletions
- Require admin privileges for user deletion

## Related Endpoints

- [List Users](./list.md) - View all users before deletion
- [Get User](./get.md) - Verify user exists before deletion
- [Create User](./create.md) - Recreate user if needed
- [Update User](./update.md) - Alternative to deletion (deactivation)