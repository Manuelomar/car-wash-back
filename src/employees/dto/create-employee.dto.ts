import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
    @ApiProperty({ example: 'Carlos López', description: 'Full name of the employee' })
    name: string;

    @ApiProperty({ example: 'carlos@carwash.com', description: 'Employee email address', required: false })
    email?: string;

    @ApiProperty({ example: '+58 414 765 4321', description: 'Employee phone number', required: false })
    phone?: string;

    @ApiProperty({ example: 'Lavador', description: 'Role or job position', required: false })
    role?: string;
}
