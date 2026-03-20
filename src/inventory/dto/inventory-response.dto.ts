import { ApiProperty } from '@nestjs/swagger';

export class InventoryResponseDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'Shampoo para autos' })
    name: string;

    @ApiProperty({ example: 'Litros', nullable: true })
    unit: string;

    @ApiProperty({ example: 50 })
    stock: number;

    @ApiProperty({ example: 10, nullable: true })
    minStock: number;

    @ApiProperty({ example: 3.50, nullable: true })
    unitCost: number;
}
