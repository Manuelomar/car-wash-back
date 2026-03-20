import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';

@Injectable()
export class VehiclesService {
    constructor(
        @InjectRepository(Vehicle)
        private readonly repo: Repository<Vehicle>,
    ) { }

    create(dto: CreateVehicleDto) {
        const vehicle = this.repo.create(dto);
        return this.repo.save(vehicle);
    }

    findAll() {
        return this.repo.find({ relations: ['customer'] });
    }

    async findOne(id: string) {
        const vehicle = await this.repo.findOne({ where: { id }, relations: ['customer'] });
        if (!vehicle) throw new NotFoundException(`Vehicle #${id} not found`);
        return vehicle;
    }

    async update(id: string, dto: Partial<CreateVehicleDto>) {
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
