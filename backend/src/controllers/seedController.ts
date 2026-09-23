import { Request, Response, NextFunction } from 'express';
import { seedDatabase } from '../seeds/seedData';
import { sendSuccess } from '../utils/apiResponse';

export class SeedController {
  public static async seed(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await seedDatabase();
      return sendSuccess(
        res,
        {
          competitionId: result.competition._id,
          registeredUserId: result.registeredUser._id,
          newUserId: result.newUser._id,
          title: result.competition.title
        },
        200,
        'Database successfully seeded with demo competition and users!'
      );
    } catch (error) {
      next(error);
    }
  }
}
