import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserOutput {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

/*

@Schema({ strict: true, strictQuery: true, timestamps: true })
export class Users {
  _id: Types.ObjectId;

  @Prop({ type: SchemaTypes.String, required: true })
  name: string;

  @Prop({ type: SchemaTypes.String, required: true })
  email: string;

  @Prop({ type: SchemaTypes.String, required: true })
  password: string;

  @Prop({ type: SchemaTypes.String, required: true })
  signupVerifyToken: string;

  createdAt: Date;
  updatedAt: Date;
}


 */
