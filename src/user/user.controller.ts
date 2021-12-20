import {
  Get,
  Body,
  Post,
  Patch,
  Param,
  Delete,
  Controller,
  NotFoundException,
} from '@nestjs/common';

import { UserService } from './user.service';

import CreateUserDTO from './dto/create-user.dto';
import UpdateUserDTO from './dto/update-info.dto';
import UpdateUserCredentialsDTO from './dto/update-credentials.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('all')
  getAllUserDetails() {
    return this.userService.getAllUser();
  }

  @Get(':userId/info')
  async getUserDetails(@Param('userId') userId: string) {
    const checkUserExists = await this.userService.checkUserExists(userId);
    if (!checkUserExists) throw new NotFoundException('user not found');

    return this.userService.getUserDetails(userId);
  }

  @Post()
  addOne(@Body() createUserDTO: CreateUserDTO) {
    return this.userService.addOne(createUserDTO);
  }

  @Patch(':userId/info')
  async updateUserDetails(
    @Param('userId') userId: string,
    @Body() updateUserDTO: UpdateUserDTO,
  ) {
    const checkUserExists = await this.userService.checkUserExists(userId);
    if (!checkUserExists) throw new NotFoundException('user not found');

    return await this.userService.updateInfo(userId, updateUserDTO);
  }

  @Patch(':userId/auth')
  async updateUserCredentials(
    @Param('userId') userId: string,
    @Body() updateUserCredentialsDTO: UpdateUserCredentialsDTO,
  ) {
    const checkUserExists = await this.userService.checkUserExists(userId);
    if (!checkUserExists) throw new NotFoundException('user not found');

    return await this.userService.updateCredentials(
      userId,
      updateUserCredentialsDTO,
    );
  }

  @Delete(':userId')
  async removeUser(@Param('userId') userId: string) {
    const checkUserExists = await this.userService.checkUserExists(userId);
    if (!checkUserExists) throw new NotFoundException('user not found');

    return await this.userService.removeUser(userId);
  }
}
