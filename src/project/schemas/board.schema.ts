import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ColumnOfBoard } from './column.schema';
import { RoleBoard } from 'src/common/constants/enums/role-board.enum';

export type BoardDocument = Board & Document;

@Schema({
  collection: 'boards',
  timestamps: true,
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id.toString();
      delete ret.__v;
    },
  },
})
export class Board {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: ColumnOfBoard.name })
  column: ColumnOfBoard[];

  @Prop()
  title: string;

  @Prop({ type: Number })
  role: RoleBoard;
}

export const BoardSchema = SchemaFactory.createForClass(Board);
