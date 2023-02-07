import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ContentDocument = Content & Document;

@Schema({
  collection: 'contents',
  timestamps: true,
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id.toString();
      delete ret.__v;
    },
  },
})
export class Content {
  @Prop({ required: true })
  sumarry: string;

  @Prop({ required: true })
  description: string;
}

export const ContentSchema = SchemaFactory.createForClass(Content);
