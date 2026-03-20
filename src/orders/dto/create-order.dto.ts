import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
    @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', description: 'UUID of the customer' })
    customerId: string;

    @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', description: 'UUID of the vehicle' })
    vehicleId: string;

    @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', description: 'UUID of the wash service' })
    serviceId: string;

    @ApiProperty({ example: ['a1b2c3d4-e5f6-7890-abcd-ef1234567890'], description: 'List of extra service UUIDs', required: false, type: [String] })
    extraIds?: string[];

    @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', description: 'UUID of the employee who attends the order', required: false })
    employeeId?: string;

    @ApiProperty({ example: 'El cliente solicita dejarlo seco por dentro', description: 'Additional notes', required: false })
    notes?: string;
}
