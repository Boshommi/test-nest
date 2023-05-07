import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserRegisterDto } from '../dto/userRegisterDto.dto';
import { AuthService } from './auth.service';
import { User } from '../schemas/user.schema';

import { FastifyReply } from 'fastify';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() userRegisterDto: UserRegisterDto,
    @Res() res: FastifyReply,
  ) {
    const result = await this.authService.registerUser(userRegisterDto);

    const jwtAccessToken = this.authService.generateAccessToken(
      result.username,
      result.email,
    );

    const jwtRefreshToken = this.authService.generateRefreshToken(
      result.username,
      result.email,
    );

    res.setCookie('jwtRefreshToken', jwtRefreshToken);
    res.setCookie('jwtAccessToken', jwtAccessToken);

    res.send(result);
  }
}
