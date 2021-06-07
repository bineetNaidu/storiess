import { isLoggedIn } from '../middlewares/isLoggedIn';
import { Story, StoryModel } from '../models/Story';
import { UserModel } from '../models/User';
import { MyContext } from '../utils/types';
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Resolver,
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

@Resolver()
export class StoryResolver {
  @Mutation(() => Story)
  @UseMiddleware(isLoggedIn)
  async addStory(@Arg('input') input: StoryInput, @Ctx() { req }: MyContext) {
    const user = await UserModel.findById(req.session.userId);
    const story = await StoryModel.create(input);
    await story.save();

    user?.stories.push(story._id);

    await user?.save();

    return story;
  }
}
