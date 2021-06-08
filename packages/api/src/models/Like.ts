import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';
import { prop as Property, getModelForClass } from '@typegoose/typegoose';

@ObjectType()
export class Like {
  @Field(() => String)
  readonly _id: ObjectId;

  @Field(() => String)
  @Property({ required: true })
  storyId: ObjectId;

  @Field(() => String)
  @Property({ required: true })
  userId: ObjectId;

  @Field()
  @Property({ type: Date, default: Date.now() })
  createdAt?: Date;
}

export const LikeModel = getModelForClass(Like);
