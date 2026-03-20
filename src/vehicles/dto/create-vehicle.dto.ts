import { ApiProperty } from '@nestjs/swagger';

export class CreateVehicleDto {
    @ApiProperty({ example: 'Toyota', description: 'Vehicle brand' })
    brand: string;

    @ApiProperty({ example: 'Corolla', description: 'Vehicle model' })
    model: string;

    @ApiProperty({ example: '2020', description: 'Year of manufacture' })
    year: string;

    @ApiProperty({ example: 'ABC123', description: 'License plate number' })
    plate: string;

    @ApiProperty({ example: 'Blanco', description: 'Vehicle color', required: false })
    color?: string;

    @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', description: 'UUID of the owner (customer)' })
    customerId: string;
}
