import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';
import { prop as Property, getModelForClass } from '@typegoose/typegoose';

@ObjectType()
class UserModel {
  @Field()
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
  @Property({ required: true, unique: true })
  username!: string;

  @Property({ required: true })
  password!: string;
}

export const User = getModelForClass(UserModel);
