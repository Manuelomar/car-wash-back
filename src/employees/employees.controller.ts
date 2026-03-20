import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiExtraModels } from '@nestjs/swagger';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeResponseDto } from './dto/employee-response.dto';
import { ApiStandardResponse, ApiStandardErrorResponse } from '../common/dto/standard-response.dto';

@ApiTags('employees')
@ApiExtraModels(EmployeeResponseDto)
@Controller('employees')
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService) { }

    @Post()
    @HttpCode(201)
    @ApiOperation({ summary: 'Create a new employee' })
    @ApiStandardResponse(201, EmployeeResponseDto, 'Employee created successfully')
    @ApiStandardErrorResponse(400, 'Validation failed')
    create(@Body() dto: CreateEmployeeDto) {
        return this.employeesService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all employees' })
    @ApiStandardResponse(200, EmployeeResponseDto, 'List of employees returned successfully')
    findAll() {
        return this.employeesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a specific employee' })
    @ApiStandardResponse(200, EmployeeResponseDto, 'Employee returned successfully')
    @ApiStandardErrorResponse(404, 'Employee not found')
    findOne(@Param('id') id: string) {
        return this.employeesService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update an employee' })
    @ApiStandardResponse(200, EmployeeResponseDto, 'Employee updated successfully')
    @ApiStandardErrorResponse(404, 'Employee not found')
    update(@Param('id') id: string, @Body() dto: CreateEmployeeDto) {
        return this.employeesService.update(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete an employee' })
    @ApiStandardResponse(200, null, 'Employee deleted successfully')
    @ApiStandardErrorResponse(404, 'Employee not found')
    remove(@Param('id') id: string) {
        return this.employeesService.remove(id);
    }
}
