import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';
import { Prisma } from '@prisma/client';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const responseMessage = (exceptionResponse as { message?: string | string[] }).message;
        message = Array.isArray(responseMessage) ? responseMessage.join(', ') : responseMessage ?? exception.message;
      }
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      if (exception.code === 'P2025') {
        status = HttpStatus.NOT_FOUND;
        message = 'Resource not found';
      } else if (exception.code === 'P2002') {
        status = HttpStatus.CONFLICT;
        message = 'A record with this value already exists';
      } else {
        status = HttpStatus.BAD_REQUEST;
        message = 'Database request error';
      }
    } else if (exception instanceof Error) {
      this.logger.error(exception.message, exception.stack);
      message = exception.message;
    }

    response.status(status).json({
      success: false,
      message,
      data: null,
    });
  }
}
