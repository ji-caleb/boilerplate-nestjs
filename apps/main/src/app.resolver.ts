import { AppService } from './app.service';
import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(() => String)
  getHello() {
    return this.appService.getHello();
  }
}
