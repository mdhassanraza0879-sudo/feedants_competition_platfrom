import mongoose, { Document, Schema } from 'mongoose';

export type RegistrationStatus = 'CONFIRMED' | 'PENDING' | 'CANCELLED';
export type PaymentStatus = 'COMPLETED' | 'PENDING' | 'FAILED';

export interface IRegistration extends Document {
  userId: mongoose.Types.ObjectId;
  competitionId: mongoose.Types.ObjectId;
  status: RegistrationStatus;
  paymentStatus: PaymentStatus;
  amountPaid: number;
  transactionId?: string;
  registeredAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const RegistrationSchema = new Schema<IRegistration>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    competitionId: { type: Schema.Types.ObjectId, ref: 'Competition', required: true },
    status: {
      type: String,
      enum: ['CONFIRMED', 'PENDING', 'CANCELLED'],
      default: 'CONFIRMED'
    },
    paymentStatus: {
      type: String,
      enum: ['COMPLETED', 'PENDING', 'FAILED'],
      default: 'COMPLETED'
    },
    amountPaid: { type: Number, required: true },
    transactionId: { type: String, default: () => `tx_${Date.now()}_${Math.random().toString(36).substring(2, 9)}` },
    registeredAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

// Unique compound index prevents duplicate registrations at the database level
RegistrationSchema.index({ userId: 1, competitionId: 1 }, { unique: true });
RegistrationSchema.index({ competitionId: 1, status: 1 });

export const Registration = mongoose.model<IRegistration>('Registration', RegistrationSchema);
