/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import AppError from '../error/AppError';
import { catchAsync } from '../utils/catchAsync';
import httpStatus from 'http-status';
import passport from 'passport';
import { TUser } from '../modules/user/user.interface';


const authenticate = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'No authorization header provided',
      );
    }
     passport.authenticate(
      'jwt',
      { session: true },
      async (err: any, user: TUser, info: any) => {
        if (err) {
          return next(err); // Handle internal server errors
        }
        if (!user) {
          return res.status(httpStatus.UNAUTHORIZED).json({
            message: info?.message || 'Authentication failed',
          });
        }

        req.user = user;
        next();
      },
    )(req, res, next);
  },
);

export default authenticate;
