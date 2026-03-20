import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
    @ApiProperty({ example: 'Juan Pérez', description: 'Full name of the customer' })
    name: string;

    @ApiProperty({ example: 'juan@email.com', description: 'Email address' })
    email: string;

    @ApiProperty({ example: '+58 412 123 4567', description: 'Phone number', required: false })
    phone?: string;

    @ApiProperty({ example: 'Av. Bolívar, Caracas', description: 'Address', required: false })
    address?: string;
}
