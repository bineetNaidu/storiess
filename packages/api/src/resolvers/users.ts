import { User, UserModel } from '../models/User';
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql';
import { MyContext } from 'src/utils/types';

@InputType()
class UserInput {
  @Field()
  username: string;
  @Field()
  email: string;
  @Field()
  googleId: string;
  @Field()
  avatar: string;
}

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return UserModel.find({});
  }

  @Mutation(() => User)
  async login(
    @Arg('input') input: UserInput,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    //? Find the user w/ google id
    const existingUser = await UserModel.findOne({ googleId: input.googleId });
    //? if there then return the existing user
    if (existingUser) {
      //? add user._id to session
      req.session.userId = existingUser._id;
      return existingUser;
    } else {
      //? else if not there then create the user
      const newUser = await UserModel.create({ ...input });
      newUser.save();
      //? add user._id to session
      req.session.userId = newUser._id;
      return newUser;
    }
  }
}
