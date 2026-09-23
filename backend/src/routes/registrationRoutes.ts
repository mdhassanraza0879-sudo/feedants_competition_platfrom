import { Router } from 'express';
import { RegistrationController } from '../controllers/registrationController';
import { validateObjectId } from '../middleware/validateObjectId';

const router = Router({ mergeParams: true });

// POST /api/competitions/:id/register - Concurrency-safe atomic registration
router.post('/register', validateObjectId('id'), RegistrationController.register);

// GET /api/competitions/:id/registration - Check registration status
router.get('/registration', validateObjectId('id'), RegistrationController.getRegistrationStatus);

export default router;
