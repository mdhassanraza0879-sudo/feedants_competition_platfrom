import { Request, Response, NextFunction } from 'express';
import { SubmissionService } from '../services/submissionService';
import { sendSuccess, sendError } from '../utils/apiResponse';

export class SubmissionController {
  public static async submit(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { userId, title, videoUrl, description } = req.body;

      if (!userId) {
        return sendError(res, 'userId is required', 400);
      }
      if (!title || !title.trim()) {
        return sendError(res, 'title is required', 400);
      }
      if (!videoUrl || !videoUrl.trim()) {
        return sendError(res, 'videoUrl is required', 400);
      }

      const submission = await SubmissionService.createSubmission({
        competitionId: id,
        userId,
        title: title.trim(),
        videoUrl: videoUrl.trim(),
        description: description ? description.trim() : undefined
      });

      return sendSuccess(res, submission, 201, 'Submission successfully uploaded!');
    } catch (error) {
      next(error);
    }
  }

  public static async getUserSubmission(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = req.query.userId as string;

      if (!userId) {
        return sendError(res, 'userId query parameter is required', 400);
      }

      const submission = await SubmissionService.getSubmissionByUser(id, userId);
      return sendSuccess(
        res,
        {
          hasSubmitted: !!submission,
          submission
        },
        200,
        'User submission retrieved'
      );
    } catch (error) {
      next(error);
    }
  }
}
