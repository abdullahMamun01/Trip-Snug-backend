import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../../config';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';
import { findUserByEmail } from '../user/user.utils';




export const createToken = (
  JwtPayload: {userId?:string , email: string, role: string ,firstName:string,lastName:string},
  secretKey: string,
  expiresIn: string,
) => {
  return jwt.sign(JwtPayload, secretKey, { expiresIn });
};

export const compareValidPass = async (
  userPass: string,
  hashedPass: string,
) => {
  const isValidPass = await bcrypt.compare(userPass, hashedPass);
  return isValidPass;
};

export const verifyToken = async (token: string): Promise<JwtPayload> => {

  try {
    const decoded = jwt.verify(
      token,
      config.accessTokenSecret as string,
    ) as JwtPayload ;
 
    if (!decoded) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized user');
    }
  
    const user = await findUserByEmail(decoded?.email);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }

    if (  user.role != decoded.role || user.email != decoded.email ) {

      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized user');
    }

    return decoded;
  } catch (error) {
   
    throw new AppError(httpStatus.UNAUTHORIZED, 'JWT token has expired. Please log in again.');
  }
};
