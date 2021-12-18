import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppService } from './app.service';
import { AppController } from './app.controller';

import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { CardModule } from './card/card.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`mongodb://localhost/${process.env.MONGO_DB_NAME}`),
    UserModule,
    CardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
