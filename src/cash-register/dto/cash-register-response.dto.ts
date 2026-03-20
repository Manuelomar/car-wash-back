import { ApiProperty } from '@nestjs/swagger';

export class CashRegisterResponseDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 1, nullable: true })
    employeeId: number;

    @ApiProperty({ example: 100.00 })
    openingBalance: number;

    @ApiProperty({ example: null, nullable: true })
    closingBalance: number;

    @ApiProperty({ example: 'open' })
    status: string;

    @ApiProperty({ example: 'Turno mañana', nullable: true })
    notes: string;

    @ApiProperty({ example: '2026-03-08T08:00:00.000Z' })
    openedAt: string;

    @ApiProperty({ example: null, nullable: true })
    closedAt: string;
}
