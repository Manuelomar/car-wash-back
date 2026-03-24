import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
    @ApiProperty()
    @IsString()
    orderId: string;

    @ApiProperty()
    @IsString()
    orderCode: string;

    @ApiProperty({ description: '"Cash" | "Card" | "Transfer"' })
    @IsString()
    method: string;

    @ApiProperty()
    @IsNumber()
    amount: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    reference?: string;

    @ApiProperty()
    @IsString()
    cashierId: string;

    @ApiProperty()
    @IsString()
    cashierName: string;
}
