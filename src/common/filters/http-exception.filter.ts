import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

export interface HttpExceptionResponse {
  statusCode: number;
  message: string;
  error?: string;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Handle exception response safely
    let exceptionResponse: any = {};
    if (exception instanceof HttpException) {
      exceptionResponse = exception.getResponse();
    } else if (typeof exception === 'object' && exception !== null) {
      exceptionResponse = exception;
    }

    const message =
      exceptionResponse?.message ||
      exceptionResponse?.error ||
      'Internal server error';

    const responseBody = {
      statusCode: httpStatus,
      timeStamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message,
    };

    console.error('Exception:', exception);

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
