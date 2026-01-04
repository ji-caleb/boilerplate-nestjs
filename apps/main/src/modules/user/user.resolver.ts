import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserInput } from './dto/user.input.dto';
import { UserOutput } from './dto/user.output.dto';
import { CreateUserInput } from './dto/create-user.input';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserOutput)
  findUser(
    @Args('findUser')
    input: UserInput,
  ) {
    return this.userService.findUser(input.email);
  }

  @Query(() => [UserOutput])
  findUsers() {
    return this.userService.findUsers();
  }

  @Mutation(() => UserOutput)
  creatUser(
    @Args('createUser')
    input: CreateUserInput,
  ) {
    const { name, email, password } = input;
    return this.userService.createUser({
      name,
      email,
      password,
    });
  }
}
