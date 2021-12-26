import {
  Get,
  Body,
  Post,
  Patch,
  Param,
  Delete,
  UseGuards,
  Controller,
  NotFoundException,
} from '@nestjs/common';

import { UserService } from './user.service';

import CreateUserDTO from './dto/create-user.dto';
import UpdateUserDTO from './dto/update-info.dto';
import UpdateUserCredentialsDTO from './dto/update-credentials.dto';

import { UserRoles } from '../utility/types';
import { TemplateAuthGuard } from '../auth/guards/guard.template';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('all')
  @UseGuards(new TemplateAuthGuard([UserRoles.admin]))
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
  @UseGuards(new TemplateAuthGuard([UserRoles.admin]))
  addOne(@Body() createUserDTO: CreateUserDTO) {
    return this.userService.addOne(createUserDTO);
  }

  @Patch(':userId/info')
  @UseGuards(new TemplateAuthGuard([UserRoles.admin, UserRoles.user]))
  async updateUserDetails(
    @Param('userId') userId: string,
    @Body() updateUserDTO: UpdateUserDTO,
  ) {
    const checkUserExists = await this.userService.checkUserExists(userId);
    if (!checkUserExists) throw new NotFoundException('user not found');

    return await this.userService.updateInfo(userId, updateUserDTO);
  }

  @Patch(':userId/auth')
  @UseGuards(new TemplateAuthGuard([UserRoles.admin, UserRoles.user]))
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
  @UseGuards(new TemplateAuthGuard([UserRoles.admin]))
  async removeUser(@Param('userId') userId: string) {
    const checkUserExists = await this.userService.checkUserExists(userId);
    if (!checkUserExists) throw new NotFoundException('user not found');

    return await this.userService.removeUser(userId);
  }
}
