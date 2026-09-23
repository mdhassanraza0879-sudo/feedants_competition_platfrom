import { Request, Response, NextFunction } from 'express';
import { CompetitionService } from '../services/competitionService';
import { sendSuccess, sendError } from '../utils/apiResponse';

export class CompetitionController {
  public static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const competitions = await CompetitionService.getAllCompetitions();
      return sendSuccess(res, competitions, 200, 'Competitions retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  public static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = req.query.userId as string | undefined;

      const result = await CompetitionService.getCompetitionById(id, userId);
      if (!result) {
        return sendError(res, 'Competition not found', 404);
      }

      return sendSuccess(res, result, 200, 'Competition details retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  public static async getWinners(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const winners = await CompetitionService.getWinnersByCompetitionId(id);
      return sendSuccess(res, winners, 200, 'Winners retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  public static async getRewards(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const rewards = await CompetitionService.getRewardsByCompetitionId(id);
      return sendSuccess(res, rewards, 200, 'Rewards retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  public static async getReviews(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const reviews = await CompetitionService.getReviewsByCompetitionId(id);
      return sendSuccess(res, reviews, 200, 'Reviews retrieved successfully');
    } catch (error) {
      next(error);
    }
  }
}
