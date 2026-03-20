import { ApiProperty } from '@nestjs/swagger';

export class EmployeeResponseDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'Carlos López' })
    name: string;

    @ApiProperty({ example: 'carlos@carwash.com', nullable: true })
    email: string;

    @ApiProperty({ example: '+58 414 765 4321', nullable: true })
    phone: string;

    @ApiProperty({ example: 'Lavador', nullable: true })
    role: string;
}
