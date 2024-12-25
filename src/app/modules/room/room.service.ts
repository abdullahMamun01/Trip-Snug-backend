import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { HotelModel } from '../hotel/hotel.model';
import RoomModel from './room.model';
import { IRoom } from './room.interface';
import { convertArrayIdToId, convertObjectIdToId } from '../../utils';
import { getDayDifference } from '../booking/booking.utils';
import BookingModel from '../booking/booking.model';

const fetchRooms = async (hotelId: string, query: Record<string, unknown>) => {
  const { checkIn, checkOut } = query;
  const checkInDate = new Date(checkIn as string);
  const checkOutDate = new Date(checkOut as string);
  const totalNight = getDayDifference(checkInDate, checkOutDate);

  const rooms = await RoomModel.find({ hotel: hotelId }).select('-isDeleted').limit(10).lean();
  const roomIds = rooms.map(room => room._id)
  const bookings = await BookingModel.find({
    hotel: hotelId ,
    room : {$in: roomIds},
    checkOutDate: { $gte: checkInDate },
    checkInDate: { $lte: checkOutDate },
  }).lean()

 
  const roomWithStatus = rooms.map( (room) => {
    const isBooked = bookings.some(booking => booking.room.toString() === room._id.toString())
    return {
      ...room,
      status: isBooked ? 'soldout' : 'available',
      totalNight,
      totalPrice: room.pricePerNight * totalNight,
    };
  });


  return convertArrayIdToId(roomWithStatus);
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
  return convertObjectIdToId(room);
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
