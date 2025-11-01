# Create Call

Create a new video call with specified settings and participants.

## Endpoint

```http
POST /api/calls
```

## Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | No | Custom call ID (auto-generated if not provided) |
| `type` | string | No | Call type: `default`, `livestream`, `audio_room`, `video_room` (default: `default`) |
| `created_by` | string | **Yes** | User ID of the call creator |
| `settings` | object | No | Call configuration settings |

### Settings Object

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `max_participants` | number | No | Maximum participants allowed (default: 10, max: 100) |
| `max_duration_seconds` | number | No | Maximum call duration in seconds (default: 3600 = 1 hour) |
| `recording` | object | No | Recording configuration |
| `video` | object | No | Video settings |
| `audio` | object | No | Audio settings |
| `screenshare` | object | No | Screenshare settings |

## Request Example

```bash
curl -X POST "http://localhost:3000/api/calls" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "my-custom-call-123",
    "type": "default",
    "created_by": "user_456",
    "settings": {
      "max_participants": 5,
      "max_duration_seconds": 1800,
      "recording": {
        "mode": "available"
      }
    }
  }'
```

## Response

### Success Response (201)

```json
{
  "call": {
    "id": "my-custom-call-123",
    "type": "default",
    "status": "ongoing",
    "created_by": "user_456",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z",
    "started_at": "2024-01-15T10:30:00Z",
    "settings": {
      "max_participants": 5,
      "max_duration_seconds": 1800,
      "recording": {
        "mode": "available"
      }
    },
    "participants": []
  },
  "duration": "0.145s"
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `call` | object | Created call object |
| `call.id` | string | Unique call identifier |
| `call.type` | string | Call type |
| `call.status` | string | Call status (always "ongoing" for new calls) |
| `call.created_by` | string | User ID who created the call |
| `call.created_at` | string | ISO 8601 timestamp when call was created |
| `call.updated_at` | string | ISO 8601 timestamp when call was last updated |
| `call.started_at` | string | ISO 8601 timestamp when call started |
| `call.settings` | object | Call configuration settings |
| `call.participants` | array | Participants array (empty for new calls) |
| `duration` | string | API response time |

## Error Responses

### 400 Bad Request

```json
{
  "error": "created_by is required"
}
```

```json
{
  "error": "Invalid call type. Must be one of: default, livestream, audio_room, video_room"
}
```

```json
{
  "error": "max_participants must be between 1 and 100"
}
```

### 409 Conflict

```json
{
  "error": "Call with ID 'my-custom-call-123' already exists"
}
```

### 500 Internal Server Error

```json
{
  "error": "Failed to create call"
}
```

## Usage Examples

### Create a basic call

```bash
curl -X POST "http://localhost:3000/api/calls" \
  -H "Content-Type: application/json" \
  -d '{
    "created_by": "user_456"
  }'
```

### Create a livestream call

```bash
curl -X POST "http://localhost:3000/api/calls" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "livestream",
    "created_by": "user_456",
    "settings": {
      "max_participants": 100,
      "recording": {
        "mode": "auto-on"
      }
    }
  }'
```

### Create a call with custom ID

```bash
curl -X POST "http://localhost:3000/api/calls" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "meeting-room-1",
    "created_by": "user_456",
    "settings": {
      "max_participants": 10,
      "max_duration_seconds": 7200
    }
  }'
```

## Notes

- The `created_by` field is mandatory and should be a valid user ID
- Call ID will be auto-generated if not provided (format: `call_[timestamp]_[random]`)
- New calls are automatically started and have "ongoing" status
- Call settings can be updated later using the update endpoint
- Recording settings determine if participants can start recordings
- Maximum duration is enforced by GetStream.io (default 1 hour, max 24 hours)
