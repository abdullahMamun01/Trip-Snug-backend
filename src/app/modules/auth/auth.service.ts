/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { TLogin } from '../user/user.interface';
import { findUserByEmail } from '../user/user.utils';
import { compareValidPass, createToken } from './auth.utils';
import config from '../../config';
import { convertObjectIdToId } from '../../utils';

const loginUser = async (payload: TLogin) => {
  const findUserByMail = await findUserByEmail(payload.email);
  const user = convertObjectIdToId(findUserByMail)
 
  if (!user) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      `this email : ${payload.email} is not registered!`,
    );
  }

  const isValidUser = await compareValidPass(payload.password, user.password);
  if (!isValidUser) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'the password do not match');
  }
  
  const jwtPayload = {
    userId: user.id,
    email: user.email as string,
    role: user.role,
    firstName: user.firstName as string,
    lastName: user.lastName as string,
  };
  //access token generate
  const accessToken = createToken(
    jwtPayload,
    config.accessTokenSecret as string,
    config.access_token_expires_in as string,
  );
  const refreshToken = createToken(
    jwtPayload,
    config.accessTokenSecret as string,
    config.refresh_token_expires_in as string,
  );
  // eslint-disable-next-line no-unused-vars

  const { password, ...remainingField } = user;
  return {
    user: remainingField,
    token: accessToken,
    refreshToken,
  };
};

export const authService = {
  loginUser,
};
