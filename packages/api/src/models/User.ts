import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';
import { prop as Property, getModelForClass, post } from '@typegoose/typegoose';
import { StoryModel } from './Story';

export enum UserRoles {
  Admin = 'ADMIN',
  PlatformUser = 'PLATFORM_USER',
}

@post<User>('findOneAndDelete', async (user) => {
  if (user) {
    const stories = await StoryModel.find({ user: user._id });
    for (const story of stories) {
      await story.remove();
    }
  }
})
@ObjectType()
export class User {
  @Field(() => String)
  readonly _id: ObjectId;

  @Field()
  @Property({ required: true, unique: true })
  email: string;

  @Field()
  @Property()
  avatar: string;

  @Field({ nullable: true })
  @Property()
  bio?: string;

  @Field()
  @Property({ required: true, unique: true, trim: true })
  username!: string;

  @Property({ required: true, unique: true })
  googleId!: string;

  @Property({ default: 5 })
  storyLimit?: number;

  @Property({ enum: UserRoles, default: UserRoles.PlatformUser })
  role: string;

  @Property({ default: false })
  isBanned: boolean;
}

export const UserModel = getModelForClass(User);
