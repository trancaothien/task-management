import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Project } from 'src/project/schemas/project.schema';
import { User } from 'src/users/schemas/user.schema';

export type HistoryDocument = Comment & Document;

@Schema({
  collection: 'histories',
  timestamps: true,
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id.toString();
      delete ret.__v;
    },
  },
})
export class History {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Project.name,
    required: true,
  })
  project: Project;

  @Prop({ required: true })
  action: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  createBy: User;
}
export const HistorySchema = SchemaFactory.createForClass(History);
