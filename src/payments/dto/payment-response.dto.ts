import { ApiProperty } from '@nestjs/swagger';

export class PaymentResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    orderId: string;

    @ApiProperty()
    orderCode: string;

    @ApiProperty()
    method: string;

    @ApiProperty()
    amount: number;

    @ApiProperty()
    reference: string;

    @ApiProperty()
    paidAt: Date;

    @ApiProperty()
    cashierId: string;

    @ApiProperty()
    cashierName: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
