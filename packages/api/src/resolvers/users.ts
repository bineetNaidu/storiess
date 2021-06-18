import { User, UserModel } from '../models/User';
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { MyContext } from '../utils/types';
import { isLoggedIn } from '../middlewares/isLoggedIn';
import { COOKIE_NAME } from '../utils/constants';

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

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  @UseMiddleware(isLoggedIn)
  async searchUser(@Arg('query') q: string): Promise<User[]> {
    const regexQuery = new RegExp(
      q.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'),
      'gi'
    );
    const foundUsers = await UserModel.find({ username: regexQuery });
    return foundUsers;
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }

        resolve(true);
      })
    );
  }

  @Mutation(() => User)
  @UseMiddleware(isLoggedIn)
  async updateUser(
    @Arg('bio') bio: string,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    const user = await UserModel.findByIdAndUpdate(req.session.userId, { bio });
    if (!user) throw new Error('User Not Found');
    return user;
  }

  @Query(() => User, { nullable: true })
  async user(@Arg('id') id: string): Promise<User | null> {
    return UserModel.findById(id);
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext): Promise<User | null> {
    return UserModel.findById(req.session.userId);
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
      req.session.userId = existingUser._id as unknown as string;
      return existingUser;
    } else {
      //? else if not there then create the user
      const newUser = await UserModel.create({
        ...input,
        isBanned: false,
        role: 'PLATFORM_USER',
      });
      newUser.save();
      //? add user._id to session
      req.session.userId = newUser._id as unknown as string;
      return newUser;
    }
  }
}
