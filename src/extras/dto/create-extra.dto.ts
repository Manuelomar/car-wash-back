import { ApiProperty } from '@nestjs/swagger';

export class CreateExtraDto {
    @ApiProperty({ example: 'Aromatizante', description: 'Name of the extra service' })
    name: string;

    @ApiProperty({ example: 'Aplicación de aromatizante de ambientes', description: 'Extra service description', required: false })
    description?: string;

    @ApiProperty({ example: 2.50, description: 'Price of the extra service' })
    price: number;
}
