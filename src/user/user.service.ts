import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import {
  hashPassword,
  checkPassword,
  generatePassword,
} from '../utility/passwordUtils';
import { UserRoles } from '../utility/types';

import CreateUserDTO from './dto/create-user.dto';
import UpdateUserDTO from './dto/update-info.dto';
import UpdateUserCredentialsDTO from './dto/update-credentials.dto';

import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findUser(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  async checkUserExists(userId: string) {
    const user = await this.userModel.findById(userId);
    return !!user;
  }

  async addOne(body: CreateUserDTO) {
    const generatedPassword = generatePassword();
    const hashedPassword = hashPassword(generatedPassword);

    const newUser = new this.userModel({
      ...body,
      password: hashedPassword,
    });

    await newUser.save();
    return { id: newUser.id, email: body.email, password: generatedPassword };
  }

  async getUserDetails(userId: string) {
    const userDetails = await this.userModel
      .findOne({ _id: userId })
      .select('-password -role -social._id');
    return userDetails;
  }

  async getAllUser() {
    return await this.userModel
      .find({ role: UserRoles.user })
      .select('-password -role -social._id');
  }

  async updateInfo(userId: string, body: UpdateUserDTO) {
    return await this.userModel
      .findByIdAndUpdate(userId, body)
      .select('-password -social._id');
  }

  async updateCredentials(userId: string, body: UpdateUserCredentialsDTO) {
    const { oldPassword, newPassword } = body;
    const user = await this.findUser(userId);

    if (!checkPassword(oldPassword, user.password))
      throw new BadRequestException('Invalid Credentials');

    await this.userModel
      .findByIdAndUpdate(userId, { password: hashPassword(newPassword) })
      .select('-password -social._id');

    return 'Credentials have been updated successfully';
  }

  async removeUser(userId: string) {
    return await this.userModel.findByIdAndRemove(userId);
  }
}
