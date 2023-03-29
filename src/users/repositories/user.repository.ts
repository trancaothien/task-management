import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private entity: Model<UserDocument>) {}

  async createOne(user: User): Promise<UserDocument> {
    return await this.entity.create(user);
  }

  async findOneByEmail(email: string): Promise<UserDocument> {
    return await this.entity.findOne({ email: email });
  }

  async findOneById(id: string): Promise<UserDocument> {
    return await this.entity.findById(id);
  }


  async update(user: User): Promise<boolean> {
    return await this.entity.findByIdAndUpdate(user.id, user);
  }
}
