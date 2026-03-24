import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Package } from './entities/package.entity';
import { CreatePackageDto } from './dto/create-package.dto';

@Injectable()
export class PackagesService {
    constructor(
        @InjectRepository(Package)
        private readonly packageRepo: Repository<Package>,
    ) { }

    async create(dto: CreatePackageDto) {
        const pkg = this.packageRepo.create(dto);
        await this.packageRepo.save(pkg);
        return {
            status: 201,
            success: true,
            message: 'Package created successfully',
            data: pkg,
            errors: null,
        };
    }

    async findAll() {
        const data = await this.packageRepo.find();
        return {
            status: 200,
            success: true,
            message: 'Packages retrieved successfully',
            data,
            errors: null,
        };
    }

    async findOne(id: string) {
        const pkg = await this.packageRepo.findOne({ where: { id } });
        if (!pkg) {
            throw new NotFoundException(`Package #${id} not found`);
        }
        return {
            status: 200,
            success: true,
            message: 'Package retrieved successfully',
            data: pkg,
            errors: null,
        };
    }

    async update(id: string, dto: CreatePackageDto) {
        const pkg = await this.packageRepo.preload({
            id,
            ...dto,
        });
        if (!pkg) {
            throw new NotFoundException(`Package #${id} not found`);
        }
        await this.packageRepo.save(pkg);
        return {
            status: 200,
            success: true,
            message: 'Package updated successfully',
            data: pkg,
            errors: null,
        };
    }

    async remove(id: string) {
        const pkg = await this.packageRepo.findOne({ where: { id } });
        if (!pkg) {
            throw new NotFoundException(`Package #${id} not found`);
        }
        await this.packageRepo.remove(pkg);
        return {
            status: 200,
            success: true,
            message: 'Package deleted successfully',
            data: null,
            errors: null,
        };
    }
}
