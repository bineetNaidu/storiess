import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';
import { prop as Property, getModelForClass } from '@typegoose/typegoose';

@ObjectType()
export class Story {
  @Field(() => String)
  readonly _id: ObjectId;

  @Field()
  @Property({ required: true })
  image_url: string;

  @Field()
  @Property({ required: true })
  filename: string;

  @Field()
  @Property({ type: Date, default: Date.now() })
  createdAt?: Date;

  @Field()
  @Property({ type: Date, default: Date.now() + new Date().setHours(24) })
  deleteAt?: Date;
}

export const StoryModel = getModelForClass(Story);
