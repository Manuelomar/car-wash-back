import { ApiProperty } from '@nestjs/swagger';

export class CreateCashRegisterDto {
    @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', description: 'UUID of the employee who opened the register', required: false })
    employeeId?: string;

    @ApiProperty({ example: 100.00, description: 'Opening balance at the start of the session', required: false })
    openingBalance?: number;

    @ApiProperty({ example: 'Turno mañana', description: 'Notes for the cash register session', required: false })
    notes?: string;
}
