import {
  Inject,
  forwardRef,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { UserService } from '../user/user.service';

import { Card, CardDocument } from './card.schema';

import CreateCardDTO from './dto/create-card.dto';
import UpdateCardDTO from './dto/update-card.dto';

@Injectable()
export class CardService {
  constructor(
    @InjectModel(Card.name) private cardModel: Model<CardDocument>,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  checkCardExists(
    email: string,
    title: string,
    company: string,
  ): Promise<boolean>;
  checkCardExists(cardId: string): Promise<boolean>;

  async checkCardExists(...args: any) {
    if (args.length > 1) {
      const [email, title, company] = args;

      console.log(
        await this.cardModel.findOne({
          email,
          title,
          company,
        }),
      );
      return !!(await this.cardModel.findOne({
        email,
        title,
        company,
      }));
    }
    return !!(await this.cardModel.findById(args[0]));
  }

  async createCard(userId: string, body: CreateCardDTO) {
    const user = await this.userService.findUser(userId);

    const { email } = user;
    const { title, company } = body;

    const checkCardExists = await this.checkCardExists(email, title, company);
    if (checkCardExists) throw new BadRequestException('card already exists');

    const newCard = new this.cardModel({
      userId,
      email: user.email,
      ...body,
    });

    await newCard.save();
    return 'Card has been created successfully';
  }

  async addOneCard(userId: string, email: string, body: CreateCardDTO) {
    const newCard = new this.cardModel({
      userId,
      email,
      ...body,
    });

    await newCard.save();
    return 'Card has been created successfully';
  }

  async getAllCards(userId: string) {
    return await this.cardModel.find({ userId });
  }

  async getCardDetails(cardId: string) {
    return await this.cardModel.findOne({ id: cardId });
  }

  async updateCardDetails(cardId: string, body: UpdateCardDTO) {
    return await this.cardModel.findByIdAndUpdate(cardId, body);
  }

  async removeCard(cardId: string) {
    await this.cardModel.findByIdAndDelete(cardId);
    return 'Card has been removed successfully';
  }

  async removeUserCards(userId: string) {
    console.log(await this.cardModel.deleteMany({ userId }));
    return 'Card has been removed successfully';
  }
}
