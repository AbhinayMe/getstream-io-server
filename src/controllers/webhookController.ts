import { Request, Response } from 'express';
import { StreamWebhookEvent, ApiResponse } from '../types';

export const handleWebhook = async (
  req: Request<{}, {}, StreamWebhookEvent>,
  res: Response<ApiResponse>
) => {
  try {
    const event = req.body;

    console.log('Received webhook event:', {
      type: event.type,
      call_cid: event.call_cid,
      created_at: event.created_at,
    });

    // Handle different event types
    switch (event.type) {
      case 'call.created':
        console.log('Call created:', event.call_cid);
        // Add your custom logic here
        break;

      case 'call.ended':
        console.log('Call ended:', event.call_cid);
        // Add your custom logic here
        break;

      case 'call.live_started':
        console.log('Call started:', event.call_cid);
        // Add your custom logic here
        break;

      case 'call.member_added':
        console.log('Member added to call:', event.call_cid);
        // Add your custom logic here
        break;

      case 'call.member_removed':
        console.log('Member removed from call:', event.call_cid);
        // Add your custom logic here
        break;

      case 'call.recording_started':
        console.log('Recording started:', event.call_cid);
        // Add your custom logic here
        break;

      case 'call.recording_stopped':
        console.log('Recording stopped:', event.call_cid);
        // Add your custom logic here
        break;

      default:
        console.log('Unhandled event type:', event.type);
    }

    // Acknowledge the webhook
    res.json({
      success: true,
      message: 'Webhook received',
    });
  } catch (error) {
    console.error('Error handling webhook:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to handle webhook',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
