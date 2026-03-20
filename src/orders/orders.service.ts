import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { Extra } from '../extras/entities/extra.entity';
import { Service } from '../services/entities/service.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepo: Repository<Order>,
        @InjectRepository(Extra)
        private readonly extraRepo: Repository<Extra>,
        @InjectRepository(Service)
        private readonly serviceRepo: Repository<Service>,
    ) { }

    async create(dto: CreateOrderDto) {
        const { extraIds, serviceId, ...rest } = dto;

        let extras: Extra[] = [];
        if (extraIds && extraIds.length > 0) {
            extras = await this.extraRepo.findBy({ id: In(extraIds) });
        }

        const service = await this.serviceRepo.findOneBy({ id: serviceId });
        const extrasTotal = extras.reduce((sum, e) => sum + Number(e.price), 0);
        const total = service ? Number(service.price) + extrasTotal : extrasTotal;

        const order = this.orderRepo.create({ ...rest, serviceId, extras, total });
        return this.orderRepo.save(order);
    }

    findAll() {
        return this.orderRepo.find({
            relations: ['customer', 'vehicle', 'service', 'extras', 'employee'],
        });
    }

    async findOne(id: string) {
        const order = await this.orderRepo.findOne({
            where: { id },
            relations: ['customer', 'vehicle', 'service', 'extras', 'employee'],
        });
        if (!order) throw new NotFoundException(`Order #${id} not found`);
        return order;
    }

    async update(id: string, dto: Partial<CreateOrderDto>) {
        await this.findOne(id);
        const { extraIds, ...rest } = dto;
        if (extraIds) {
            const order = await this.findOne(id);
            order.extras = await this.extraRepo.findBy({ id: In(extraIds) });
            await this.orderRepo.save(order);
        }
        if (Object.keys(rest).length > 0) {
            await this.orderRepo.update(id, rest as any);
        }
        return this.findOne(id);
    }

    async remove(id: string) {
        await this.findOne(id);
        await this.orderRepo.delete(id);
        return { deleted: true };
    }
}
