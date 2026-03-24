import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
    @ApiProperty({ example: 'Juan Pérez', description: 'Full name of the customer' })
    fullName: string;

    @ApiProperty({ example: 'juan@email.com', description: 'Email address' })
    email: string;

    @ApiProperty({ example: '+58 412 123 4567', description: 'Phone number', required: false })
    phone?: string;

    @ApiProperty({ example: '123456789', description: 'Document ID / Cedula', required: false })
    documentId?: string;

    @ApiProperty({ example: true, description: 'Active status', required: false })
    active?: boolean;
}
