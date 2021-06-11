import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';
import {
  prop as Property,
  getModelForClass,
  Ref,
  post,
} from '@typegoose/typegoose';
import { Like, LikeModel } from './Like';
import { User } from './User';

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

  @Field()
  @Property({ required: true })
  filename: string;

  @Field(() => [Like])
  @Property({ ref: Like, default: [] })
  likes: Ref<Like>[];

  @Field(() => User)
  @Property({ ref: 'User', required: true })
  user: Ref<User>;

  @Field({ nullable: true })
  likeStatus?: boolean;

  @Field(() => [String])
  @Property({ type: Array, default: [] })
  watched?: string[];

  @Field({ nullable: true })
  isWatched?: boolean;

  @Field()
  @Property({ type: Date, default: Date.now() })
  createdAt?: Date;

  @Property({ type: Date, default: new Date(new Date().setHours(24)) })
  deleteAt?: Date;
}

export const StoryModel = getModelForClass(Story);
