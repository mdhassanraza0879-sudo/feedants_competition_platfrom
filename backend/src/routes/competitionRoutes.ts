import { Router } from 'express';
import { CompetitionController } from '../controllers/competitionController';
import { validateObjectId } from '../middleware/validateObjectId';

const router = Router();

// GET /api/competitions - List all competitions
router.get('/', CompetitionController.getAll);

// GET /api/competitions/:id - Get single competition with dynamic status & computed fields
router.get('/:id', validateObjectId('id'), CompetitionController.getById);

// GET /api/competitions/:id/winners - Get previous winners for competition
router.get('/:id/winners', validateObjectId('id'), CompetitionController.getWinners);

// GET /api/competitions/:id/rewards - Get reward breakdown
router.get('/:id/rewards', validateObjectId('id'), CompetitionController.getRewards);

// GET /api/competitions/:id/reviews - Get reviews
router.get('/:id/reviews', validateObjectId('id'), CompetitionController.getReviews);

export default router;
