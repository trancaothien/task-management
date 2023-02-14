import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';

export type UserDocument = User & Document;

@Schema({
  collection: 'users',
  timestamps: true,
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id.toString();
      delete ret.__v;
    },
  },
})
export class User {
  @Transform((value) => {
    return value?.obj?._id?.toString() ?? value?.obj?.id;
  })
  id?: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  dateOfBirth?: Date;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
