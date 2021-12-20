import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

import { UserRoles } from '../utility/types';
import { emailRegex } from '../utility/regex';
import getEnumValues from '../utility/getEnumValues';

export class SocialLink {
  source: string;
  url: string;
}
@Schema({ versionKey: false })
export class User {
  @Prop({ type: String })
  name: string;

  @Prop({
    type: String,
    unique: [true, 'Email must be unique'],
    match: [emailRegex, 'Email Must be valid'],
  })
  email: string;

  @Prop({ type: String })
  password: string;

  @Prop({
    type: [String],
    required: [true, 'At least one address is required'],
  })
  address: string[];

  @Prop({ type: String, required: [true, 'image Url is required'] })
  imageUrl: string;

  @Prop({
    type: [String],
    required: [true, 'At least one telephone contact is required'],
  })
  tel: string[];

  @Prop({ type: [String], default: [] })
  fax: string[];

  @Prop({
    type: [
      {
        source: String,
        url: String,
      },
    ],
    required: [true, 'At least one social contact is required'],
  })
  social: SocialLink[];

  @Prop({
    type: String,
    enum: getEnumValues(UserRoles, 'string'),
    default: UserRoles.user,
  })
  role: UserRoles;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });

export type UserDocument = User & Document;
