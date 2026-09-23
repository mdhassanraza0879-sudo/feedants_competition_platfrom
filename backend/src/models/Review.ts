import mongoose, { Document, Schema } from 'mongoose';

export interface IReview extends Document {
  competitionId?: mongoose.Types.ObjectId;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  competitionTitle?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    competitionId: { type: Schema.Types.ObjectId, ref: 'Competition', index: true },
    userName: { type: String, required: true },
    userAvatar: { type: String, default: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    competitionTitle: { type: String }
  },
  { timestamps: true }
);

export const Review = mongoose.model<IReview>('Review', ReviewSchema);
