import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isEmpty } from 'lodash';
import { Model } from 'mongoose';
import { FinancialAsset } from '../../domain/financial-asset';
import { Maybe, Record, RecordNotFound } from '../../domain/record';
import { UserService } from '../user/user.service';

@Injectable()
export class FinancialAssetsService {
  constructor(
    @InjectModel('FinancialAssets')
    private readonly financialAssetsModel: Model<FinancialAsset>,
    private userService: UserService,
  ) {}

  async getByUserId(id: string): Promise<Maybe<FinancialAsset[]>> {
    const record = await this.financialAssetsModel
      .find({ user_id: { $eq: id } })
      .exec();
    return !isEmpty(record) ? new Record(record) : new RecordNotFound();
  }

  async addAsset(
    id: string,
    asset: FinancialAsset,
  ): Promise<Maybe<FinancialAsset>> {
    const user = await this.userService.findByID(id);
    if (!user.found) {
      return new RecordNotFound();
    }
    const createdAsset = new this.financialAssetsModel({
      ...asset,
      user_id: user.just._id,
    });
    const record = await createdAsset.save();
    return !isEmpty(record) ? new Record(record) : new RecordNotFound();
  }
}
