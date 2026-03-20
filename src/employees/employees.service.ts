import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Injectable()
export class EmployeesService {
    constructor(
        @InjectRepository(Employee)
        private readonly repo: Repository<Employee>,
    ) { }

    create(dto: CreateEmployeeDto) {
        const employee = this.repo.create(dto);
        return this.repo.save(employee);
    }

    findAll() {
        return this.repo.find();
    }

    async findOne(id: string) {
        const employee = await this.repo.findOneBy({ id });
        if (!employee) throw new NotFoundException(`Employee #${id} not found`);
        return employee;
    }

    async update(id: string, dto: Partial<CreateEmployeeDto>) {
        await this.findOne(id);
        await this.repo.update(id, dto);
        return this.findOne(id);
    }

    async remove(id: string) {
        await this.findOne(id);
        await this.repo.delete(id);
        return { deleted: true };
    }
}
