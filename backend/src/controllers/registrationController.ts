import { Request, Response, NextFunction } from 'express';
import { RegistrationService } from '../services/registrationService';
import { sendSuccess, sendError } from '../utils/apiResponse';

export class RegistrationController {
  public static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { userId, paymentMethod } = req.body;

      if (!userId) {
        return sendError(res, 'userId is required in the request body', 400);
      }

      const result = await RegistrationService.registerUser(id, userId, paymentMethod);
      return sendSuccess(res, result, 201, result.message);
    } catch (error: any) {
      next(error);
    }
  }

  public static async getRegistrationStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = req.query.userId as string;

      if (!userId) {
        return sendError(res, 'userId query parameter is required', 400);
      }

      const registration = await RegistrationService.getRegistration(id, userId);
      return sendSuccess(
        res,
        {
          isRegistered: !!registration,
          registration
        },
        200,
        'Registration status checked'
      );
    } catch (error) {
      next(error);
    }
  }
}
