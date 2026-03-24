import { ApiProperty } from '@nestjs/swagger';

export class PackageResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    serviceIds: string[];

    @ApiProperty()
    extraIds: string[];

    @ApiProperty()
    price: number;

    @ApiProperty()
    active: boolean;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
