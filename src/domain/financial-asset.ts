import { Document } from 'mongoose';

export interface FinancialAsset extends Document {
  // user_id: number;
  type: 'crypto' | 'stock';
  symbol: string;
  buyingPrice: number;
  quantity: number;
}
