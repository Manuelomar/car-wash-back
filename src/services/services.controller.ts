import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiExtraModels } from '@nestjs/swagger';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { ServiceResponseDto } from './dto/service-response.dto';
import { ApiStandardResponse, ApiStandardErrorResponse } from '../common/dto/standard-response.dto';

@ApiTags('services')
@ApiExtraModels(ServiceResponseDto)
@Controller('services')
export class ServicesController {
    constructor(private readonly servicesService: ServicesService) { }

    @Post()
    @HttpCode(201)
    @ApiOperation({ summary: 'Create a new service' })
    @ApiStandardResponse(201, ServiceResponseDto, 'Service created successfully')
    @ApiStandardErrorResponse(400, 'Validation failed')
    create(@Body() dto: CreateServiceDto) {
        return this.servicesService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all services' })
    @ApiStandardResponse(200, ServiceResponseDto, 'List of services returned successfully')
    findAll() {
        return this.servicesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a specific service' })
    @ApiStandardResponse(200, ServiceResponseDto, 'Service returned successfully')
    @ApiStandardErrorResponse(404, 'Service not found')
    findOne(@Param('id') id: string) {
        return this.servicesService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a service' })
    @ApiStandardResponse(200, ServiceResponseDto, 'Service updated successfully')
    @ApiStandardErrorResponse(404, 'Service not found')
    update(@Param('id') id: string, @Body() dto: CreateServiceDto) {
        return this.servicesService.update(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a service' })
    @ApiStandardResponse(200, null, 'Service deleted successfully')
    @ApiStandardErrorResponse(404, 'Service not found')
    remove(@Param('id') id: string) {
        return this.servicesService.remove(id);
    }
}
