import { ApiProperty } from '@nestjs/swagger';

export class OrderResponseDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 1 })
    customerId: number;

    @ApiProperty({ example: 1 })
    vehicleId: number;

    @ApiProperty({ example: 1 })
    serviceId: number;

    @ApiProperty({ example: [1, 2], type: [Number], nullable: true })
    extraIds: number[];

    @ApiProperty({ example: 1, nullable: true })
    employeeId: number;

    @ApiProperty({ example: 'pending' })
    status: string;

    @ApiProperty({ example: 17.50 })
    total: number;

    @ApiProperty({ example: 'El cliente solicita dejarlo seco por dentro', nullable: true })
    notes: string;

    @ApiProperty({ example: '2026-03-08T18:00:00.000Z' })
    createdAt: string;
}
