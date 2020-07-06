import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isEmpty } from 'lodash';
import { Model } from 'mongoose';
import { FinancialAsset } from '../../domain/financial-asset';
import { Maybe, Record, RecordNotFound } from '../../domain/record';

@Injectable()
export class FinancialAssetsService {
  constructor(
    @InjectModel('FinancialAssets')
    private readonly financialAssetsModel: Model<FinancialAsset>,
  ) {}

  async getByUserId(id: string): Promise<Maybe<FinancialAsset[]>> {
    const record = await this.financialAssetsModel
      .find({ user_id: { $eq: id } })
      .exec();
    return !isEmpty(record) ? new Record(record) : new RecordNotFound();
  }
}
