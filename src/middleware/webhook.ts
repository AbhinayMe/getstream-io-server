import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { config } from '../config/stream';
import { ApiResponse } from '../types';

export const verifyWebhookSignature = (
  req: Request,
  res: Response<ApiResponse>,
  next: NextFunction
) => {
  const signature = req.headers['x-signature'] as string;
  
  if (!signature) {
    return res.status(401).json({
      success: false,
      error: 'Missing webhook signature',
    });
  }

  if (!config.webhook.secret) {
    console.warn('WEBHOOK_SECRET not configured, skipping signature verification');
    return next();
  }

  try {
    const body = JSON.stringify(req.body);
    const expectedSignature = crypto
      .createHmac('sha256', config.webhook.secret)
      .update(body)
      .digest('hex');

    if (signature !== expectedSignature) {
      return res.status(401).json({
        success: false,
        error: 'Invalid webhook signature',
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to verify webhook signature',
    });
  }
};
