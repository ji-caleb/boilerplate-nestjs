import { AppService } from './app.service';
import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { GraphQLError } from 'graphql/error';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(() => String)
  getHello() {
    return this.appService.getHello();
  }

  @Query(() => String)
  getHelloV1() {
    return this.appService.getHelloV1();
  }

  @Query(() => String)
  getHelloV2() {
    return this.appService.getHelloV2();
  }

  @Query(() => String)
  testError() {
    throw new GraphQLError('This is a test error', {
      extensions: { code: 'BAD_USER_INPUT', message: 'This is a test error!' },
    });
  }

  @Query(() => String)
  testErrorV2(@Args('id', { type: () => Int }) id: number) {
    console.log(id);
    return 'test-v2';
  }

  @Query(() => String)
  testErrorV3() {
    throw new Error('CUSTOM ERROR');
  }
}
