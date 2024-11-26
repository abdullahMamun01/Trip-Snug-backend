/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { TUser } from './user.interface';
import UserModel from './user.model';
import { findUserByEmail } from './user.utils';
import { USER_ROLE } from './user.constants';

const getAllUserFromDB = async (adminId: string) => {
  const users = await UserModel.find({ _id: { $ne: adminId } });

  return users;
};

const getSingleUserFromDB = async (userId: string) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `this user : ${userId} is not found!`,
    );
  }

  return user;
};

const createUser = async (payload: TUser) => {
  const isUserExist = await findUserByEmail(payload.email);
  if (isUserExist) {
    throw new AppError(
      httpStatus.FOUND,
      `this email : ${payload.email} is already registered!`,
    );
  }
  const newUser = await UserModel.create(payload);
  const userObject = newUser.toObject();

  // eslint-disable-next-line no-unused-vars
  const { password, ...res } = userObject;
  return res;
};

const updateUserRoleToDB = async (payload: {
  userId: string;
  role: (typeof USER_ROLE)[keyof typeof USER_ROLE];
}) => {
  const isUserExist = await UserModel.findById(payload.userId);
  if (!isUserExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `this email : ${payload.userId} is not found!`,
    );
  }
  const updateUser = await UserModel.findByIdAndUpdate(
    payload.userId,
    { role: payload.role },
    { new: true, runValidators: true },
  );

  return updateUser;
};

const updateProfileToDB = async (userId: string, payload: TUser) => {
  const findUser = await UserModel.findById(userId);
  if (!findUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'user not found!');
  }
  const image = payload.image || findUser.image;

  const user = await UserModel.findByIdAndUpdate(
    userId,
    { ...payload, image },
    {
      new: true,
      runValidators: true,
    },
  );

  return user;
};

export const userService = {
  createUser,
  updateUserRoleToDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateProfileToDB,
};
