import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Schema as MongooseSchema, Document } from 'mongoose';

@Schema({ versionKey: false })
export class Card {
  @Prop({ type: String, required: [true, 'title is required'] })
  title: string;

  @Prop({ type: String, required: [true, 'email is required'] })
  email: string;

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
CardSchema.index({ email: 1, title: 1 });

export type CardDocument = Card & Document;
