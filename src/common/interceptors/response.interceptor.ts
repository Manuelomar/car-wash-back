import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  status: number;
  success: boolean;
  message: string;
  data: T;
  errors: any;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const status = response.statusCode;

    return next.handle().pipe(
      map(data => {
        // If the data already contains the standardized format properties, use them
        if (data && typeof data === 'object' && ('message' in data || 'data' in data)) {
          return {
            status,
            success: true,
            message: data.message || 'Operation successful',
            data: data.data !== undefined ? data.data : (data.message ? null : data),
            errors: null,
          };
        }

        // If the return value is just a string, treat it as the message
        if (typeof data === 'string') {
            return {
              status,
              success: true,
              message: data,
              data: null,
              errors: null,
            };
        }

        // Default case: wrap the whole returned object in 'data'
        return {
          status,
          success: true,
          message: 'Operation successful',
          data: data || null,
          errors: null,
        };
      }),
    );
  }
}
