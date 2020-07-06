import { Schema } from 'mongoose';

export const FinancialAssetsSchema = new Schema({
  type: String,
  symbol: String,
  buyingPrice: Number,
  quantity: Number,
  user_id: Schema.Types.ObjectId,
});
