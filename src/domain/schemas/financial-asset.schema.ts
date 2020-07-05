import { Schema } from 'mongoose';

export const FinancialAssetsSchema = new Schema({
  // user_id: Number,
  type: String,
  symbol: String,
  buyingPrice: Number,
  quantity: Number,
});
