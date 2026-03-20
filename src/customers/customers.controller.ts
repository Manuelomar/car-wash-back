import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiExtraModels } from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerResponseDto } from './dto/customer-response.dto';
import { ApiStandardResponse, ApiStandardErrorResponse } from '../common/dto/standard-response.dto';

@ApiTags('customers')
@ApiExtraModels(CustomerResponseDto)
@Controller('customers')
export class CustomersController {
    constructor(private readonly customersService: CustomersService) { }

    @Post()
    @HttpCode(201)
    @ApiOperation({ summary: 'Create a new customer' })
    @ApiStandardResponse(201, CustomerResponseDto, 'Customer created successfully')
    @ApiStandardErrorResponse(400, 'Validation failed')
    create(@Body() createCustomerDto: CreateCustomerDto) {
        return this.customersService.create(createCustomerDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all customers' })
    @ApiStandardResponse(200, CustomerResponseDto, 'List of customers returned successfully')
    findAll() {
        return this.customersService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a specific customer' })
    @ApiStandardResponse(200, CustomerResponseDto, 'Customer returned successfully')
    @ApiStandardErrorResponse(404, 'Customer not found')
    findOne(@Param('id') id: string) {
        return this.customersService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a customer' })
    @ApiStandardResponse(200, CustomerResponseDto, 'Customer updated successfully')
    @ApiStandardErrorResponse(404, 'Customer not found')
    update(@Param('id') id: string, @Body() updateCustomerDto: CreateCustomerDto) {
        return this.customersService.update(id, updateCustomerDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a customer' })
    @ApiStandardResponse(200, null, 'Customer deleted successfully')
    @ApiStandardErrorResponse(404, 'Customer not found')
    remove(@Param('id') id: string) {
        return this.customersService.remove(id);
    }
}
