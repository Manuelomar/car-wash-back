import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiExtraModels } from '@nestjs/swagger';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { InventoryResponseDto } from './dto/inventory-response.dto';
import { ApiStandardResponse, ApiStandardErrorResponse } from '../common/dto/standard-response.dto';

@ApiTags('inventory')
@ApiExtraModels(InventoryResponseDto)
@Controller('inventory')
export class InventoryController {
    constructor(private readonly inventoryService: InventoryService) { }

    @Post()
    @HttpCode(201)
    @ApiOperation({ summary: 'Add an inventory item' })
    @ApiStandardResponse(201, InventoryResponseDto, 'Inventory item added successfully')
    @ApiStandardErrorResponse(400, 'Validation failed')
    create(@Body() dto: CreateInventoryDto) {
        return this.inventoryService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all inventory items' })
    @ApiStandardResponse(200, InventoryResponseDto, 'List of inventory items returned successfully')
    findAll() {
        return this.inventoryService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a specific inventory item' })
    @ApiStandardResponse(200, InventoryResponseDto, 'Inventory item returned successfully')
    @ApiStandardErrorResponse(404, 'Inventory item not found')
    findOne(@Param('id') id: string) {
        return this.inventoryService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update an inventory item' })
    @ApiStandardResponse(200, InventoryResponseDto, 'Inventory item updated successfully')
    @ApiStandardErrorResponse(404, 'Inventory item not found')
    update(@Param('id') id: string, @Body() dto: CreateInventoryDto) {
        return this.inventoryService.update(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete an inventory item' })
    @ApiStandardResponse(200, null, 'Inventory item deleted successfully')
    @ApiStandardErrorResponse(404, 'Inventory item not found')
    remove(@Param('id') id: string) {
        return this.inventoryService.remove(id);
    }
}
