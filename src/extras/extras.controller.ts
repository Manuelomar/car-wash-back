import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiExtraModels } from '@nestjs/swagger';
import { ExtrasService } from './extras.service';
import { CreateExtraDto } from './dto/create-extra.dto';
import { ExtraResponseDto } from './dto/extra-response.dto';
import { ApiStandardResponse, ApiStandardErrorResponse } from '../common/dto/standard-response.dto';

@ApiTags('extras')
@ApiExtraModels(ExtraResponseDto)
@Controller('extras')
export class ExtrasController {
    constructor(private readonly extrasService: ExtrasService) { }

    @Post()
    @HttpCode(201)
    @ApiOperation({ summary: 'Create a new extra' })
    @ApiStandardResponse(201, ExtraResponseDto, 'Extra created successfully')
    @ApiStandardErrorResponse(400, 'Validation failed')
    create(@Body() dto: CreateExtraDto) {
        return this.extrasService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all extras' })
    @ApiStandardResponse(200, ExtraResponseDto, 'List of extras returned successfully')
    findAll() {
        return this.extrasService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a specific extra' })
    @ApiStandardResponse(200, ExtraResponseDto, 'Extra returned successfully')
    @ApiStandardErrorResponse(404, 'Extra not found')
    findOne(@Param('id') id: string) {
        return this.extrasService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update an extra' })
    @ApiStandardResponse(200, ExtraResponseDto, 'Extra updated successfully')
    @ApiStandardErrorResponse(404, 'Extra not found')
    update(@Param('id') id: string, @Body() dto: CreateExtraDto) {
        return this.extrasService.update(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete an extra' })
    @ApiStandardResponse(200, null, 'Extra deleted successfully')
    @ApiStandardErrorResponse(404, 'Extra not found')
    remove(@Param('id') id: string) {
        return this.extrasService.remove(id);
    }
}
