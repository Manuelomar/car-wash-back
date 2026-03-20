import { ApiProperty } from '@nestjs/swagger';

export class CustomerResponseDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'Juan Pérez' })
    name: string;

    @ApiProperty({ example: 'juan@email.com' })
    email: string;

    @ApiProperty({ example: '+58 412 123 4567', nullable: true })
    phone: string;

    @ApiProperty({ example: 'Av. Bolívar, Caracas', nullable: true })
    address: string;
}
