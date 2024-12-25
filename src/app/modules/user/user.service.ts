/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { TUser } from './user.interface';
import UserModel from './user.model';
import { findUserByEmail } from './user.utils';
import { USER_ROLE } from './user.constants';
import { convertArrayIdToId, convertObjectIdToId } from '../../utils';
import QueryBuilder from '../../builder/QueryBuilder';

const getAllUserFromDB = async (
  adminId: string,
  query: Record<string, unknown>,
) => {
  const totleDoc = await UserModel.countDocuments({ _id: { $ne: adminId } });

  const userBuilder = new QueryBuilder(
    UserModel.find({ _id: { $ne: adminId } }),
    query,
    Number(totleDoc),
  ).paginate();
  const users = await userBuilder.modelQuery.lean();

  return convertArrayIdToId(users);
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
  return convertObjectIdToId(res);
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
  const user = await UserModel.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });

  return user;
};

export const userService = {
  createUser,
  updateUserRoleToDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateProfileToDB,
};
