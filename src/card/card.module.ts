import { MongooseModule } from '@nestjs/mongoose';
import { forwardRef, Module } from '@nestjs/common';

import { CardService } from './card.service';
import { CardController } from './card.controller';

import { UserModule } from '../user/user.module';

import { Card, CardSchema } from './card.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }]),
    forwardRef(() => UserModule),
  ],
  exports: [CardService],
  providers: [CardService],
  controllers: [CardController],
})
export class CardModule {}
