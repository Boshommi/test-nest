import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { sign, verify } from 'jsonwebtoken';
import { UserDto, UserRegisterDto } from 'src/users/dto/userRegisterDto.dto';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { SECRET_JWT_KEY } from 'src/const/enviroment';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async registerUser(registerUserDto: UserRegisterDto): Promise<User> {
    const { username, email } = registerUserDto;
    const isUserExsists = await this.checkUserExistence(username, email);
    if (isUserExsists) {
      throw new HttpException(
        'User is already registered',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const jwtRefreshToken = this.generateRefreshToken(username, email);
    const createdUser = new this.userModel(registerUserDto);
    return createdUser.save();
  }

  async checkUserExistence(username, email) {
    const usersArray = await this.userModel.find({
      $or: [{ username }, { email }],
    });
    return usersArray.length !== 0;
  }

  generateAccessToken(username, email) {
    return sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 5,
        data: { email, username },
      },
      SECRET_JWT_KEY,
    );
  }
  generateRefreshToken(username, email) {
    return sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
        data: { email, username },
      },
      SECRET_JWT_KEY,
    );
  }
}
