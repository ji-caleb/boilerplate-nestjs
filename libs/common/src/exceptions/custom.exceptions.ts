import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(
    message: string,
    public readonly code?: string,
    statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    super(
      {
        message,
        code,
        statusCode,
      },
      statusCode,
    );
  }
}

export class BusinessException extends CustomException {
  constructor(response: { message: string; code: string }) {
    super(response.message, response.code, HttpStatus.BAD_REQUEST);
  }
}
