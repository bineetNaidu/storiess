import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';
import { prop as Property, getModelForClass } from '@typegoose/typegoose';

enum TypeEnum {
  User = 'USER',
  Story = 'STORY',
}

@ObjectType()
export class Report {
  @Field(() => String)
  readonly _id: ObjectId;

  @Field({ nullable: true })
  @Property()
  storyId?: string;

  @Field({ nullable: true })
  @Property()
  userId?: string;

  @Field()
  @Property({ enum: TypeEnum, required: true })
  reportType!: string;

  @Field()
  @Property({ type: Date, default: Date.now() })
  createdAt?: Date;
}

export const ReportModel = getModelForClass(Report);
