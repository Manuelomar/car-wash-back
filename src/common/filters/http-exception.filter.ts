import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

// PostgreSQL error codes
const PG_UNIQUE_VIOLATION = '23505';
const PG_FOREIGN_KEY_VIOLATION = '23503';
const PG_NOT_NULL_VIOLATION = '23502';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Error interno del servidor';
        let errors: string[] = ['Ocurrió un error inesperado'];

        if (exception instanceof HttpException) {
            // NestJS built-in exceptions (NotFoundException, BadRequestException, etc.)
            status = exception.getStatus();
            const exceptionResponse = exception.getResponse();

            if (typeof exceptionResponse === 'string') {
                message = exceptionResponse;
                errors = [exceptionResponse];
            } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
                const resp = exceptionResponse as any;
                message = Array.isArray(resp.message) ? resp.message[0] : (resp.message || message);
                errors = Array.isArray(resp.message) ? resp.message : [message];
            }
        } else if (exception instanceof QueryFailedError) {
            // TypeORM / PostgreSQL database errors — never expose raw SQL
            const pgCode = (exception as any).code as string;

            if (pgCode === PG_UNIQUE_VIOLATION) {
                status = HttpStatus.CONFLICT;
                // Extract the field name from the detail message if available
                const detail: string = (exception as any).detail ?? '';
                const field = detail.match(/Key \((.+?)\)=/)?.[1] ?? 'campo';
                message = `Ya existe un registro con este ${field}`;
                errors = [message];
            } else if (pgCode === PG_FOREIGN_KEY_VIOLATION) {
                status = HttpStatus.BAD_REQUEST;
                message = 'Recurso relacionado no encontrado';
                errors = [message];
            } else if (pgCode === PG_NOT_NULL_VIOLATION) {
                status = HttpStatus.BAD_REQUEST;
                const column: string = (exception as any).column ?? 'campo';
                message = `El campo "${column}" es requerido`;
                errors = [message];
            } else {
                // Generic DB error — log internally but return a safe message
                console.error('[DB Error]', exception.message);
                message = 'Error de base de datos';
                errors = ['Ocurrió un error al procesar su solicitud'];
            }
        } else if (exception instanceof Error) {
            // Other unexpected errors — don't expose internals
            console.error('[Unhandled Error]', exception);
            message = 'Error interno del servidor';
            errors = ['Ocurrió un error inesperado'];
        }

        response.status(status).json({
            status,
            success: false,
            message,
            data: null,
            errors,
        });
    }
}
