import { Router } from 'express';
import { body, param } from 'express-validator';
import {
  createCall,
  getCall,
  updateCall,
  endCall,
  listCalls,
} from '../controllers/callController';
import { validate } from '../middleware/validator';

const router = Router();

// Validation rules
const createCallValidation = [
  body('callId').notEmpty().withMessage('Call id is required'),
  body('callType').optional().isString(),
  body('createdBy').notEmpty().withMessage('createdBy (user ID) is required'),
  body('members').optional().isArray(),
  body('settings').optional().isObject(),
];

const callParamsValidation = [
  param('callType').notEmpty().withMessage('Call type is required'),
  param('callId').notEmpty().withMessage('Call id is required'),
];

const updateCallValidation = [
  ...callParamsValidation,
  body('settings').optional().isObject(),
];

// Routes
router.get('/', listCalls);
router.post('/', validate(createCallValidation), createCall);
router.get('/:callType/:callId', validate(callParamsValidation), getCall);
router.put('/:callType/:callId', validate(updateCallValidation), updateCall);
router.post('/:callType/:callId/end', validate(callParamsValidation), endCall);

export default router;
