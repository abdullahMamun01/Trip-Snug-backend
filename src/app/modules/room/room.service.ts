import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { HotelModel } from '../hotel/hotel.model';
import RoomModel from './room.model';
import { IRoom } from './room.interface';

const fetchRooms = async (hotelId: string) => {
  const rooms = await RoomModel.find({ hotel: hotelId });
  return rooms;
};

const createRoom = async (payload: IRoom) => {
  const hotel = await HotelModel.findById(payload.hotel);
  if (!hotel) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'The hotel you requested not found!!',
    );
  }
  const room = await RoomModel.create(payload);
  return room;
};

const updateRoom = async (roomId: string, payload: Partial<IRoom>) => {
  const hotel = await RoomModel.findById(roomId);
  if (!hotel) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'The Room you requested not found!!',
    );
  }
  const room = await RoomModel.findByIdAndUpdate(roomId, payload, {
    new: true,
    runValidators: true,
  });
  return room;
};

const deleteRoom = async (roomId: string) => {
  const hotel = await RoomModel.findById(roomId);
  if (!hotel) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'The Room you requested not found!!',
    );
  }
  const room = await RoomModel.findByIdAndUpdate(
    roomId,
    { isDeleted: false },
    { new: true, runValidators: true },
  );
  return room;
};

export const roomService = {
  fetchRooms,
  createRoom,
  updateRoom,
  deleteRoom,
};
