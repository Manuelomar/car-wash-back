import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomersService {
    constructor(
        @InjectRepository(Customer)
        private readonly repo: Repository<Customer>,
    ) { }

    create(dto: CreateCustomerDto) {
        const customer = this.repo.create(dto);
        return this.repo.save(customer);
    }

    findAll() {
        return this.repo.find();
    }

    async findOne(id: string) {
        const customer = await this.repo.findOneBy({ id });
        if (!customer) throw new NotFoundException(`Customer #${id} not found`);
        return customer;
    }

    async update(id: string, dto: Partial<CreateCustomerDto>) {
        await this.findOne(id);
        await this.repo.update(id, dto);
        return this.findOne(id);
    }

    async remove(id: string) {
        await this.findOne(id);
        await this.repo.delete(id);
        return { deleted: true };
    }
}
