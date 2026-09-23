import { Router } from 'express';
import { SubmissionController } from '../controllers/submissionController';
import { validateObjectId } from '../middleware/validateObjectId';

const router = Router({ mergeParams: true });

// POST /api/competitions/:id/submissions - Submit entry
router.post('/submissions', validateObjectId('id'), SubmissionController.submit);

// GET /api/competitions/:id/submissions - Get user submission
router.get('/submissions', validateObjectId('id'), SubmissionController.getUserSubmission);

export default router;
