import { Router } from 'express';
import { SeedController } from '../controllers/seedController';

const router = Router();

// POST /api/seed - Trigger database seeding
router.post('/', SeedController.seed);

export default router;
