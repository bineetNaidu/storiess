import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';
import { prop as Property, getModelForClass, Ref } from '@typegoose/typegoose';
import { Story } from './Story';

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

  @Field(() => [Story])
  @Property({ ref: Story, default: [], maxlength: 5, autopopulate: true })
  stories: Ref<Story>[];

  @Property({ default: 5 })
  storyLimit?: number;
}

export const UserModel = getModelForClass(User);
