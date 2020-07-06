import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isEmpty } from 'lodash';
import { Model } from 'mongoose';
import { Maybe, Record, RecordNotFound } from '../../domain/record';
import { User } from '../../domain/user';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
  ) {}

  async findOne(username: string): Promise<Maybe<User>> {
    const user = await this.userModel
      .findOne({ username: { $eq: username } })
      .exec();
    return !isEmpty(user) ? new Record(user) : new RecordNotFound();
  }

  async findByID(id: string): Promise<Maybe<User>> {
    const user = await this.userModel.findOne({ _id: { $eq: id } }).exec();
    return !isEmpty(user) ? new Record(user) : new RecordNotFound();
  }

  async create(user: User) {
    const createdUser = new this.userModel(user);
    return await createdUser.save();
  }
}
