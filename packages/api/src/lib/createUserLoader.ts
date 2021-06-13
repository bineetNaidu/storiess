import DataLoader from 'dataloader';
import { User, UserModel } from '../models/User';

export const createUserLoader = () =>
  new DataLoader<string, User>(async (userIds) => {
    const users = await UserModel.find({ _id: { $in: userIds as string[] } });
    const usersMap: Record<string, User> = {};

    users.forEach((u) => {
      usersMap[u.id] = u;
    });

    return userIds.map((uid) => usersMap[uid]);
  });
