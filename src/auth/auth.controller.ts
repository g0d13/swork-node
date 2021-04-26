import { Controller, Body, Post, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtPayload } from './interfaces/payload.interface';
import { AuthGuard } from '@nestjs/passport';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }

  @Get('whoami')
  @UseGuards(AuthGuard('jwt'))
  public async testAuth(@Req() req: any): Promise<JwtPayload> {
    return req.user;
  }
}
