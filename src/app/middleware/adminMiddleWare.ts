import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import AppError from '../error/AppError';
import { USER_ROLE } from '../modules/user/user.constants';

const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.role !== USER_ROLE.admin) {
    return next(
      new AppError(
        httpStatus.FORBIDDEN,
        'Only admins are allowed to perform this action',
      ),
    );
  }

  next();
};

export default adminMiddleware;
