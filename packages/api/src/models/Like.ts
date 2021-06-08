import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';
import { prop as Property, getModelForClass, Ref } from '@typegoose/typegoose';
import { Story } from './Story';
import { User } from './User';

@ObjectType()
export class Like {
  @Field(() => String)
  readonly _id: ObjectId;

  @Field()
  @Property({ ref: Story })
  storyId: Ref<Story>;

  @Field()
  @Property({ ref: User })
  userId: Ref<User>;

  @Field()
  @Property({ type: Date, default: Date.now() })
  createdAt?: Date;
}

export const LikeModel = getModelForClass(Like);
