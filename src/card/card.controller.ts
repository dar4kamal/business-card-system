import {
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Inject,
  UseGuards,
  Controller,
  forwardRef,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { CardService } from './card.service';
import { UserService } from '../user/user.service';

import CreateCardDTO from './dto/create-card.dto';
import UpdateCardDTO from './dto/update-card.dto';

import { UserRoles } from '../utility/types';
import { TemplateAuthGuard } from '../auth/guards/guard.template';

@Controller('cards')
export class CardController {
  constructor(
    private cardService: CardService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  @Get(':userId/all')
  @UseGuards(new TemplateAuthGuard([UserRoles.admin, UserRoles.user]))
  async getAllUserCards(@Param('userId') userId: string) {
    const checkUserExists = await this.userService.checkUserExists(userId);
    if (!checkUserExists) throw new NotFoundException('user not found');

    return this.cardService.getAllCards(userId);
  }

  @Get(':cardId')
  async getUserCardDetails(@Param('cardId') cardId: string) {
    const checkCardExists = await this.cardService.checkCardExists(cardId);
    if (!checkCardExists) throw new NotFoundException('card not found');

    return this.cardService.getCardDetails(cardId);
  }

  @Post(':userId')
  @UseGuards(new TemplateAuthGuard([UserRoles.admin]))
  async createCard(
    @Param('userId') userId: string,
    @Body() createCardDTO: CreateCardDTO,
  ) {
    if (Object.keys(createCardDTO).length < 1)
      throw new BadRequestException('Empty Data Provided');
    return this.cardService.createCard(userId, createCardDTO);
  }

  @Patch(':cardId')
  @UseGuards(new TemplateAuthGuard([UserRoles.admin, UserRoles.user]))
  async updateCardDetails(
    @Param('cardId') cardId: string,
    @Body() updateCardDTO: UpdateCardDTO,
  ) {
    if (Object.keys(updateCardDTO).length < 1)
      throw new BadRequestException('Empty Data Provided');

    const checkCardExists = await this.cardService.checkCardExists(cardId);
    if (!checkCardExists) throw new NotFoundException('card not found');

    return this.cardService.updateCardDetails(cardId, updateCardDTO);
  }

  @Delete(':cardId')
  @UseGuards(new TemplateAuthGuard([UserRoles.admin]))
  async removeCard(@Param('cardId') cardId: string) {
    const checkCardExists = await this.cardService.checkCardExists(cardId);
    if (!checkCardExists) throw new NotFoundException('card not found');

    return this.cardService.removeCard(cardId);
  }
}
