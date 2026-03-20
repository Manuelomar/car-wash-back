import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from './entities/inventory.entity';
import { CreateInventoryDto } from './dto/create-inventory.dto';

@Injectable()
export class InventoryService {
    constructor(
        @InjectRepository(Inventory)
        private readonly repo: Repository<Inventory>,
    ) { }

    create(dto: CreateInventoryDto) {
        const item = this.repo.create(dto);
        return this.repo.save(item);
    }

    findAll() {
        return this.repo.find();
    }

    async findOne(id: string) {
        const item = await this.repo.findOneBy({ id });
        if (!item) throw new NotFoundException(`Inventory item #${id} not found`);
        return item;
    }

    async update(id: string, dto: Partial<CreateInventoryDto>) {
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
