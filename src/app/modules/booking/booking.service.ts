import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { HotelModel } from '../hotel/hotel.model';
import { IBooking, IBookingPayload } from './booking.interface';
import BookingModel from './booking.model';
import { getDayDifference } from './booking.utils';
import QueryBuilder from '../../utils/QueryBuilder';
import { convertArrayIdToId } from '../../utils';

const createBooking = async (payload: IBookingPayload) => {
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
    { new: true },
  );
  const duration = getDayDifference(payload.checkInDate, payload.checkOutDate);
  const totalPrice = hotel.pricePerNight * requestedRoom * duration;

  const booked = await BookingModel.create({
    ...payload,
    totalPrice,
    duration,
  });

  return booked;
};

const fetchBookings = async (query: Record<string, unknown>) => {
  const totalBookings = await BookingModel.countDocuments().lean();
  // Logic to get a list of bookings
  const bookingBuilder = new QueryBuilder(
    BookingModel.find(),
    query,
    totalBookings,
  ).paginate();
  const bookings = await bookingBuilder.modelQuery.lean()
  return convertArrayIdToId(bookings);
};

const updateBooking = async (bookingId: string, payload: Partial<IBooking>) => {
  // Logic to update a booking
  const booking = await BookingModel.findById(bookingId);
  if (!booking)
    throw new AppError(
      httpStatus.NOT_FOUND,
      'The booking you requested not found',
    );
  const updateBooking = await BookingModel.findByIdAndUpdate(
    bookingId,
    payload,
  );
  return updateBooking;
};

const deleteBooking = async (bookingId: string) => {
  // Logic to update a booking
  const booking = await BookingModel.findById(bookingId);

  if (!booking)
    throw new AppError(
      httpStatus.NOT_FOUND,
      'The booking you requested not found',
    );
    
  const updateBooking = await BookingModel.findByIdAndUpdate(bookingId, {
    isDeleted: true,
  } , {new:true,runValidators:true});
  return updateBooking;
};

export const bookingService = {
  createBooking,
  fetchBookings,
  updateBooking,
  deleteBooking,
};
