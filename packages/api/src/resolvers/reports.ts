import { Report, ReportModel, TypeEnum } from '../models/Report';
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { isLoggedIn } from '../middlewares/isLoggedIn';
import { onlyAdmins } from '../middlewares/onlyAdmins';
import { MyContext } from 'src/utils/types';
import { StoryModel } from '../models/Story';

@Resolver()
export class ReportResolvers {
  @Query(() => [Report])
  @UseMiddleware(isLoggedIn)
  @UseMiddleware(onlyAdmins)
  async reports(): Promise<Report[]> {
    return ReportModel.find({});
  }

  @Query(() => Report, { nullable: true })
  @UseMiddleware(isLoggedIn)
  @UseMiddleware(onlyAdmins)
  async report(@Arg('id') id: string): Promise<Report | null> {
    return ReportModel.findById(id);
  }

  @Mutation(() => Report, { nullable: true })
  @UseMiddleware(isLoggedIn)
  async reportStory(
    @Arg('storyId') storyId: string,
    @Ctx() { req }: MyContext
  ): Promise<Report | null> {
    const story = await StoryModel.findById(storyId);
    if (!story) {
      return null;
    }
    if (story.user === req.session.userId) {
      return null;
    }
    const report = await ReportModel.create({
      reportedStoryId: storyId,
      reportType: TypeEnum.Story,
      from: req.session.userId!,
    });
    await report.save();
    return report;
  }

  @Mutation(() => Report, { nullable: true })
  @UseMiddleware(isLoggedIn)
  async reportUser(
    @Arg('userId') userId: string,
    @Ctx() { req }: MyContext
  ): Promise<Report | null> {
    if (userId === req.session.userId) {
      return null;
    }
    const report = await ReportModel.create({
      reportedUserId: userId,
      reportType: TypeEnum.User,
      from: req.session.userId!,
    });
    await report.save();
    return report;
  }
}
