import { IsEmail, IsNotEmpty } from 'class-validator';
import { OmitType, PickType } from '@nestjs/mapped-types';

export class UserDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  jwtRefreshToken: string;
}

export class UserUpdateDto extends PickType(UserDto, ['username'] as const) {}

export class UserRegisterDto extends OmitType(UserDto, [
  'jwtRefreshToken',
] as const) {}
