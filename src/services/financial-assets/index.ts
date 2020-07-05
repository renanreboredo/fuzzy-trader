import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FinancialAsset } from 'src/domain/financial-asset';

@Injectable()
export class FinancialAssetsService {
  constructor(
    @InjectModel('FinancialAssets')
    private readonly financialAssetsModel: Model<FinancialAsset>,
  ) {}

  async getByUserId(id: number): Promise<FinancialAsset[]> {
    return await this.financialAssetsModel.find().exec();
  }
}
