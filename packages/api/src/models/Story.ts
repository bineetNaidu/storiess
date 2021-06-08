import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';
import { prop as Property, getModelForClass, Ref } from '@typegoose/typegoose';
import { Like } from './Like';

@ObjectType()
export class Story {
  @Field(() => String)
  readonly _id: ObjectId;

  @Field()
  @Property({ required: true })
  image_url: string;

  @Property({ required: true })
  publicId: string;

  @Property({ required: true })
  etag: string;

  @Property({ required: true })
  assetId: string;

  @Field()
  @Property({ required: true })
  filename: string;

  @Field(() => [Like])
  @Property({ ref: Like, default: [] })
  likes: Ref<Like>[];

  @Field()
  likeStatus?: boolean;

  @Field()
  @Property({ type: Date, default: Date.now() })
  createdAt?: Date;

  @Field()
  @Property({ type: Date, default: Date.now() + new Date().setHours(24) })
  deleteAt?: Date;
}

export const StoryModel = getModelForClass(Story);
