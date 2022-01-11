import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';

import { Model } from 'mongoose';

import { User, UserDocument } from '../user/user.schema';
import { AuthCredentialsDTO } from './dto/auth-credentilas.dto';

import { checkPassword } from '../utility/passwordUtils';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async login(authCredentials: AuthCredentialsDTO) {
    const { email, password } = authCredentials;
    const user = await this.userModel.findOne({ email });

    if (!user || !checkPassword(password, user.password))
      throw new BadRequestException('Invalid Credentials');

    const accessToken: string = this.jwtService.sign({ email, id: user.id });
    return accessToken;
  }
}
