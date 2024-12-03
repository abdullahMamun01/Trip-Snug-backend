import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { roomService } from './room.service';
import sendResponse from '../../utils/sendResponse';

const getAllRooms = catchAsync(async (req: Request, res: Response) => {
  const hotelId = req.params.hotelId;
  const rooms = await roomService.fetchRooms(hotelId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Hotel roooms retrieve succcessfully',
    data: rooms,
  });
});

const createRoom = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  const hotelId = req.params.hotelId;
  const room = await roomService.createRoom({ ...body, hotelId });
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Hotel roooms created succcessfully',
    data: room,
  });
});

const updateRoom = catchAsync(async (req: Request, res: Response) => {
  const roomId = req.params.roomId;
  const room = await roomService.updateRoom(roomId, req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Hotel rooom updated succcessfully',
    data: room,
  });
});

const deleteRoom = catchAsync(async (req: Request, res: Response) => {
  const roomId = req.params.roomId;
  const room = await roomService.deleteRoom(roomId);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Hotel rooom updated succcessfully',
    data: room,
  });
});

export const roomController = {
  getAllRooms,
  createRoom,
  updateRoom,
  deleteRoom,
};
