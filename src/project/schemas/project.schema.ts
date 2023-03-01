import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Board } from './board.schema';

export type ProjectDocument = Board & Project;

@Schema({
  collection: 'projects',
  timestamps: true,
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id.toString();
      delete ret.__v;
    },
  },
})
export class Project {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: User.name })
  members: User[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: Board.name })
  board: Board[];

  @Prop()
  imageUrl: string;
}
export const ProjectSchema = SchemaFactory.createForClass(Project);
