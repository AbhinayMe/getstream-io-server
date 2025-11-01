# Update Call

Update settings and configuration of an existing video call.

## Endpoint

```http
PUT /api/calls/:type/:id
```

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | string | **Yes** | Call type (e.g., `default`, `livestream`) |
| `id` | string | **Yes** | Call ID |

## Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `settings` | object | No | Updated call configuration settings |

### Settings Object

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `max_participants` | number | No | Maximum participants allowed (1-100) |
| `max_duration_seconds` | number | No | Maximum call duration in seconds |
| `recording` | object | No | Recording configuration |
| `video` | object | No | Video settings |
| `audio` | object | No | Audio settings |
| `screenshare` | object | No | Screenshare settings |

## Request Example

```bash
curl -X PUT "http://localhost:3000/api/calls/default/call_123" \
  -H "Content-Type: application/json" \
  -d '{
    "settings": {
      "max_participants": 20,
      "max_duration_seconds": 7200,
      "recording": {
        "mode": "auto-on"
      }
    }
  }'
```

## Response

### Success Response (200)

```json
{
  "call": {
    "id": "call_123",
    "type": "default",
    "status": "ongoing",
    "created_by": "user_456",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:45:00Z",
    "started_at": "2024-01-15T10:30:00Z",
    "settings": {
      "max_participants": 20,
      "max_duration_seconds": 7200,
      "recording": {
        "mode": "auto-on"
      }
    },
    "participants": [
      {
        "user_id": "user_456",
        "role": "admin",
        "joined_at": "2024-01-15T10:30:00Z"
      }
    ]
  },
  "duration": "0.112s"
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `call` | object | Updated call object |
| `call.id` | string | Unique call identifier |
| `call.type` | string | Call type |
| `call.status` | string | Call status |
| `call.created_by` | string | User ID who created the call |
| `call.created_at` | string | ISO 8601 timestamp when call was created |
| `call.updated_at` | string | ISO 8601 timestamp when call was last updated |
| `call.started_at` | string | ISO 8601 timestamp when call started |
| `call.settings` | object | Updated call configuration settings |
| `call.participants` | array | Current participants in the call |
| `duration` | string | API response time |

## Error Responses

### 404 Not Found

```json
{
  "error": "Call not found"
}
```

### 400 Bad Request

```json
{
  "error": "max_participants must be between 1 and 100"
}
```

```json
{
  "error": "Cannot update settings for ended call"
}
```

### 403 Forbidden

```json
{
  "error": "Only call creator can update call settings"
}
```

### 500 Internal Server Error

```json
{
  "error": "Failed to update call"
}
```

## Usage Examples

### Update participant limit

```bash
curl -X PUT "http://localhost:3000/api/calls/default/call_123" \
  -H "Content-Type: application/json" \
  -d '{
    "settings": {
      "max_participants": 50
    }
  }'
```

### Enable recording

```bash
curl -X PUT "http://localhost:3000/api/calls/livestream/live_456" \
  -H "Content-Type: application/json" \
  -d '{
    "settings": {
      "recording": {
        "mode": "available"
      }
    }
  }'
```

### Update multiple settings

```bash
curl -X PUT "http://localhost:3000/api/calls/default/call_123" \
  -H "Content-Type: application/json" \
  -d '{
    "settings": {
      "max_participants": 15,
      "max_duration_seconds": 3600,
      "recording": {
        "mode": "disabled"
      }
    }
  }'
```

## Notes

- Only the call creator can update call settings
- Cannot update settings for calls that have already ended
- Settings changes apply immediately to ongoing calls
- Recording settings determine if participants can start/stop recordings
- Video, audio, and screenshare settings control call capabilities
- The `updated_at` timestamp reflects when the last update occurred
