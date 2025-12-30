import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppResolver } from './app.resolver';
import { MongooseConfigService } from '@app/common/configs/mongoose.config';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { LogLevel } from '@app/common/logger/winston.logger';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useClass: MongooseConfigService,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: false,
      introspection: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
      formatError: (error) => {
        if (!error.extensions?.logged) {
          const logger = new Logger('GraphQLError');
          logger.error({
            level: LogLevel.ERROR,
            message: error.message,
            code: error.extensions?.code,
            stack: error.extensions?.stacktrace,
          });
        }

        return {
          message: error.message,
          path: error.path,
          extensions: {
            code: error.extensions?.code,
            statusCode: error.extensions?.statusCode ?? 400,
            message: error.message,
            ...(process.env.NODE_ENV === 'development' && {
              stack: error.extensions?.stack ?? error.extensions?.stacktrace,
            }),
          },
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
