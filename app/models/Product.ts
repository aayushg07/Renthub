import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category?: string;
  rentPerDay?: number;
}

const productSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String },
  category: { type: String },
  rentPerDay: { type: Number },
});

const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema);

export default Product;