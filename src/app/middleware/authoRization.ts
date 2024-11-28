import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import AppError from '../error/AppError';
import httpStatus from 'http-status';
import { TUserRole } from '../modules/user/user.interface';

export const authoRization = (...requiredRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authorizedUserRole = req.user?.role;
    if (requiredRole && !requiredRole.includes(authorizedUserRole as 'user' | 'admin')) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      );
    }
    next();
  });
};
