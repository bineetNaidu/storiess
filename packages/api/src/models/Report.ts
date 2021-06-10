import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';
import { prop as Property, getModelForClass } from '@typegoose/typegoose';

export enum TypeEnum {
  User = 'USER',
  Story = 'STORY',
}

@ObjectType()
export class Report {
  @Field(() => String)
  readonly _id: ObjectId;

  @Field({ nullable: true })
  @Property()
  reportedStoryId?: string;

  @Field({ nullable: true })
  @Property()
  reportedUserId?: string;

  @Field()
  @Property({ required: true })
  from!: string;

  @Field()
  @Property({ enum: TypeEnum, required: true })
  reportType!: string;

  @Field()
  @Property({ type: Date, default: Date.now() })
  createdAt?: Date;
}

export const ReportModel = getModelForClass(Report);
