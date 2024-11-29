import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { HotelModel } from '../hotel/hotel.model';
import { IBooking } from './booking.interface';
import BookingModel from './booking.model';
import { getDayDifference } from './booking.utils';

const createBooking = async (payload: IBooking) => {
  
  // Logic to create a booking
  const hotel = await HotelModel.findById(payload.hotel).lean();
  if (!hotel)
    throw new AppError(
      httpStatus.NOT_FOUND,
      'The hotel you requested not found',
    );
  if (hotel.availableRooms === 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Sorry The hotel room available right now',
    );
  }

  const requestedRoom = payload.roomsAllocated;
  if (hotel.availableRooms < requestedRoom) {
    throw new AppError(
      httpStatus.CONFLICT,
      `We couldn't fulfill your request for ${requestedRoom} rooms. Only ${hotel.availableRooms} rooms are currently available. Would you like to adjust your request?`,
    );
  }
  
  await HotelModel.findByIdAndUpdate(
    payload.hotel,
    { $inc: { availableRooms: -payload.roomsAllocated } },
    { new: true }
  )
  const duration = getDayDifference(payload.checkInDate ,payload.checkOutDate)
  const totalPrice = hotel.pricePerNight * requestedRoom * duration

  const booked = await BookingModel.create({...payload ,totalPrice , duration});

  return booked;
};

const fetchBookings = async (query: Record<string, unknown>) => {
  // Logic to get a list of bookings
};

const updateBooking = async (bookingId: string) => {
  // Logic to update a booking
};

export const bookingService = {
  createBooking,
  fetchBookings,
  updateBooking,
};
