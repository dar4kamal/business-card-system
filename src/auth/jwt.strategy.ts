import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtPayloadDTO } from './dto/jwt.payload.dto';
import { User, UserDocument } from '../user/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromHeader('x-auth-token'),
    });
  }

  async validate(payload: JwtPayloadDTO): Promise<User> {
    const { email } = payload;
    const user = await this.userModel.findOne({ email });

    if (!user) throw new UnauthorizedException();
    return user;
  }
}
