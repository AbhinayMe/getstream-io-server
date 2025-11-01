# Webhook Testing with Postman

This guide explains how to properly test the GetStream.io webhook endpoint using Postman with automatic signature generation.

## Prerequisites

1. **Updated Postman Collection**: Make sure you have the latest `GetStream-IO-Server.postman_collection.json` imported
2. **Updated Postman Environment**: Import the latest `GetStream-IO-Server.postman_environment.json`
3. **Webhook Secret**: You must have a `WEBHOOK_SECRET` configured in your `.env` file

## Setup

### Step 1: Configure the WEBHOOK_SECRET in Postman

1. Open Postman and select the **"GetStream.io Server - Local"** environment from the top-right dropdown
2. Click the eye icon next to the environment name to open the environment editor
3. Find the `WEBHOOK_SECRET` variable in the list
4. Enter your `WEBHOOK_SECRET` value from your `.env` file in the **Current value** field:

```
your_webhook_secret_here
```

5. Click **Save**

### Step 2: Understanding the X-Signature Header

The `X-Signature` header is an **HMAC-SHA256 hash** that verifies the webhook request is authentic. It's calculated as:

```
X-Signature = HMAC-SHA256(request_body, WEBHOOK_SECRET)
```

**How it works:**
- The request body (JSON) is hashed using your webhook secret as the key
- This signature proves the webhook came from a trusted source with access to your secret
- The server verifies the signature matches before processing the webhook

### Step 3: How Automatic Signature Generation Works

All webhook requests in the Postman collection now include a **Pre-request Script** that automatically:

1. **Reads** the request body JSON
2. **Gets** the `WEBHOOK_SECRET` from your Postman environment
3. **Generates** the HMAC-SHA256 signature using CryptoJS (built-in to Postman)
4. **Adds** the signature to the `X-Signature` header

You don't need to manually calculate the signature anymore! ✨

## Testing Webhooks

### Testing a Webhook Request

1. Open Postman and navigate to **Webhooks** → **Process Webhook - Call Created** (or any webhook)
2. Make sure your **GetStream.io Server - Local** environment is selected
3. Make sure the server is running (`yarn dev`)
4. Click **Send**

**Expected Response** (200 OK):
```json
{
  "success": true,
  "message": "Webhook received"
}
```

**Check the Console** for debug information:
- Open Postman Console (View → Show Postman Console)
- You should see: `✓ Webhook signature generated and added to X-Signature header`

### Common Webhook Requests Included

1. **Call Created** - Triggered when a new call is created
2. **Call Ended** - Triggered when a call ends
3. **Call Live Started** - Triggered when a call starts
4. **Recording Started** - Triggered when recording begins
5. **Member Added** - Triggered when a participant joins

## Troubleshooting

### Error: "Invalid webhook signature"

**Cause**: The signature doesn't match

**Solutions**:
1. ✅ Verify `WEBHOOK_SECRET` is set in Postman environment
2. ✅ Verify `WEBHOOK_SECRET` in `.env` matches the one in Postman
3. ✅ Ensure you're not modifying the request body after the pre-request script runs
4. ✅ Check that the webhook request hasn't been modified manually

### Error: "Missing webhook signature"

**Cause**: The `X-Signature` header is not being sent

**Solutions**:
1. ✅ Ensure the pre-request script executed (check Postman console)
2. ✅ Make sure `WEBHOOK_SECRET` is not empty in the environment

### Error: "ERROR-NO-SECRET"

**Cause**: The `WEBHOOK_SECRET` environment variable is empty

**Solutions**:
1. ✅ Click the environment dropdown in Postman (top-right)
2. ✅ Click "Edit" next to **"GetStream.io Server - Local"**
3. ✅ Find `WEBHOOK_SECRET` and enter your secret in the **Current value** field
4. ✅ Save and retry

## Manual Signature Generation (If Needed)

If you need to generate a signature manually for any reason:

### Using Node.js

```javascript
const crypto = require('crypto');

const webhookBody = JSON.stringify({
  "type": "call.created",
  "call_cid": "default:call-123",
  "call": {
    "id": "call-123",
    "type": "default"
  }
});

const secret = 'your_webhook_secret';
const signature = crypto
  .createHmac('sha256', secret)
  .update(webhookBody)
  .digest('hex');

console.log('X-Signature:', signature);
```

### Using curl

```bash
BODY='{"type":"call.created","call_cid":"default:call-123","call":{"id":"call-123","type":"default"}}'
SECRET='your_webhook_secret'
SIGNATURE=$(echo -n "$BODY" | openssl dgst -sha256 -hmac "$SECRET" | sed 's/^.* //')
echo "X-Signature: $SIGNATURE"

# Test the webhook
curl -X POST http://localhost:3000/api/webhooks \
  -H "Content-Type: application/json" \
  -H "X-Signature: $SIGNATURE" \
  -d "$BODY"
```

### Using Python

```python
import hmac
import hashlib
import json

webhook_body = json.dumps({
    "type": "call.created",
    "call_cid": "default:call-123",
    "call": {
        "id": "call-123",
        "type": "default"
    }
})

secret = 'your_webhook_secret'
signature = hmac.new(
    secret.encode(),
    webhook_body.encode(),
    hashlib.sha256
).hexdigest()

print(f"X-Signature: {signature}")
```

## Environment Variable Setup

Your `.env` file should contain:

```env
STREAM_API_KEY=your_api_key
STREAM_API_SECRET=your_api_secret
WEBHOOK_SECRET=your_webhook_secret
PORT=3000
```

## Testing Real GetStream.io Webhooks

When you configure webhooks in the GetStream.io dashboard:

1. **Webhook URL**: Point to your server endpoint (e.g., `https://your-domain.com/api/webhooks`)
2. **Signature Verification**: GetStream.io will automatically generate the `X-Signature` header using your secret
3. **No Manual Action Needed**: Your server automatically verifies the signature

## Advanced: Customizing Webhook Payloads

To test different webhook scenarios, you can modify the request body in any webhook request:

1. Navigate to the webhook request
2. Modify the JSON body under the **Body** tab
3. The pre-request script will automatically generate the correct signature for your modified body
4. Send the request

## Security Best Practices

1. ✅ Never commit your `WEBHOOK_SECRET` to version control
2. ✅ Use different secrets for development and production
3. ✅ Rotate your webhook secret periodically
4. ✅ Always verify the signature before processing webhooks
5. ✅ Log all webhook events for debugging and auditing

## See Also

- [Webhook Endpoint Documentation](../api/webhooks/process.md)
- [Webhook Verification Middleware](../../src/middleware/webhook.ts)
- [Webhook Handler Controller](../../src/controllers/webhookController.ts)
