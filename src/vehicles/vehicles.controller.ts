import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiExtraModels } from '@nestjs/swagger';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { VehicleResponseDto } from './dto/vehicle-response.dto';
import { ApiStandardResponse, ApiStandardErrorResponse } from '../common/dto/standard-response.dto';

@ApiTags('vehicles')
@ApiExtraModels(VehicleResponseDto)
@Controller('vehicles')
export class VehiclesController {
    constructor(private readonly vehiclesService: VehiclesService) { }

    @Post()
    @HttpCode(201)
    @ApiOperation({ summary: 'Create a new vehicle' })
    @ApiStandardResponse(201, VehicleResponseDto, 'Vehicle created successfully')
    @ApiStandardErrorResponse(400, 'Validation failed')
    create(@Body() dto: CreateVehicleDto) {
        return this.vehiclesService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all vehicles' })
    @ApiStandardResponse(200, VehicleResponseDto, 'List of vehicles returned successfully')
    findAll() {
        return this.vehiclesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a specific vehicle' })
    @ApiStandardResponse(200, VehicleResponseDto, 'Vehicle returned successfully')
    @ApiStandardErrorResponse(404, 'Vehicle not found')
    findOne(@Param('id') id: string) {
        return this.vehiclesService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a vehicle' })
    @ApiStandardResponse(200, VehicleResponseDto, 'Vehicle updated successfully')
    @ApiStandardErrorResponse(404, 'Vehicle not found')
    update(@Param('id') id: string, @Body() dto: CreateVehicleDto) {
        return this.vehiclesService.update(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a vehicle' })
    @ApiStandardResponse(200, null, 'Vehicle deleted successfully')
    @ApiStandardErrorResponse(404, 'Vehicle not found')
    remove(@Param('id') id: string) {
        return this.vehiclesService.remove(id);
    }
}
