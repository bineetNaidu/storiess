import { UserModel, UserRoles } from '../models/User';
import { MiddlewareFn } from 'type-graphql';
import { MyContext } from '../utils/types';

export const onlyAdmins: MiddlewareFn<MyContext> = async (
  { context },
  next
) => {
  const user = await UserModel.findById(context.req.session.userId!);
  if (!user) throw new Error('User Not found');
  if (user.role === UserRoles.Admin) {
    next();
  }
  throw new Error('Not Authorized!');
};
