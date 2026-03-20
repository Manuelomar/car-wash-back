import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiExtraModels } from '@nestjs/swagger';
import { CashRegisterService } from './cash-register.service';
import { CreateCashRegisterDto } from './dto/create-cash-register.dto';
import { CashRegisterResponseDto } from './dto/cash-register-response.dto';
import { ApiStandardResponse, ApiStandardErrorResponse } from '../common/dto/standard-response.dto';

@ApiTags('cash-register')
@ApiExtraModels(CashRegisterResponseDto)
@Controller('cash-register')
export class CashRegisterController {
    constructor(private readonly cashRegisterService: CashRegisterService) { }

    @Post()
    @HttpCode(201)
    @ApiOperation({ summary: 'Open a new cash register session' })
    @ApiStandardResponse(201, CashRegisterResponseDto, 'Cash register session opened successfully')
    @ApiStandardErrorResponse(400, 'Validation failed')
    create(@Body() dto: CreateCashRegisterDto) {
        return this.cashRegisterService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all cash register sessions' })
    @ApiStandardResponse(200, CashRegisterResponseDto, 'List of sessions returned successfully')
    findAll() {
        return this.cashRegisterService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a specific cash register session' })
    @ApiStandardResponse(200, CashRegisterResponseDto, 'Session returned successfully')
    @ApiStandardErrorResponse(404, 'Session not found')
    findOne(@Param('id') id: string) {
        return this.cashRegisterService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Close or update a cash register session' })
    @ApiStandardResponse(200, CashRegisterResponseDto, 'Session updated successfully')
    @ApiStandardErrorResponse(404, 'Session not found')
    update(@Param('id') id: string, @Body() dto: CreateCashRegisterDto) {
        return this.cashRegisterService.update(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a cash register session' })
    @ApiStandardResponse(200, null, 'Session deleted successfully')
    @ApiStandardErrorResponse(404, 'Session not found')
    remove(@Param('id') id: string) {
        return this.cashRegisterService.remove(id);
    }
}
