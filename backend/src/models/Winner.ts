import mongoose, { Document, Schema } from 'mongoose';

export interface IWinner extends Document {
  competitionId: mongoose.Types.ObjectId;
  userName: string;
  position: string;
  prizeAmount?: number;
  videoThumbnail: string;
  videoUrl?: string;
  avatarUrl?: string;
  likesCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

const WinnerSchema = new Schema<IWinner>(
  {
    competitionId: { type: Schema.Types.ObjectId, ref: 'Competition', required: true, index: true },
    userName: { type: String, required: true },
    position: { type: String, required: true },
    prizeAmount: { type: Number },
    videoThumbnail: { type: String, required: true },
    videoUrl: { type: String },
    avatarUrl: { type: String },
    likesCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const Winner = mongoose.model<IWinner>('Winner', WinnerSchema);
