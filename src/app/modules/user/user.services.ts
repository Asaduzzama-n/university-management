import { generateUserId } from './user.utils';
import config from '../../../config/index';
import { IUser } from './user.interface';
import { User } from './user.model';
import ApiError from '../../../errors/ApiError';

const createUser = async (user: IUser): Promise<IUser | null> => {
  //Incremental user ID
  const id = await generateUserId();
  user.id = id;
  //Default Password
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }

  const createdUser = await User.create(user);
  if (!createdUser) {
    throw new ApiError(400, 'Failed to create user!');
  }
  return createdUser;
};

export const UserService = {
  createUser,
};
