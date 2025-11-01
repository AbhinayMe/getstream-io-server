# Get Call Details

Retrieve detailed information about a specific video call.

## Endpoint

```http
GET /api/calls/:type/:id
```

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | string | **Yes** | Call type (e.g., `default`, `livestream`) |
| `id` | string | **Yes** | Call ID |

## Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `include_participants` | boolean | No | Include detailed participant information (default: true) |

## Request Example

```bash
curl -X GET "http://localhost:3000/api/calls/default/call_123" \
  -H "Content-Type: application/json"
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
    "updated_at": "2024-01-15T10:35:00Z",
    "started_at": "2024-01-15T10:30:00Z",
    "settings": {
      "max_participants": 10,
      "max_duration_seconds": 3600,
      "recording": {
        "mode": "available"
      }
    },
    "participants": [
      {
        "user_id": "user_456",
        "role": "admin",
        "joined_at": "2024-01-15T10:30:00Z",
        "name": "John Doe",
        "image": "https://example.com/avatar.jpg"
      },
      {
        "user_id": "user_789",
        "role": "member",
        "joined_at": "2024-01-15T10:32:00Z",
        "name": "Jane Smith",
        "image": "https://example.com/avatar2.jpg"
      }
    ],
    "recording": false,
    "transcribing": false,
    "backstage": false,
    "broadcasting": false
  },
  "duration": "0.089s"
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `call` | object | Call details object |
| `call.id` | string | Unique call identifier |
| `call.type` | string | Call type |
| `call.status` | string | Call status: "ongoing", "ended" |
| `call.created_by` | string | User ID who created the call |
| `call.created_at` | string | ISO 8601 timestamp when call was created |
| `call.updated_at` | string | ISO 8601 timestamp when call was last updated |
| `call.started_at` | string | ISO 8601 timestamp when call started |
| `call.ended_at` | string | ISO 8601 timestamp when call ended (null if ongoing) |
| `call.settings` | object | Call configuration settings |
| `call.participants` | array | Current participants in the call |
| `call.participants[].user_id` | string | Participant user ID |
| `call.participants[].role` | string | Participant role: "admin", "moderator", "member" |
| `call.participants[].joined_at` | string | When participant joined |
| `call.participants[].name` | string | Participant display name |
| `call.participants[].image` | string | Participant avatar URL |
| `call.recording` | boolean | Whether call is currently being recorded |
| `call.transcribing` | boolean | Whether transcription is active |
| `call.backstage` | boolean | Whether backstage mode is enabled |
| `call.broadcasting` | boolean | Whether call is being broadcast |
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
  "error": "Invalid call type"
}
```

### 500 Internal Server Error

```json
{
  "error": "Failed to retrieve call details"
}
```

## Usage Examples

### Get call details without participants

```bash
curl -X GET "http://localhost:3000/api/calls/default/call_123?include_participants=false"
```

### Get livestream call details

```bash
curl -X GET "http://localhost:3000/api/calls/livestream/live_456"
```

## Notes

- The call type in the URL path must match the actual call type
- Participant information includes user profile data if available
- For ended calls, the response includes `ended_at` timestamp
- Real-time features like recording status are included in the response
- Call settings reflect the current configuration, which may have been updated
