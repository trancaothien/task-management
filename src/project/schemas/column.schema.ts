import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Task } from 'src/task/schemas/task.schema';

export type ColumnOfBoardDocument = ColumnOfBoard & Document;

@Schema({
  collection: 'columns',
  timestamps: true,
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id.toString();
      delete ret.__v;
    },
  },
})
export class ColumnOfBoard {
  @Prop()
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Task.name })
  tasks: Task[];
}

export const ColumnOfBoardSchema = SchemaFactory.createForClass(ColumnOfBoard);
