import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';
import { prop as Property, getModelForClass } from '@typegoose/typegoose';

@ObjectType()
export class User {
  @Field(() => String)
  readonly _id: ObjectId;

  @Field()
  @Property({ required: true, unique: true })
  email: string;

  @Field({ nullable: true })
  @Property()
  avatar?: string;

  @Field({ nullable: true })
  @Property()
  bio?: string;

  @Field()
  @Property({ required: true, unique: true, trim: true })
  username!: string;

  @Property({ required: true })
  googleId!: string;
}

export const UserModel = getModelForClass(User);
