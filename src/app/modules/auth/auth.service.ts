/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { TLogin } from '../user/user.interface';
import { findUserByEmail } from '../user/user.utils';
import { compareValidPass, createToken } from './auth.utils';
import config from '../../config';

const loginUser = async (payload: TLogin) => {
  const user = await findUserByEmail(payload.email);

  if (!user) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      `this email : ${payload.email} is not registered!`,
    );
  }
  // console.log(user , ' user')
  const isValidUser = await compareValidPass(payload.password, user.password);
  if (!isValidUser) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'the password do not match');
  }

  const jwtPayload = {
    userId: user._id ,
    email: user.email,
    name: user.name,
    role: user.role,

  };
  //access token generate
  const accessToken = createToken(
    jwtPayload,
    config.accessTokenSecret as string,
    config.access_token_expires_in as string,
  );
  const refreshToken = createToken(
    jwtPayload,
    config.refreshTokenSecret as string,
    config.refresh_token_expires_in as string,
  );
  // eslint-disable-next-line no-unused-vars
  const { password, ...remainingField } = user.toObject();
  return {
    user: remainingField,
    token: accessToken,
    refreshToken
  };
};

export const authService = {
  loginUser,
};
