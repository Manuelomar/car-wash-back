import { Controller, Get, Post, Body, Param, Delete, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiExtraModels } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentResponseDto } from './dto/payment-response.dto';
import { ApiStandardResponse, ApiStandardErrorResponse } from '../common/dto/standard-response.dto';

@ApiTags('payments')
@ApiExtraModels(PaymentResponseDto)
@Controller('payments')
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) { }

    @Post()
    @HttpCode(201)
    @ApiOperation({ summary: 'Record a new payment' })
    @ApiStandardResponse(201, PaymentResponseDto, 'Payment recorded successfully')
    @ApiStandardErrorResponse(400, 'Validation failed')
    create(@Body() dto: CreatePaymentDto) {
        return this.paymentsService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all payments' })
    @ApiStandardResponse(200, PaymentResponseDto, 'Payments returned successfully')
    findAll() {
        return this.paymentsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a specific payment' })
    @ApiStandardResponse(200, PaymentResponseDto, 'Payment returned successfully')
    @ApiStandardErrorResponse(404, 'Payment not found')
    findOne(@Param('id') id: string) {
        return this.paymentsService.findOne(id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a payment' })
    @ApiStandardResponse(200, null, 'Payment deleted successfully')
    @ApiStandardErrorResponse(404, 'Payment not found')
    remove(@Param('id') id: string) {
        return this.paymentsService.remove(id);
    }
}
