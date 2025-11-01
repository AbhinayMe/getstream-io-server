# List Calls

Get a list of all video calls with optional filtering and pagination.

## Endpoint

```http
GET /api/calls
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `limit` | number | No | Maximum number of calls to return (default: 25, max: 100) |
| `next` | string | No | Pagination token for next page |
| `sort_by` | string | No | Sort field: `created_at`, `updated_at`, `started_at`, `ended_at` (default: `created_at`) |
| `sort_order` | string | No | Sort order: `asc`, `desc` (default: `desc`) |
| `status` | string | No | Filter by call status: `ongoing`, `ended` |
| `created_by` | string | No | Filter by user ID who created the call |

## Request Example

```bash
curl -X GET "http://localhost:3000/api/calls?limit=10&sort_by=created_at&sort_order=desc" \
  -H "Content-Type: application/json"
```

## Response

### Success Response (200)

```json
{
  "calls": [
    {
      "id": "call_123",
      "type": "default",
      "status": "ongoing",
      "created_by": "user_456",
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z",
      "started_at": "2024-01-15T10:30:00Z",
      "settings": {
        "max_participants": 10,
        "max_duration_seconds": 3600
      },
      "participants": [
        {
          "user_id": "user_456",
          "role": "admin",
          "joined_at": "2024-01-15T10:30:00Z"
        }
      ]
    }
  ],
  "next": "eyJwYWdlIjoxfQ==", // Base64 encoded pagination token
  "duration": "0.123s"
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `calls` | array | Array of call objects |
| `calls[].id` | string | Unique call identifier |
| `calls[].type` | string | Call type (e.g., "default", "livestream") |
| `calls[].status` | string | Call status: "ongoing", "ended" |
| `calls[].created_by` | string | User ID who created the call |
| `calls[].created_at` | string | ISO 8601 timestamp when call was created |
| `calls[].updated_at` | string | ISO 8601 timestamp when call was last updated |
| `calls[].started_at` | string | ISO 8601 timestamp when call started (null if not started) |
| `calls[].ended_at` | string | ISO 8601 timestamp when call ended (null if ongoing) |
| `calls[].settings` | object | Call configuration settings |
| `calls[].participants` | array | Current participants in the call |
| `next` | string | Pagination token for next page (null if no more pages) |
| `duration` | string | API response time |

## Error Responses

### 400 Bad Request

```json
{
  "error": "Invalid sort_by parameter. Must be one of: created_at, updated_at, started_at, ended_at"
}
```

### 500 Internal Server Error

```json
{
  "error": "Failed to retrieve calls"
}
```

## Usage Examples

### Get recent calls with pagination

```bash
curl -X GET "http://localhost:3000/api/calls?limit=5&sort_by=created_at&sort_order=desc"
```

### Get ongoing calls only

```bash
curl -X GET "http://localhost:3000/api/calls?status=ongoing"
```

### Get calls created by specific user

```bash
curl -X GET "http://localhost:3000/api/calls?created_by=user_456"
```

## Notes

- Results are sorted by creation date descending by default (newest first)
- Use the `next` token in subsequent requests to paginate through results
- Maximum limit is 100 calls per request
- Call participants array shows currently active participants only
- Ended calls include `ended_at` timestamp and final participant count
