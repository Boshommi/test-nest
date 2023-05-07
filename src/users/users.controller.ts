import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from 'src/users/dto/userRegisterDto.dto';

@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  goga(@Body() userRegisterDto: UserDto): string {
    console.log(userRegisterDto);
    return 'Idi na otsuda';
  }

  @Get('register')
  register(@Body() userRegisterDto: UserDto): string {
    console.log(userRegisterDto);
    return 'Idi na otsuda';
  }
}
