import { Router, Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import { sendSuccess } from '../utils/apiResponse';

const router = Router();

// GET /api/users - Get all users (useful for selecting active user in the UI/testing)
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    return sendSuccess(res, users, 200, 'Users retrieved successfully');
  } catch (error) {
    next(error);
  }
});

// POST /api/users - Create a new user
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, phone, avatarUrl } = req.body;
    const user = await User.create({ name, email, phone, avatarUrl });
    return sendSuccess(res, user, 201, 'User created successfully');
  } catch (error) {
    next(error);
  }
});

export default router;
