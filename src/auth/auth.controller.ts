import { Controller, Post, Body, UnauthorizedException, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiStandardResponse, ApiStandardErrorResponse } from '../common/dto/standard-response.dto';
import { Public } from './decorators/public.decorator';

@ApiTags('1. Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Login user' })
  @ApiStandardResponse(200, null, 'Login successful')
  @ApiStandardErrorResponse(401, 'Invalid credentials')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.identifier,
      loginDto.password
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const result = await this.authService.login(user);

    return {
      status: 200,
      success: true,
      message: 'Logged in successfully',
      data: result,
      errors: null
    };
  }
}
