import { Report, ReportModel, TypeEnum } from '../models/Report';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';

@Resolver()
export class ReportResolvers {
  @Query(() => [Report])
  async reports(): Promise<Report[]> {
    return ReportModel.find({});
  }

  @Query(() => Report, { nullable: true })
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
