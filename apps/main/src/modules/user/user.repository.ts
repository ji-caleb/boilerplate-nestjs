import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@app/common/abstract/base.respository';
import { Users } from '../../../../../libs/entities/src/users.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository extends BaseRepository<Users> {
  constructor(
    @InjectModel(Users.name)
    model: Model<Users>,
  ) {
    super(model);
  }
}
