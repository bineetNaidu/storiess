import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';
import {
  prop as Property,
  getModelForClass,
  Ref,
  post,
} from '@typegoose/typegoose';
import { Like, LikeModel } from './Like';
import { User, UserModel } from './User';
import { cloudinary } from '../configs/cloudinary';

@post<Story>('findOneAndDelete', async (story) => {
  if (story) {
    const user = await UserModel.findById(story.user);
    if (!user) {
      throw new Error('Not Authenticated!. No user was found');
    }
    const value = user.storyLimit!;
    if (value < 0) {
      await user.update({ storyLimit: value });
    } else {
      await user.update({ storyLimit: value - 1 });
    }
    await user.save();
    await cloudinary.uploader.destroy(story.filename);
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

  @Property({
    default: Date.now() + 1000 * 60 * 60 * 24,
  })
  deleteAt?: number;
}

export const StoryModel = getModelForClass(Story);
