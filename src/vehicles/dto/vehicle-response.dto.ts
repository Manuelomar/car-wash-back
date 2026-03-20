import { ApiProperty } from '@nestjs/swagger';

export class VehicleResponseDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'Toyota' })
    brand: string;

    @ApiProperty({ example: 'Corolla' })
    model: string;

    @ApiProperty({ example: '2020' })
    year: string;

    @ApiProperty({ example: 'ABC123' })
    plate: string;

    @ApiProperty({ example: 'Blanco', nullable: true })
    color: string;

    @ApiProperty({ example: 1 })
    customerId: number;
}
