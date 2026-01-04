import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { USER_NOT_FOUND } from '@app/common/constants/exception.code';
import { Users } from '../../../../../libs/entities/src/users.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUser(email: string) {
    const user = await this.userRepository.findOne({
      email,
    });
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }
    return user;
  }

  async findUsers() {
    const user = await this.userRepository.find({});
    // if (!user) {
    //   throw new NotFoundException(USER_NOT_FOUND);
    // }
    return user;
  }

  async createUser(params: { name: string; email: string; password: string }) {
    const { name, email, password } = params;
    const entity = new Users({
      name,
      email,
      password,
    });
    const user = await this.userRepository.create(entity);
    return user;
  }
}
