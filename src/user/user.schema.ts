import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { UserRoles } from '../utility/types';
import getEnumValues from '../utility/getEnumValues';

@Schema({ versionKey: false })
export class User {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  password: string;

  @Prop({ type: String, enum: getEnumValues(UserRoles, 'string') })
  role: UserRoles;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ email: 1 });
