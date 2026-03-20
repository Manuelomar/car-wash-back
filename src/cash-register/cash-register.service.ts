import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CashRegister } from './entities/cash-register.entity';
import { CreateCashRegisterDto } from './dto/create-cash-register.dto';

@Injectable()
export class CashRegisterService {
    constructor(
        @InjectRepository(CashRegister)
        private readonly repo: Repository<CashRegister>,
    ) { }

    create(dto: CreateCashRegisterDto) {
        const session = this.repo.create(dto);
        return this.repo.save(session);
    }

    findAll() {
        return this.repo.find({ relations: ['employee'] });
    }

    async findOne(id: string) {
        const session = await this.repo.findOne({ where: { id }, relations: ['employee'] });
        if (!session) throw new NotFoundException(`Cash register session #${id} not found`);
        return session;
    }

    async update(id: string, dto: Partial<CreateCashRegisterDto>) {
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
