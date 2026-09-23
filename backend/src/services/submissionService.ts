import mongoose from 'mongoose';
import { Competition } from '../models/Competition';
import { Registration } from '../models/Registration';
import { Submission, ISubmission } from '../models/Submission';

export interface SubmissionPayload {
  competitionId: string;
  userId: string;
  title: string;
  videoUrl: string;
  description?: string;
}

export class SubmissionService {
  public static async createSubmission(
    payload: SubmissionPayload
  ): Promise<ISubmission> {
    const { competitionId, userId, title, videoUrl, description } = payload;

    // 1. Verify competition exists
    const competition = await Competition.findById(competitionId);
    if (!competition) {
      const error: any = new Error('Competition not found.');
      error.statusCode = 404;
      throw error;
    }

    // 2. Verify user registration
    const registration = await Registration.findOne({
      competitionId: new mongoose.Types.ObjectId(competitionId),
      userId: new mongoose.Types.ObjectId(userId),
      status: 'CONFIRMED'
    });

    if (!registration) {
      const error: any = new Error(
        'You must be a confirmed registered participant to submit an entry.'
      );
      error.statusCode = 403;
      throw error;
    }

    // 3. Verify submission window
    const now = new Date();
    if (now < new Date(competition.submissionStart)) {
      const error: any = new Error(
        `Submissions have not started yet. Submission starts at ${competition.submissionStart.toLocaleString()}`
      );
      error.statusCode = 400;
      throw error;
    }

    if (now > new Date(competition.submissionEnd)) {
      const error: any = new Error(
        `Submission window has closed. The deadline was ${competition.submissionEnd.toLocaleString()}`
      );
      error.statusCode = 400;
      throw error;
    }

    // 4. Check for existing submission
    const existingSubmission = await Submission.findOne({
      competitionId: new mongoose.Types.ObjectId(competitionId),
      userId: new mongoose.Types.ObjectId(userId)
    });

    if (existingSubmission) {
      const error: any = new Error(
        'You have already submitted your entry for this competition.'
      );
      error.statusCode = 409;
      throw error;
    }

    // 5. Create submission
    const submission = await Submission.create({
      competitionId: new mongoose.Types.ObjectId(competitionId),
      userId: new mongoose.Types.ObjectId(userId),
      title,
      videoUrl,
      description,
      status: 'SUBMITTED',
      submittedAt: now
    });

    return submission;
  }

  public static async getSubmissionByUser(competitionId: string, userId: string) {
    return Submission.findOne({
      competitionId: new mongoose.Types.ObjectId(competitionId),
      userId: new mongoose.Types.ObjectId(userId)
    });
  }
}
