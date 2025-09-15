import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();


    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: any = 'Internal server error';
    let code: string | undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const r = exception.getResponse();
      message = (typeof r === 'string') ? r : (r as any).message ?? r;
    } 
    else if (exception instanceof QueryFailedError) {
        status = HttpStatus.BAD_REQUEST;
        message = (exception as any).message;
        code = (exception as any).code;
    } 
    else if (exception instanceof Error) {
      message = exception.message;
    }

    this.logger.error(
      `${req.method} ${req.url} -> ${status} | 
      ${typeof message === 'string' ? 
        message : JSON.stringify(message)}`,
    );

    res.status(status).json({
      statusCode: status,
      error: HttpStatus[status],
      message,
      path: req.url,
      timestamp: new Date().toISOString(),
      code,
    });
  }
}
