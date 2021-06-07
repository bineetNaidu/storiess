import { isLoggedIn } from '../middlewares/isLoggedIn';
import { Story, StoryModel } from '../models/Story';
import { UserModel } from '../models/User';
import { MyContext } from '../utils/types';
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';

@Resolver()
export class StoryResolver {
  @Mutation(() => Story)
  @UseMiddleware(isLoggedIn)
  async addStory(
    @Arg('filename') filename: string,
    @Arg('image_url') image_url: string,
    @Ctx() { req }: MyContext
  ) {
    const user = await UserModel.findById(req.session.userId);
    const story = await StoryModel.create({ filename, image_url });
    await story.save();

    user?.stories.push(story._id);

    await user?.save();

    return story;
  }
}
