import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Schema as MongooseSchema } from 'mongoose';

export class SocialLink {
  source: string;
  url: string;
}

@Schema({ versionKey: false })
export class Card {
  @Prop({ type: String, required: [true, 'title is required'] })
  title: string;

  @Prop({ type: String, required: [true, 'email is required'] })
  email: string;

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

  @Prop({ type: String, required: [true, 'Company is required'] })
  company: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
    required: [true, 'user ID is required'],
  })
  userId: Types.ObjectId;
}

export const CardSchema = SchemaFactory.createForClass(Card);
CardSchema.index({ userId: 1, email: 1 });
