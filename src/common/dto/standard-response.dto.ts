import { ApiProperty } from '@nestjs/swagger';
import { applyDecorators, Type } from '@nestjs/common';
import { ApiResponse, getSchemaPath } from '@nestjs/swagger';

export class StandardResponseDto<T> {
    @ApiProperty({ example: 200 })
    status: number;

    @ApiProperty({ example: true })
    success: boolean;

    @ApiProperty({ example: 'Operation successful' })
    message: string;

    data: T;

    @ApiProperty({ example: null, nullable: true })
    errors: any;
}

/**
 * Helper to generate a Swagger @ApiResponse decorator with the standard
 * response format: { status, success, message, data, errors }
 *
 * Usage:
 *  @ApiStandardResponse(201, CustomerDto, 'Customer created successfully')
 */
export function ApiStandardResponse(
    statusCode: number,
    dataType: Type<any> | null,
    description: string,
) {
    const dataSchema = dataType
        ? { $ref: getSchemaPath(dataType) }
        : { type: 'object', nullable: true, example: null };

    return applyDecorators(
        ApiResponse({
            status: statusCode,
            description,
            schema: {
                type: 'object',
                properties: {
                    status: { type: 'number', example: statusCode },
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: description },
                    data: dataSchema,
                    errors: { type: 'object', nullable: true, example: null },
                },
            },
        }),
    );
}

/**
 * Helper to generate a Swagger @ApiResponse decorator for error responses
 */
export function ApiStandardErrorResponse(statusCode: number, description: string) {
    return applyDecorators(
        ApiResponse({
            status: statusCode,
            description,
            schema: {
                type: 'object',
                properties: {
                    status: { type: 'number', example: statusCode },
                    success: { type: 'boolean', example: false },
                    message: { type: 'string', example: description },
                    data: { type: 'object', nullable: true, example: null },
                    errors: {
                        type: 'array',
                        example: ['Detail of what went wrong'],
                    },
                },
            },
        }),
    );
}
