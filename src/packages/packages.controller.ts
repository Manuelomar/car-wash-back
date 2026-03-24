import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiExtraModels } from '@nestjs/swagger';
import { PackagesService } from './packages.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { PackageResponseDto } from './dto/package-response.dto';
import { ApiStandardResponse, ApiStandardErrorResponse } from '../common/dto/standard-response.dto';

@ApiTags('packages')
@ApiExtraModels(PackageResponseDto)
@Controller('packages')
export class PackagesController {
    constructor(private readonly packagesService: PackagesService) { }

    @Post()
    @HttpCode(201)
    @ApiOperation({ summary: 'Create a new package' })
    @ApiStandardResponse(201, PackageResponseDto, 'Package created successfully')
    @ApiStandardErrorResponse(400, 'Validation failed')
    create(@Body() dto: CreatePackageDto) {
        return this.packagesService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all packages' })
    @ApiStandardResponse(200, PackageResponseDto, 'Packages returned successfully')
    findAll() {
        return this.packagesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a specific package' })
    @ApiStandardResponse(200, PackageResponseDto, 'Package returned successfully')
    @ApiStandardErrorResponse(404, 'Package not found')
    findOne(@Param('id') id: string) {
        return this.packagesService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a package' })
    @ApiStandardResponse(200, PackageResponseDto, 'Package updated successfully')
    @ApiStandardErrorResponse(404, 'Package not found')
    update(@Param('id') id: string, @Body() dto: CreatePackageDto) {
        return this.packagesService.update(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a package' })
    @ApiStandardResponse(200, null, 'Package deleted successfully')
    @ApiStandardErrorResponse(404, 'Package not found')
    remove(@Param('id') id: string) {
        return this.packagesService.remove(id);
    }
}
