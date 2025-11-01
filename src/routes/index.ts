import { Router } from 'express';
import tokenRoutes from './tokenRoutes';
import userRoutes from './userRoutes';
import callRoutes from './callRoutes';
import webhookRoutes from './webhookRoutes';

const router = Router();

// Mount routes
router.use('/tokens', tokenRoutes);
router.use('/users', userRoutes);
router.use('/calls', callRoutes);
router.use('/webhooks', webhookRoutes);

export default router;
