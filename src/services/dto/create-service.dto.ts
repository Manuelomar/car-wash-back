import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceDto {
    @ApiProperty({ example: 'Lavado Completo', description: 'Name of the wash service' })
    name: string;

    @ApiProperty({ example: 'Lavado exterior e interior completo', description: 'Service description', required: false })
    description?: string;

    @ApiProperty({ example: 15.00, description: 'Price of the service' })
    price: number;

    @ApiProperty({ example: 30, description: 'Estimated duration in minutes', required: false })
    durationMinutes?: number;
}
