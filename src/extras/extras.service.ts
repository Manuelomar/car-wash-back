import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Extra } from './entities/extra.entity';
import { CreateExtraDto } from './dto/create-extra.dto';

@Injectable()
export class ExtrasService {
    constructor(
        @InjectRepository(Extra)
        private readonly repo: Repository<Extra>,
    ) { }

    create(dto: CreateExtraDto) {
        const extra = this.repo.create(dto);
        return this.repo.save(extra);
    }

    findAll() {
        return this.repo.find();
    }

    async findOne(id: string) {
        const extra = await this.repo.findOneBy({ id });
        if (!extra) throw new NotFoundException(`Extra #${id} not found`);
        return extra;
    }

    async update(id: string, dto: Partial<CreateExtraDto>) {
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
