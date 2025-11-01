import { Router } from 'express';
import { handleWebhook } from '../controllers/webhookController';
import { verifyWebhookSignature } from '../middleware/webhook';

const router = Router();

// Webhook endpoint with signature verification
router.post('/', verifyWebhookSignature, handleWebhook);

export default router;
