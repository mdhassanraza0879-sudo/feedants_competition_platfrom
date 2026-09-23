import mongoose from 'mongoose';
import { Competition, ICompetition } from '../models/Competition';
import { Winner } from '../models/Winner';
import { Reward } from '../models/Reward';
import { Review } from '../models/Review';
import { Registration } from '../models/Registration';
import { Submission } from '../models/Submission';
import { computeCompetitionStatus, ComputedCompetitionDetails } from '../utils/statusCalculator';

export interface CompetitionDetailResponse {
  competition: ICompetition;
  computed: ComputedCompetitionDetails;
  isRegistered: boolean;
  registrationDetails?: any;
  userSubmission?: any;
}

export class CompetitionService {
  public static async getAllCompetitions(): Promise<any[]> {
    const competitions = await Competition.find().sort({ createdAt: -1 });
    return competitions.map((comp) => {
      const computed = computeCompetitionStatus(comp);
      return {
        ...comp.toObject(),
        computed
      };
    });
  }

  public static async getCompetitionById(
    id: string,
    userId?: string
  ): Promise<CompetitionDetailResponse | null> {
    const competition = await Competition.findById(id);
    if (!competition) return null;

    const computed = computeCompetitionStatus(competition);

    let isRegistered = false;
    let registrationDetails = null;
    let userSubmission = null;

    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
      registrationDetails = await Registration.findOne({
        competitionId: competition._id,
        userId: new mongoose.Types.ObjectId(userId),
        status: 'CONFIRMED'
      });
      isRegistered = !!registrationDetails;

      if (isRegistered) {
        userSubmission = await Submission.findOne({
          competitionId: competition._id,
          userId: new mongoose.Types.ObjectId(userId)
        });
      }
    }

    return {
      competition,
      computed,
      isRegistered,
      registrationDetails,
      userSubmission
    };
  }

  public static async getWinnersByCompetitionId(competitionId: string) {
    return Winner.find({ competitionId }).sort({ createdAt: 1 });
  }

  public static async getRewardsByCompetitionId(competitionId: string) {
    return Reward.find({ competitionId }).sort({ rank: 1 });
  }

  public static async getReviewsByCompetitionId(competitionId?: string) {
    const query = competitionId ? { competitionId } : {};
    return Review.find(query).sort({ createdAt: -1 }).limit(20);
  }
}
