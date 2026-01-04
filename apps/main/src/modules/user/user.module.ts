import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserResolver } from './user.resolver';
import { UserRepository } from './user.repository';
import {
  Users,
  UsersSchema,
} from '../../../../../libs/entities/src/users.entity';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Users.name,
        schema: UsersSchema,
        collection: Users.name,
      },
    ]),
  ],
  providers: [UserResolver, UserRepository, UserService],
  exports: [],
})
export class UserModule {}
