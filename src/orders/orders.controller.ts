import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiExtraModels } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderResponseDto } from './dto/order-response.dto';
import { ApiStandardResponse, ApiStandardErrorResponse } from '../common/dto/standard-response.dto';

@ApiTags('orders')
@ApiExtraModels(OrderResponseDto)
@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @Post()
    @HttpCode(201)
    @ApiOperation({ summary: 'Create a new order' })
    @ApiStandardResponse(201, OrderResponseDto, 'Order created successfully')
    @ApiStandardErrorResponse(400, 'Validation failed')
    create(@Body() dto: CreateOrderDto) {
        return this.ordersService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all orders' })
    @ApiStandardResponse(200, OrderResponseDto, 'List of orders returned successfully')
    findAll() {
        return this.ordersService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a specific order' })
    @ApiStandardResponse(200, OrderResponseDto, 'Order returned successfully')
    @ApiStandardErrorResponse(404, 'Order not found')
    findOne(@Param('id') id: string) {
        return this.ordersService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update an order' })
    @ApiStandardResponse(200, OrderResponseDto, 'Order updated successfully')
    @ApiStandardErrorResponse(404, 'Order not found')
    update(@Param('id') id: string, @Body() dto: CreateOrderDto) {
        return this.ordersService.update(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete an order' })
    @ApiStandardResponse(200, null, 'Order deleted successfully')
    @ApiStandardErrorResponse(404, 'Order not found')
    remove(@Param('id') id: string) {
        return this.ordersService.remove(id);
    }
}
