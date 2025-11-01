# Process Webhook

Process incoming webhooks from GetStream.io with signature verification.

## Endpoint

```http
POST /api/webhooks
```

## Request Headers

| Header | Type | Required | Description |
|--------|------|----------|-------------|
| `X-Signature` | string | **Yes** | Webhook signature for verification |
| `Content-Type` | string | **Yes** | Must be `application/json` |

## Request Body

The request body contains webhook event data from GetStream.io. Common event types include:

### Call Events

#### `call.created`

```json
{
  "type": "call.created",
  "call": {
    "id": "call_123",
    "type": "default",
    "created_by": "user_456",
    "created_at": "2024-01-15T10:30:00Z"
  },
  "user": {
    "id": "user_456",
    "name": "John Doe"
  }
}
```

#### `call.updated`

```json
{
  "type": "call.updated",
  "call": {
    "id": "call_123",
    "type": "default",
    "settings": {
      "max_participants": 20
    }
  },
  "user": {
    "id": "user_456"
  }
}
```

#### `call.ended`

```json
{
  "type": "call.ended",
  "call": {
    "id": "call_123",
    "type": "default",
    "ended_at": "2024-01-15T11:30:00Z",
    "duration_seconds": 3600
  },
  "user": {
    "id": "user_456"
  }
}
```

### Participant Events

#### `call.participant_joined`

```json
{
  "type": "call.participant_joined",
  "call": {
    "id": "call_123",
    "type": "default"
  },
  "user": {
    "id": "user_789",
    "name": "Jane Smith"
  },
  "participant": {
    "user_id": "user_789",
    "role": "member",
    "joined_at": "2024-01-15T10:32:00Z"
  }
}
```

#### `call.participant_left`

```json
{
  "type": "call.participant_left",
  "call": {
    "id": "call_123",
    "type": "default"
  },
  "user": {
    "id": "user_789"
  },
  "participant": {
    "user_id": "user_789",
    "role": "member",
    "left_at": "2024-01-15T11:30:00Z"
  }
}
```

### Recording Events

#### `call.recording_started`

```json
{
  "type": "call.recording_started",
  "call": {
    "id": "call_123",
    "type": "default"
  },
  "recording": {
    "id": "rec_456",
    "started_at": "2024-01-15T10:35:00Z"
  },
  "user": {
    "id": "user_456"
  }
}
```

#### `call.recording_stopped`

```json
{
  "type": "call.recording_stopped",
  "call": {
    "id": "call_123",
    "type": "default"
  },
  "recording": {
    "id": "rec_456",
    "started_at": "2024-01-15T10:35:00Z",
    "stopped_at": "2024-01-15T11:30:00Z",
    "duration_seconds": 3300
  },
  "user": {
    "id": "user_456"
  }
}
```

## Response

### Success Response (200)

```json
{
  "received": true,
  "event_type": "call.created",
  "call_id": "call_123",
  "processed_at": "2024-01-15T10:30:00Z",
  "duration": "0.023s"
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `received` | boolean | Always `true` for successful processing |
| `event_type` | string | The webhook event type received |
| `call_id` | string | Call ID from the webhook event |
| `processed_at` | string | ISO 8601 timestamp when webhook was processed |
| `duration` | string | API response time |

## Error Responses

### 400 Bad Request

```json
{
  "error": "Invalid webhook signature"
}
```

```json
{
  "error": "Missing X-Signature header"
}
```

```json
{
  "error": "Invalid JSON payload"
}
```

### 500 Internal Server Error

```json
{
  "error": "Failed to process webhook"
}
```

## Usage Examples

### Webhook from GetStream.io

```bash
curl -X POST "http://localhost:3000/api/webhooks" \
  -H "Content-Type: application/json" \
  -H "X-Signature: sha256=abc123..." \
  -d '{
    "type": "call.created",
    "call": {
      "id": "call_123",
      "type": "default",
      "created_by": "user_456",
      "created_at": "2024-01-15T10:30:00Z"
    },
    "user": {
      "id": "user_456",
      "name": "John Doe"
    }
  }'
```

## Notes

- Webhook signature verification is mandatory for security
- Signatures are generated using HMAC-SHA256 with the `WEBHOOK_SECRET`
- All webhook events are logged for debugging and monitoring
- The endpoint responds quickly to prevent timeouts from GetStream.io
- Failed webhook processing is logged with error details
- Common event types include call lifecycle, participant changes, and recording events
- Webhook data can be used to trigger custom business logic or notifications
