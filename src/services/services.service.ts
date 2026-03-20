import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entities/service.entity';
import { CreateServiceDto } from './dto/create-service.dto';

@Injectable()
export class ServicesService {
    constructor(
        @InjectRepository(Service)
        private readonly repo: Repository<Service>,
    ) { }

    create(dto: CreateServiceDto) {
        const service = this.repo.create(dto);
        return this.repo.save(service);
    }

    findAll() {
        return this.repo.find();
    }

    async findOne(id: string) {
        const service = await this.repo.findOneBy({ id });
        if (!service) throw new NotFoundException(`Service #${id} not found`);
        return service;
    }

    async update(id: string, dto: Partial<CreateServiceDto>) {
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
