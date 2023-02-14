import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Comment } from 'src/comment/schemas/comment.schema';
import { IssueType } from 'src/common/constants/enums/issue-type.enum';
import { Priority } from 'src/common/constants/enums/priority.enum';
import { Status } from 'src/common/constants/enums/status.enum';
import { User } from 'src/users/schemas/user.schema';
import { Content } from './content.schema';

export type TaskDocument = Task & Document;

@Schema({
  collection: 'tasks',
  timestamps: true,
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id.toString();
      delete ret.__v;
    },
  },
})
export class Task {
  @Prop()
  title: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  assignee: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  reporter: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  qcAssignee: User;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop({ type: String })
  priority: Priority;

  @Prop()
  timeRemaining: number;

  @Prop({ type: String })
  issueType: IssueType;

  @Prop({ type: String })
  status: Status;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Content.name })
  content: Content;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: Comment.name,
    required: false,
  })
  comments?: Comment[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], required: false })
  subTasks?: string[];

  @Prop()
  environment: string[];

  @Prop()
  tttachment: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
