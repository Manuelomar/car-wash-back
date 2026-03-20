import { ApiProperty } from '@nestjs/swagger';

export class CreateInventoryDto {
    @ApiProperty({ example: 'Shampoo para autos', description: 'Name of the inventory item' })
    name: string;

    @ApiProperty({ example: 'Litros', description: 'Unit of measure (e.g. Litros, Unidades)', required: false })
    unit?: string;

    @ApiProperty({ example: 50, description: 'Current stock quantity' })
    stock: number;

    @ApiProperty({ example: 10, description: 'Minimum stock threshold for alerts', required: false })
    minStock?: number;

    @ApiProperty({ example: 3.50, description: 'Unit cost of the item', required: false })
    unitCost?: number;
}
