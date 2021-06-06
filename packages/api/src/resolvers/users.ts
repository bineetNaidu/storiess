import { User, UserModel } from '../models/User';
import { Arg, Field, InputType, Mutation, Query, Resolver } from 'type-graphql';

@InputType()
class UserInput {
  @Field()
  username: string;
  @Field()
  email: string;
  @Field()
  googleId: string;
}

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users() {
    return UserModel.find({});
  }

  @Mutation(() => User)
  async login(@Arg('input') input: UserInput) {
    const user = await UserModel.create({ ...input });
    user.save();
    return user;
  }
}
