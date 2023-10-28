import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwt.helper';
import bcrypt from 'bcrypt';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const userObj = new User();

  const isUserExist = await userObj.isUserExists(payload.id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist!');
  }
  const { id: userId, role, needPasswordChange, password } = isUserExist;

  if (!(await userObj.isPasswordMatched(payload.password, password))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Password does not matched!');
  }

  //generate access a token

  const accessToken = jwtHelpers.createToken(
    { userId: userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  //generate refresh  token
  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  //Checking deleted user or not--->
  const user = new User();
  const { userId } = verifiedToken;

  const isUserExist = await user.isUserExists(userId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist!');
  }

  //generate new token

  const newAccessToken = jwtHelpers.createToken(
    { userId: isUserExist.id, role: isUserExist.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

const changePassword = async (
  user: JwtPayload | null,
  payload: IChangePassword
): Promise<void> => {
  const userObj = new User();

  //check if the user exist
  const isUserExist = await userObj.isUserExists(user?.userId);

  console.log(isUserExist);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist!');
  }
  //match old password

  if (
    isUserExist.password &&
    !(await userObj.isPasswordMatched(
      payload.oldPassword,
      isUserExist.password
    ))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old Password is incorrect');
  }

  //hash password
  const hashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  const query = { id: user?.userId };
  const updatedData = {
    password: hashedPassword,
    needPasswordChange: false,
    passwordChangedAt: new Date(),
  };
  console.log(updatedData);
  await User.findOneAndUpdate(query, updatedData);
};

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
};
