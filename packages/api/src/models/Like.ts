import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';
import { prop as Property, getModelForClass } from '@typegoose/typegoose';

@ObjectType()
export class Like {
  @Field(() => String)
  readonly _id: ObjectId;

  @Field()
  @Property({ required: true })
  storyId: string;

  @Field()
  @Property({ required: true })
  userId: string;

  @Field()
  @Property({ type: Date, default: Date.now() })
  createdAt?: Date;
}

export const LikeModel = getModelForClass(Like);
