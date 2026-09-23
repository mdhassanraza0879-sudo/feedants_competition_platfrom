import mongoose, { Document, Schema } from 'mongoose';

export interface IReward extends Document {
  competitionId: mongoose.Types.ObjectId;
  rank: number;
  title: string;
  amount: number;
  icon?: string;
  createdAt: Date;
  updatedAt: Date;
}

const RewardSchema = new Schema<IReward>(
  {
    competitionId: { type: Schema.Types.ObjectId, ref: 'Competition', required: true, index: true },
    rank: { type: Number, required: true },
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    icon: { type: String }
  },
  { timestamps: true }
);

RewardSchema.index({ competitionId: 1, rank: 1 });

export const Reward = mongoose.model<IReward>('Reward', RewardSchema);
