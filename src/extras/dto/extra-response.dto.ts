import { ApiProperty } from '@nestjs/swagger';

export class ExtraResponseDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'Aromatizante' })
    name: string;

    @ApiProperty({ example: 'Aplicación de aromatizante de ambientes', nullable: true })
    description: string;

    @ApiProperty({ example: 2.50 })
    price: number;
}
