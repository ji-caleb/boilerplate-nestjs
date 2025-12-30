import { Injectable, NotFoundException } from '@nestjs/common';
import { BusinessException } from '@app/common/exceptions/custom.exceptions';

@Injectable()
export class AppService {
  getHello(): string {
    throw new NotFoundException(NOT_FOUND_RESOURCE_V1);
  }

  getHelloV1(): string {
    throw new NotFoundException(NOT_FOUND_RESOURCE);
  }

  getHelloV2(): string {
    throw new BusinessException(EMAIL_IS_ALREADY_REGISTERED);
  }
}

export const EMAIL_IS_ALREADY_REGISTERED = {
  message: 'Email is already registered.',
  code: 'EMAIL_IS_ALREADY_REGISTERED',
};
export const NOT_FOUND_RESOURCE = 'Not found resource.';
export const NOT_FOUND_RESOURCE_V1 = {
  message: 'Not found resource.',
  code: 'RESOURCE_NOT_FOUND',
};
