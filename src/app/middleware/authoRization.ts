import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import AppError from '../error/AppError';
import httpStatus from 'http-status';
import { verifyToken } from '../modules/auth/auth.utils';
import { JwtPayload } from 'jsonwebtoken';
import { TUserRole } from '../modules/user/user.interface';

export const authoRization = (...requiredRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
      throw new AppError(httpStatus.UNAUTHORIZED, 'No authorization header provided');
    }

    const [scheme, token] = authHeader.split(' ');
    
    if (scheme !== 'Bearer' || !token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid Bearer token format');
    }

    const authorizedUser = await verifyToken(token);

    if (requiredRole && !requiredRole.includes(authorizedUser.role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      );
    }

    req.user = authorizedUser as JwtPayload;

    next();
  });
};
