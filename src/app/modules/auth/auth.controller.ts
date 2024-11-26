import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';

import { authService } from './auth.service';
import { createToken } from './auth.utils';
import AppError from '../../error/AppError';
import config from '../../config';

const login = catchAsync(async (req, res) => {
  const body = req.body;
  const loginInfo = await authService.loginUser(body);

  res.cookie('refreshToken', loginInfo.refreshToken, {
    secure: true,
    httpOnly: true,
  });

  res.status(httpStatus.OK).json({
    message: 'user login successfully',
    success: true,
    statusCode: httpStatus.OK,
    token: loginInfo.token,
    data: loginInfo.user,
  });
});
const OauthLoginSuccess = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized user');
  }

  const token = createToken(
    {
      email: user.email as string,
      role: user.role,
      firstName: user.firstName as string,
      lastName: user.lastName as string,
    },
    config.accessTokenSecret as string,
    config.access_token_expires_in as string,
  );
  res.status(httpStatus.OK).json({
    message: 'user login successfully',
    success: true,
    statusCode: httpStatus.OK,
    data: user,
    token,
  });
});

export const authController = {
  login,
  OauthLoginSuccess,
};
