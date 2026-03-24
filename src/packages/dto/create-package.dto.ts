import { IsString, IsNumber, IsBoolean, IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePackageDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsArray()
    @IsString({ each: true })
    serviceIds: string[];

    @ApiProperty()
    @IsArray()
    @IsString({ each: true })
    extraIds: string[];

    @ApiProperty()
    @IsNumber()
    price: number;

    @ApiProperty({ required: false, default: true })
    @IsOptional()
    @IsBoolean()
    active?: boolean;
}
