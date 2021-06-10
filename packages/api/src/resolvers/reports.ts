import { Report, ReportModel, TypeEnum } from '../models/Report';
import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { isLoggedIn } from '../middlewares/isLoggedIn';
import { onlyAdmins } from '../middlewares/onlyAdmins';

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

  @Mutation(() => Report)
  async reportStory(@Arg('storyId') storyId: string): Promise<Report> {
    const report = await ReportModel.create({
      storyId,
      reportType: TypeEnum.Story,
    });
    await report.save();
    return report;
  }

  @Mutation(() => Report)
  async reportUser(@Arg('userId') userId: string): Promise<Report> {
    const report = await ReportModel.create({
      userId,
      reportType: TypeEnum.User,
    });
    await report.save();
    return report;
  }
}
