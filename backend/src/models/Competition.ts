import mongoose, { Document, Schema } from 'mongoose';

export type CompetitionStatus =
  | 'UPCOMING'
  | 'REGISTRATION_OPEN'
  | 'REGISTRATION_CLOSED'
  | 'LIVE'
  | 'COMPLETED';

export interface IJudgingParameter {
  parameter: string;
  weightage: number;
  description?: string;
}

export interface IJudge {
  name: string;
  role: string;
  experience: string;
  avatarUrl: string;
  introVideoUrl?: string;
}

export interface ICompetition extends Document {
  title: string;
  category: string;
  type: string;
  certificateProvided: boolean;
  prizePool: number;
  entryFee: number;
  maxParticipants: number;
  registeredParticipants: number;
  registrationStart: Date;
  registrationDeadline: Date;
  submissionStart: Date;
  submissionEnd: Date;
  resultDate: Date;
  judge: IJudge;
  about: string;
  judgingParameters: IJudgingParameter[];
  rules: string[];
  eligibility: string[];
  status: CompetitionStatus;
  disclaimer: string;
  referralLink: string;
  referralReward: number;
  createdAt: Date;
  updatedAt: Date;
}

const JudgingParameterSchema = new Schema<IJudgingParameter>(
  {
    parameter: { type: String, required: true },
    weightage: { type: Number, required: true },
    description: { type: String }
  },
  { _id: false }
);

const JudgeSchema = new Schema<IJudge>(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    experience: { type: String, required: true },
    avatarUrl: { type: String, required: true },
    introVideoUrl: { type: String }
  },
  { _id: false }
);

const CompetitionSchema = new Schema<ICompetition>(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, default: 'Dance' },
    type: { type: String, required: true, default: 'Multi-Win' },
    certificateProvided: { type: Boolean, default: true },
    prizePool: { type: Number, required: true, min: 0 },
    entryFee: { type: Number, required: true, min: 0 },
    maxParticipants: { type: Number, required: true, min: 1 },
    registeredParticipants: { type: Number, default: 0, min: 0 },
    registrationStart: { type: Date, required: true },
    registrationDeadline: { type: Date, required: true },
    submissionStart: { type: Date, required: true },
    submissionEnd: { type: Date, required: true },
    resultDate: { type: Date, required: true },
    judge: { type: JudgeSchema, required: true },
    about: { type: String, required: true },
    judgingParameters: [JudgingParameterSchema],
    rules: [{ type: String }],
    eligibility: [{ type: String }],
    status: {
      type: String,
      enum: ['UPCOMING', 'REGISTRATION_OPEN', 'REGISTRATION_CLOSED', 'LIVE', 'COMPLETED'],
      default: 'REGISTRATION_OPEN'
    },
    disclaimer: {
      type: String,
      default: 'Only contributions from paid participants will be considered for judging.'
    },
    referralLink: { type: String, default: 'https://feedants.com/r/referral123' },
    referralReward: { type: Number, default: 10 }
  },
  { timestamps: true }
);

// Helpful indexes for querying competitions
CompetitionSchema.index({ status: 1 });
CompetitionSchema.index({ category: 1 });
CompetitionSchema.index({ registrationDeadline: 1 });

export const Competition = mongoose.model<ICompetition>('Competition', CompetitionSchema);
