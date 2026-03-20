import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsEnum, IsOptional, IsArray, IsInt } from 'class-validator';
import { TicketStatus } from '../entities/ticket.entity';

export class CreateTicketDto {
    @ApiProperty({ description: 'Customer ID' })
    @IsUUID()
    customerId: string;

    @ApiProperty({ description: 'Vehicle ID' })
    @IsUUID()
    vehicleId: string;

    @ApiProperty({ description: 'List of Service IDs' })
    @IsArray()
    @IsUUID('all', { each: true })
    serviceIds: string[];

    @ApiProperty({ description: 'List of Extra IDs', required: false })
    @IsOptional()
    @IsArray()
    @IsUUID('all', { each: true })
    extraIds?: string[];

    @ApiProperty({ description: 'Ticket Status', enum: TicketStatus, required: false })
    @IsOptional()
    @IsEnum(TicketStatus)
    status?: TicketStatus;

    @ApiProperty({ description: 'Position in queue', required: false })
    @IsOptional()
    @IsInt()
    position?: number;
}
