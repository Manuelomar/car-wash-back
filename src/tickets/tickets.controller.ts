import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { ApiStandardResponse, ApiStandardErrorResponse } from '../common/dto/standard-response.dto';

@ApiTags('tickets')
@Controller('tickets')
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) { }

    @Post()
    @HttpCode(201)
    @ApiOperation({ summary: 'Create a new ticket' })
    @ApiStandardResponse(201, null, 'Ticket created successfully')
    @ApiStandardErrorResponse(400, 'Validation failed')
    create(@Body() dto: CreateTicketDto) {
        return this.ticketsService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all tickets' })
    @ApiStandardResponse(200, null, 'List of tickets returned successfully')
    findAll() {
        return this.ticketsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a specific ticket' })
    @ApiStandardResponse(200, null, 'Ticket returned successfully')
    @ApiStandardErrorResponse(404, 'Ticket not found')
    findOne(@Param('id') id: string) {
        return this.ticketsService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a ticket' })
    @ApiStandardResponse(200, null, 'Ticket updated successfully')
    @ApiStandardErrorResponse(404, 'Ticket not found')
    update(@Param('id') id: string, @Body() dto: Partial<CreateTicketDto>) {
        return this.ticketsService.update(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a ticket' })
    @ApiStandardResponse(200, null, 'Ticket deleted successfully')
    @ApiStandardErrorResponse(404, 'Ticket not found')
    remove(@Param('id') id: string) {
        return this.ticketsService.remove(id);
    }
}
