import mongoose from 'mongoose';
import { Competition } from '../models/Competition';
import { Registration, IRegistration } from '../models/Registration';
import { User } from '../models/User';
import { computeCompetitionStatus } from '../utils/statusCalculator';

export class RegistrationService {
  /**
   * Registers a user for a competition with concurrency-safe atomic booking.
   * Prevents race conditions, duplicate registrations, and overbooking.
   */
  public static async registerUser(
    competitionId: string,
    userId: string,
    paymentMethod = 'RAZORPAY_DEMO'
  ): Promise<{ registration: IRegistration; competition: any; message: string }> {
    // 1. Validate user
    const user = await User.findById(userId);
    if (!user) {
      const error: any = new Error('User not found. Please log in with a valid account.');
      error.statusCode = 404;
      throw error;
    }

    // 2. Check if competition exists
    const existingCompetition = await Competition.findById(competitionId);
    if (!existingCompetition) {
      const error: any = new Error('Competition not found.');
      error.statusCode = 404;
      throw error;
    }

    // 3. Check for existing registration for this user
    const alreadyRegistered = await Registration.findOne({
      competitionId: new mongoose.Types.ObjectId(competitionId),
      userId: new mongoose.Types.ObjectId(userId)
    });

    if (alreadyRegistered) {
      const error: any = new Error('You are already registered for this competition.');
      error.statusCode = 409;
      throw error;
    }

    // 4. Check deadline
    const now = new Date();
    if (now > new Date(existingCompetition.registrationDeadline)) {
      const error: any = new Error('Registration closed: The deadline for this competition has passed.');
      error.statusCode = 400;
      throw error;
    }

    // 5. ATOMIC RESERVATION:
    // Only increment registeredParticipants IF registeredParticipants is strictly LESS THAN maxParticipants
    // and registrationDeadline is in the future. This is executed atomically by MongoDB.
    const updatedCompetition = await Competition.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(competitionId),
        registeredParticipants: { $lt: existingCompetition.maxParticipants },
        registrationDeadline: { $gt: now }
      },
      {
        $inc: { registeredParticipants: 1 }
      },
      { new: true }
    );

    // If update returned null, the spot was taken or deadline passed concurrently!
    if (!updatedCompetition) {
      const freshComp = await Competition.findById(competitionId);
      if (freshComp && freshComp.registeredParticipants >= freshComp.maxParticipants) {
        const error: any = new Error(
          `Registration is full! All ${freshComp.maxParticipants} spots have been booked.`
        );
        error.statusCode = 409;
        throw error;
      }
      const error: any = new Error('Registration is closed or unavailable.');
      error.statusCode = 400;
      throw error;
    }

    // 6. Create the registration record
    try {
      const registration = await Registration.create({
        userId: new mongoose.Types.ObjectId(userId),
        competitionId: new mongoose.Types.ObjectId(competitionId),
        status: 'CONFIRMED',
        paymentStatus: 'COMPLETED',
        amountPaid: updatedCompetition.entryFee,
        transactionId: `pay_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`
      });

      const computed = computeCompetitionStatus(updatedCompetition);

      return {
        registration,
        competition: {
          ...updatedCompetition.toObject(),
          computed
        },
        message: 'Successfully registered for competition!'
      };
    } catch (err: any) {
      // Rollback the participant count if registration record creation fails
      await Competition.findByIdAndUpdate(competitionId, {
        $inc: { registeredParticipants: -1 }
      });

      if (err.code === 11000) {
        const error: any = new Error('Duplicate registration detected.');
        error.statusCode = 409;
        throw error;
      }
      throw err;
    }
  }

  public static async getRegistration(competitionId: string, userId: string) {
    return Registration.findOne({
      competitionId: new mongoose.Types.ObjectId(competitionId),
      userId: new mongoose.Types.ObjectId(userId)
    }).populate('competitionId', 'title category prizePool entryFee');
  }
}
