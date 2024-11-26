import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { userService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import AppError from '../../error/AppError';
import { uploadImage } from '../../utils/uploadImage';
import fileUpload from 'express-fileupload';
import { TUser } from './user.interface';

const signupController = catchAsync(async (req, res) => {
  const body = req.body;
  const user = await userService.createUser(body);
  sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: httpStatus.OK,
    data: user,
  });
});

const updateUserRoleController = catchAsync(async (req, res) => {
  const { role } = req.body;
  const { userId } = req.params;
  if (req.user.userId === userId) {
    throw new AppError(httpStatus.CONFLICT, 'You cannot change your own role!');
  }

  const user = await userService.updateUserRoleToDB({ userId, role });

  sendResponse(res, {
    success: true,
    message: 'User role update successfully',
    statusCode: httpStatus.OK,
    data: user,
  });
});

const getAllUserController = catchAsync(async (req, res) => {
  const users = await userService.getAllUserFromDB(req.user.userId);

  sendResponse(res, {
    success: true,
    message: 'All User retrieve successfully',
    statusCode: httpStatus.OK,
    data: users,
  });
});

const getSingleUserController = catchAsync(async (req, res) => {
  console.log(req.user)
  const users = await userService.getSingleUserFromDB(req?.user?.userId );

  sendResponse(res, {
    success: true,
    message: 'All User retrieve successfully',
    statusCode: httpStatus.OK,
    data: users,
  });
});

const updateProfileController = catchAsync(async (req, res) => {
  const file = req.files;
  const payload: TUser = {
    ...req.body,
  };

  if (file) {
    const image = await uploadImage(file as fileUpload.FileArray);
    payload['image'] = image[0];
  }

  const updateProfile = await userService.updateProfileToDB(
    req.user.userId ,
    payload,
  );
  sendResponse(res, {
    success: true,
    message: 'user updated successfully',
    statusCode: httpStatus.OK,
    data: updateProfile,
  });
});

export const userController = {
  signupController,
  updateUserRoleController,
  getAllUserController,
  getSingleUserController,
  updateProfileController,
};
