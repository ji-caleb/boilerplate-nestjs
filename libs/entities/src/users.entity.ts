import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

@Schema({ strict: true, strictQuery: true, timestamps: true })
export class Users {
  _id: Types.ObjectId;

  @Prop({ type: SchemaTypes.String, required: true })
  name: string;

  @Prop({ type: SchemaTypes.String, required: true })
  email: string;

  @Prop({ type: SchemaTypes.String, required: true })
  password: string;

  createdAt: Date;
  updatedAt: Date;

  constructor({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

// export type UsersDocument = Users & Document;
export type UsersDocument = HydratedDocument<Users>;
export const UsersSchema = SchemaFactory.createForClass(Users);
