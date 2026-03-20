import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { Ticket } from './entities/ticket.entity';
import { Service } from '../services/entities/service.entity';
import { Extra } from '../extras/entities/extra.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Ticket, Service, Extra])],
    controllers: [TicketsController],
    providers: [TicketsService],
    exports: [TicketsService]
})
export class TicketsModule { }
