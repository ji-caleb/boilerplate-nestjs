import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { LogLevel } from '@app/common/logger/winston.logger';

// GraphQL Context 타입 정의
export interface GqlContext {
  requestId: string;
  user?: {
    token?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

// RestAPI와 GraphQL의 필드가 달라서 일단 통합
export interface LogContents {
  requestId: string;

  [key: string]: any;
}

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger: Logger;

  constructor() {
    this.logger = new Logger(this.constructor.name);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const gqlHost = GqlExecutionContext.create(context);
    const { requestId, user } = gqlHost.getContext<GqlContext>();
    const token: string | undefined = user?.token;

    const info: GraphQLResolveInfo = gqlHost.getInfo();

    const operationType: string = info.parentType.name;
    const operationName: string = info.fieldName;
    const variableValues: Record<string, unknown> = gqlHost.getArgs();

    const logContents: LogContents = {
      requestId,
      operationType,
      operationName,
      variableValues,
      token,
    };

    this.logger.log({
      level: LogLevel.INFO,
      ...logContents,
      message: '[REQ] Receive a graphQL request.',
    });

    return next.handle().pipe(
      tap({
        next: (_: unknown): void => {
          this.logger.log({
            level: LogLevel.INFO,
            operationType,
            operationName,
            variableValues,
            message: '[RES] Send a graphQL response.',
          });
        },
      }),
    );
  }
}
