import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'zaimon321@gmail.com' })
  identifier: string;

  @ApiProperty({ example: 'zaimon123' })
  password: string;
}
