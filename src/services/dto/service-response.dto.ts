import { ApiProperty } from '@nestjs/swagger';

export class ServiceResponseDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'Lavado Completo' })
    name: string;

    @ApiProperty({ example: 'Lavado exterior e interior completo', nullable: true })
    description: string;

    @ApiProperty({ example: 15.00 })
    price: number;

    @ApiProperty({ example: 30, nullable: true })
    durationMinutes: number;
}
