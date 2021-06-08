import { isLoggedIn } from '../middlewares/isLoggedIn';
import { Story, StoryModel } from '../models/Story';
import { UserModel } from '../models/User';
import { MyContext } from '../utils/types';
import { LikeModel } from '../models/Like';
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Mutation,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';

@InputType()
class StoryInput {
  @Field()
  filename: string;
  @Field()
  image_url: string;
  @Field()
  etag: string;
  @Field()
  publicId: string;
  @Field()
  assetId: string;
}

@Resolver(Story)
export class StoryResolver {
  @FieldResolver(() => Boolean, { nullable: true })
  async likeStatus(
    @Root() story: Story,
    @Ctx() { req }: MyContext
  ): Promise<boolean | null> {
    if (!req.session.userId) return null;
    const like = await LikeModel.findOne({
      userId: req.session.userId as string,
      storyId: story._id,
    });
    return !!like;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isLoggedIn)
  async likeStory(
    @Arg('storyId', () => String) storyId: string,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    try {
      const story = await StoryModel.findById(storyId);
      if (!story) {
        throw new Error('Story Was not found');
      }
      const like = await LikeModel.create({
        storyId,
        userId: req.session.userId!,
      });
      await like.save();

      story.likes.push(like._id);
      await story.save();
      return true;
    } catch (e) {
      return false;
    }
  }

  @Mutation(() => Story, { nullable: true })
  @UseMiddleware(isLoggedIn)
  async addStory(@Arg('input') input: StoryInput, @Ctx() { req }: MyContext) {
    const user = await UserModel.findById(req.session.userId);
    if (!user) {
      throw new Error('Server Error. User Not Found!');
    }

    if (user.stories.length === (user.storyLimit || 5)) {
      return null;
    }

    const story = await StoryModel.create({ ...input, likes: [] });
    await story.save();

    user.stories.push(story._id);

    await user.save();

    return story;
  }
}
