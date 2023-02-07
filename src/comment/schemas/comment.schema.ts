import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type CommentDocument = Comment & Document;

@Schema({
  collection: 'comments',
  timestamps: true,
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id.toString();
      delete ret.__v;
    },
  },
})
export class Comment {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: false,
  })
  tag?: User;

  @Prop({ required: true })
  content: string;

  @Prop({ required: false })
  image?: string;

  @Prop()
  children: string[];
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
