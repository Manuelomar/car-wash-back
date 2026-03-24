import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
    @ApiProperty({ example: 'Carlos López', description: 'Full name of the employee' })
    fullName: string;

    @ApiProperty({ example: 'carlos@carwash.com', description: 'Employee email address', required: false })
    email?: string;

    @ApiProperty({ example: '+58 414 765 4321', description: 'Employee phone number', required: false })
    phone?: string;

    @ApiProperty({ example: 'Lavador', description: 'Role or job position', required: false })
    role?: string;

    @ApiProperty({ example: true, description: 'Is the employee active', required: false })
    active?: boolean;

    @ApiProperty({ example: 'Percent', description: 'Commission type (Percent, Fixed)', required: false })
    commissionType?: string;

    @ApiProperty({ example: 50, description: 'Commission numeric value', required: false })
    commissionValue?: number;
}
