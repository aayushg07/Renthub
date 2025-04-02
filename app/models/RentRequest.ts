import mongoose, { Schema, Document } from 'mongoose';

export interface IRentRequest extends Document {
  productId: string;
  productName: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  days: number;
  total: number;
  createdAt: Date;
  status: string;
}

const RentRequestSchema: Schema = new Schema(
  {
    productId: { type: String, required: true },
    productName: { type: String, required: false },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    days: { type: Number, required: true },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

const RentRequest =
  mongoose.models.RentRequest ||
  mongoose.model<IRentRequest>('RentRequest', RentRequestSchema);

export default RentRequest;
