import { Router } from 'express';
import { body } from 'express-validator';
import { generateToken, generateCallToken } from '../controllers/tokenController';
import { validate } from '../middleware/validator';

const router = Router();

// Generate token validation
const generateTokenValidation = [
  body('userId').notEmpty().withMessage('userId is required'),
  body('callId').optional().isString(),
  body('callType').optional().isString(),
];

// Generate call token validation
const generateCallTokenValidation = [
  body('userId').notEmpty().withMessage('userId is required'),
  body('callId').notEmpty().withMessage('callId is required'),
  body('callType').optional().isString(),
];

// Routes
router.post('/user', validate(generateTokenValidation), generateToken);
router.post('/call', validate(generateCallTokenValidation), generateCallToken);

export default router;
