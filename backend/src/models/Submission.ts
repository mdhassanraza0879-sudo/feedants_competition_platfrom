import mongoose, { Document, Schema } from 'mongoose';

export type SubmissionStatus = 'SUBMITTED' | 'UNDER_REVIEW' | 'ACCEPTED' | 'REJECTED';

export interface ISubmission extends Document {
  competitionId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  title: string;
  videoUrl: string;
  description?: string;
  status: SubmissionStatus;
  submittedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const SubmissionSchema = new Schema<ISubmission>(
  {
    competitionId: { type: Schema.Types.ObjectId, ref: 'Competition', required: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true },
    videoUrl: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    status: {
      type: String,
      enum: ['SUBMITTED', 'UNDER_REVIEW', 'ACCEPTED', 'REJECTED'],
      default: 'SUBMITTED'
    },
    submittedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

// Prevent duplicate submission per user per competition
SubmissionSchema.index({ userId: 1, competitionId: 1 }, { unique: true });

export const Submission = mongoose.model<ISubmission>('Submission', SubmissionSchema);
