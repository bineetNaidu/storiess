import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';
import {
  prop as Property,
  getModelForClass,
  Ref,
  post,
} from '@typegoose/typegoose';
import { Like, LikeModel } from './Like';

@post<Story>('findOneAndDelete', async (story) => {
  if (story) {
    await LikeModel.deleteMany({
      _id: {
        $in: story.likes as any,
      },
    });
  }
})
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

  @Field({ nullable: true })
  likeStatus?: boolean;

  @Field(() => [String])
  @Property({ type: Array, default: [] })
  watched?: string[];

  @Field()
  @Property({ type: Date, default: Date.now() })
  createdAt?: Date;

  @Field()
  @Property({ type: Date, default: Date.now() + new Date().setHours(24) })
  deleteAt?: Date;
}

export const StoryModel = getModelForClass(Story);
