import { isLoggedIn } from '../middlewares/isLoggedIn';
import { Story, StoryModel } from '../models/Story';
import { MyContext } from '../utils/types';
import { LikeModel } from '../models/Like';
import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Resolver,
  Root,
  UseMiddleware,
  Query,
} from 'type-graphql';
import { User } from '../models/User';

@Resolver(Story)
export class StoryResolver {
  @FieldResolver(() => Boolean, { nullable: true })
  async likeStatus(
    @Root() root: any,
    @Ctx() { req }: MyContext
  ): Promise<boolean | null> {
    if (!req.session.userId) return null;
    const like = await LikeModel.findOne({
      userId: req.session.userId,
      storyId: root._doc._id,
    });
    return !!like;
  }

  @FieldResolver(() => User)
  user(@Root() root: any, @Ctx() { userLoader }: MyContext) {
    return userLoader.load(root._doc.user);
  }

  @FieldResolver(() => Boolean, { nullable: true })
  async isWatched(
    @Root() root: any,
    @Ctx() { req }: MyContext
  ): Promise<boolean | null> {
    if (!req.session.userId) return null;
    const story = await StoryModel.findById(root._doc._id);
    if (!story) return null;

    if (story.watched?.includes(req.session.userId)) {
      return true;
    } else {
      return false;
    }
  }

  @Query(() => Story, { nullable: true })
  async story(@Arg('storyId') storyId: string): Promise<Story | null> {
    return StoryModel.findById(storyId);
  }

  @Query(() => [Story])
  async stories(): Promise<Story[]> {
    const stories = await StoryModel.find({});
    // return stories;
    // @ts-ignore
    return stories.map((s) => {
      const d1 = new Date(s.deleteAt!);
      const d2 = new Date(Date.now());
      if (d2 < d1) {
        return s;
      }
    });
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isLoggedIn)
  async removeStory(
    @Arg('storyId', () => String) storyId: string
  ): Promise<boolean> {
    try {
      await StoryModel.findByIdAndDelete(storyId);
      return true;
    } catch (e) {
      return false;
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isLoggedIn)
  async watched(
    @Arg('storyId', () => String) storyId: string,
    @Ctx() { req }: MyContext
  ) {
    try {
      const story = await StoryModel.findById(storyId);
      if (!story) {
        throw new Error('Story Was not found');
      }
      if (story.watched?.includes(req.session.userId!)) {
        throw new Error('The User has already watched this story');
      }
      story.watched?.push(req.session.userId!);
      await story.save();
      return true;
    } catch (e) {
      return false;
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isLoggedIn)
  async removeLike(
    @Arg('storyId', () => String) storyId: string,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    try {
      const story = await StoryModel.findById(storyId);
      if (!story) {
        throw new Error('Story Was not found');
      }
      const like = await LikeModel.findOne({
        storyId,
        userId: req.session.userId!,
      });
      if (!like) {
        throw new Error('The User has not liked/Reacted to this story');
      }
      await story.update({
        $pull: { likes: like._id },
      });
      await story.save();
      await like.remove();
      return true;
    } catch (e) {
      return false;
    }
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
      const likeExist = await LikeModel.findOne({
        storyId,
        userId: req.session.userId!,
      });
      if (likeExist) {
        throw new Error('User has Already Liked/Reacted to this story');
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
}
