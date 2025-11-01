# End Call

End an ongoing video call and disconnect all participants.

## Endpoint

```http
POST /api/calls/:type/:id/end
```

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | string | **Yes** | Call type (e.g., `default`, `livestream`) |
| `id` | string | **Yes** | Call ID |

## Request Body

This endpoint does not require a request body.

## Request Example

```bash
curl -X POST "http://localhost:3000/api/calls/default/call_123/end" \
  -H "Content-Type: application/json"
```

## Response

### Success Response (200)

```json
{
  "call": {
    "id": "call_123",
    "type": "default",
    "status": "ended",
    "created_by": "user_456",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T11:30:00Z",
    "started_at": "2024-01-15T10:30:00Z",
    "ended_at": "2024-01-15T11:30:00Z",
    "settings": {
      "max_participants": 10,
      "max_duration_seconds": 3600
    },
    "participants": [],
    "duration_seconds": 3600
  },
  "duration": "0.156s"
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `call` | object | Ended call object |
| `call.id` | string | Unique call identifier |
| `call.type` | string | Call type |
| `call.status` | string | Call status (always "ended") |
| `call.created_by` | string | User ID who created the call |
| `call.created_at` | string | ISO 8601 timestamp when call was created |
| `call.updated_at` | string | ISO 8601 timestamp when call was ended |
| `call.started_at` | string | ISO 8601 timestamp when call started |
| `call.ended_at` | string | ISO 8601 timestamp when call ended |
| `call.settings` | object | Call configuration settings |
| `call.participants` | array | Empty array (all participants disconnected) |
| `call.duration_seconds` | number | Total call duration in seconds |
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
  "error": "Call is already ended"
}
```

### 403 Forbidden

```json
{
  "error": "Only call creator can end the call"
}
```

### 500 Internal Server Error

```json
{
  "error": "Failed to end call"
}
```

## Usage Examples

### End a default call

```bash
curl -X POST "http://localhost:3000/api/calls/default/call_123/end"
```

### End a livestream

```bash
curl -X POST "http://localhost:3000/api/calls/livestream/live_456/end"
```

## Notes

- Only the call creator can end a call
- Cannot end a call that is already ended
- All participants are automatically disconnected when a call ends
- The `ended_at` timestamp records when the call was terminated
- `duration_seconds` represents the total time the call was active
- Ended calls cannot be rejoined or restarted
- Any active recordings are automatically stopped when the call ends
