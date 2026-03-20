import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Ticket, TicketStatus } from './entities/ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { Service } from '../services/entities/service.entity';
import { Extra } from '../extras/entities/extra.entity';

@Injectable()
export class TicketsService {
    constructor(
        @InjectRepository(Ticket)
        private readonly ticketRepo: Repository<Ticket>,
        @InjectRepository(Service)
        private readonly serviceRepo: Repository<Service>,
        @InjectRepository(Extra)
        private readonly extraRepo: Repository<Extra>,
    ) { }

    async create(dto: CreateTicketDto) {
        const { serviceIds, extraIds, ...rest } = dto;

        // Resolve services and extras
        const services = await this.serviceRepo.findBy({ id: In(serviceIds) });
        let extras: Extra[] = [];
        if (extraIds && extraIds.length > 0) {
            extras = await this.extraRepo.findBy({ id: In(extraIds) });
        }

        // Generate Ticket Number (Simple counter logic)
        const count = await this.ticketRepo.count();
        const ticketNumber = `T-${String(count + 1).padStart(3, '0')}`;

        // Get next position if not provided
        let position = dto.position;
        if (position === undefined) {
            const lastTicket = await this.ticketRepo.findOne({
                where: { status: In([TicketStatus.QUEUED, TicketStatus.PENDING]) },
                order: { position: 'DESC' }
            });
            position = lastTicket ? lastTicket.position + 1 : 1;
        }

        const ticket = this.ticketRepo.create({
            ...rest,
            ticketNumber,
            position,
            services,
            extras,
        });

        return this.ticketRepo.save(ticket);
    }

    async findAll() {
        return this.ticketRepo.find({
            relations: ['customer', 'vehicle', 'services', 'extras'],
            order: { position: 'ASC' }
        });
    }

    async findOne(id: string) {
        const ticket = await this.ticketRepo.findOne({
            where: { id },
            relations: ['customer', 'vehicle', 'services', 'extras'],
        });
        if (!ticket) throw new NotFoundException(`Ticket #${id} not found`);
        return ticket;
    }

    async update(id: string, dto: Partial<CreateTicketDto>) {
        const ticket = await this.findOne(id);
        const { serviceIds, extraIds, ...rest } = dto;

        if (serviceIds) {
            ticket.services = await this.serviceRepo.findBy({ id: In(serviceIds) });
        }
        if (extraIds) {
            ticket.extras = await this.extraRepo.findBy({ id: In(extraIds) });
        }

        Object.assign(ticket, rest);
        await this.ticketRepo.save(ticket);
        return this.findOne(id);
    }

    async remove(id: string) {
        const ticket = await this.findOne(id);
        await this.ticketRepo.delete(id);
        return { deleted: true };
    }
}
