import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { AppService } from './app.service';
import { AppController } from './app.controller';

import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { CardModule } from './card/card.module';

import { UniversalExceptionFilter } from './utility/universal.filter';
import { TransformInterceptor } from './utility/transform.interceptor';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`mongodb://localhost/${process.env.MONGO_DB_NAME}`),
    UserModule,
    CardModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: UniversalExceptionFilter,
    },
  ],
})
export class AppModule {}
