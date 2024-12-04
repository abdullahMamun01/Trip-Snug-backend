import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import BookingModel from '../booking/booking.model';
import { IRoom } from './room.interface';

const isRoomAvailable = async (
  roomId: string,
  checkin: Date,
  checkout: Date,
) : Promise<IRoom | null> => {
  const booking = await BookingModel.findOne({
    room: roomId,
    status: 'confirmed' ,
    checkInDate: { $lte: checkout },
    checkOutDate: { $gte: checkin },
  });
  if(booking){
    throw new AppError(httpStatus.CONFLICT , 'The room you request already booked in this date!')
  }

  return booking
};


export {isRoomAvailable}


