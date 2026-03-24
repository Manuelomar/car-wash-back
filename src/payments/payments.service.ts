import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentsService {
    constructor(
        @InjectRepository(Payment)
        private readonly paymentRepo: Repository<Payment>,
    ) { }

    async create(dto: CreatePaymentDto) {
        const payment = this.paymentRepo.create(dto);
        await this.paymentRepo.save(payment);
        return {
            status: 201,
            success: true,
            message: 'Payment created successfully',
            data: payment,
            errors: null,
        };
    }

    async findAll() {
        const data = await this.paymentRepo.find();
        return {
            status: 200,
            success: true,
            message: 'Payments retrieved successfully',
            data,
            errors: null,
        };
    }

    async findOne(id: string) {
        const payment = await this.paymentRepo.findOne({ where: { id } });
        if (!payment) {
            throw new NotFoundException(`Payment #${id} not found`);
        }
        return {
            status: 200,
            success: true,
            message: 'Payment retrieved successfully',
            data: payment,
            errors: null,
        };
    }

    async remove(id: string) {
        const payment = await this.paymentRepo.findOne({ where: { id } });
        if (!payment) {
            throw new NotFoundException(`Payment #${id} not found`);
        }
        await this.paymentRepo.remove(payment);
        return {
            status: 200,
            success: true,
            message: 'Payment deleted successfully',
            data: null,
            errors: null,
        };
    }
}
