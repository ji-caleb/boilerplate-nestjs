import { Injectable, Logger } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config/dist/config.service';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  private readonly logger: Logger;

  constructor(private readonly nestConfigService: NestConfigService) {
    this.logger = new Logger(this.constructor.name);
  }

  public createMongooseOptions(): MongooseModuleOptions {
    const mongoDB = this.getMongoDB();
    return {
      uri: mongoDB,
      user: this.nestConfigService.get('MONGODB_USERNAME'),
      pass: this.nestConfigService.get('MONGODB_PASSWORD'),
      autoIndex: false,
      onConnectionCreate: (connection: Connection) => {
        connection.on('connected', () =>
          this.logger.log(`MongoDB connected: ${mongoDB}`),
        );

        connection.on('open', () =>
          this.logger.log(`MongoDB open: ${mongoDB}`),
        );

        connection.on('disconnected', () => {
          this.logger.warn(`MongoDB disconnected: ${mongoDB}`);
        });

        connection.on('reconnected', () => {
          this.logger.log(`MongoDB reconnected: ${mongoDB}`);
        });

        connection.on('error', (error) => {
          this.logger.error(
            `MongoDB connection error: ${error}, uri: ${mongoDB}`,
          );
        });

        connection.on('close', () => {
          this.logger.log('MongoDB connection closed');
        });

        return connection;
      },
    };
  }

  private getMongoDB() {
    return (
      'mongodb://' +
      this.nestConfigService.get('MONGODB_URI') +
      '/' +
      this.nestConfigService.get('MONGODB_DATABASE')
    );
  }
}
