import { Router } from 'express';
import { body, param } from 'express-validator';
import {
  listUsers,
  createUser,
  updateUser,
  getUser,
  deleteUser,
} from '../controllers/userController';
import { validate } from '../middleware/validator';

const router = Router();

// Validation rules
const createUserValidation = [
  body('id').notEmpty().withMessage('User id is required'),
  body('name').optional().isString(),
  body('image').optional().isURL().withMessage('Image must be a valid URL'),
  body('role').optional().isString(),
  body('custom').optional().isObject(),
];

const updateUserValidation = [
  param('userId').notEmpty().withMessage('User id is required'),
  body('name').optional().isString(),
  body('image').optional().isURL().withMessage('Image must be a valid URL'),
  body('custom').optional().isObject(),
];

const userIdValidation = [
  param('userId').notEmpty().withMessage('User id is required'),
];

// Routes
router.get('/', listUsers);
router.post('/', validate(createUserValidation), createUser);
router.put('/:userId', validate(updateUserValidation), updateUser);
router.get('/:userId', validate(userIdValidation), getUser);
router.delete('/:userId', validate(userIdValidation), deleteUser);

export default router;
