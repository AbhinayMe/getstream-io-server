# Generate Call Token

Generate a token with specific call access permissions and optional role-based restrictions.

## Endpoint

```
POST /api/tokens/call
```

## Description

Creates a JWT token that grants access to a specific video call with defined permissions. This token includes role information (admin, moderator, member) and call-specific restrictions.

## Request

### Headers

```
Content-Type: application/json
```

### Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `userId` | string | ✅ | Unique identifier for the user |
| `callId` | string | ✅ | Unique identifier for the call |
| `callType` | string | ❌ | Call type (default: "default") |
| `role` | string | ❌ | User role: "admin", "moderator", "member" (default: "member") |
| `validityInSeconds` | number | ❌ | Token validity duration in seconds (default: 3600 = 1 hour) |

### Example Request

```json
{
  "userId": "moderator_user",
  "callId": "team-meeting-123",
  "callType": "default",
  "role": "moderator",
  "validityInSeconds": 7200
}
```

## Response

### Success Response (200)

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "userId": "moderator_user",
    "apiKey": "your_stream_api_key",
    "callId": "team-meeting-123",
    "callType": "default",
    "role": "moderator",
    "validityInSeconds": 7200
  }
}
```

### Error Response (400/422/500)

```json
{
  "success": false,
  "error": "Validation failed: callId is required"
}
```

## Roles and Permissions

### Admin Role
- Full control over the call
- Can manage participants
- Can end the call for everyone
- Can modify call settings
- Can mute/unmute participants

### Moderator Role
- Can manage participants (mute/unmute)
- Can remove participants
- Cannot end call for everyone
- Cannot modify call settings

### Member Role (Default)
- Basic participant permissions
- Can join/leave call
- Can control own audio/video
- Limited management capabilities

## Usage Examples

### Basic Call Token

```bash
curl -X POST http://localhost:3000/api/tokens/call \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "participant_1",
    "callId": "meeting-123"
  }'
```

### Moderator Token

```bash
curl -X POST http://localhost:3000/api/tokens/call \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "moderator_user",
    "callId": "meeting-123",
    "role": "moderator"
  }'
```

### Admin Token with Extended Validity

```bash
curl -X POST http://localhost:3000/api/tokens/call \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "admin_user",
    "callId": "meeting-123",
    "role": "admin",
    "validityInSeconds": 28800
  }'
```

## Client SDK Usage

```javascript
// Join a call with role-based permissions
import { useCall, useCallState } from '@stream-io/video-react-sdk';

const MyCallComponent = () => {
  const call = useCall();
  const { call: callState } = useCallState();

  // Token includes role information for permission checks
  const canModerate = callState?.session?.user?.role === 'moderator' ||
                     callState?.session?.user?.role === 'admin';

  return (
    <div>
      {canModerate && <button>Mute All</button>}
    </div>
  );
};
```

## Notes

- Call tokens are more restrictive than user tokens
- Role determines participant capabilities in the call
- Tokens expire independently of call duration
- Use appropriate roles based on user permissions
- Admin role should be granted sparingly