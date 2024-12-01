import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { HotelModel } from '../hotel/hotel.model';
import { IPaymentPayload } from './payment.interface';
import PaymentModel from './payment.model';
import QueryBuilder from '../../utils/QueryBuilder';
import BookingModel from '../booking/booking.model';

const createPayment = async (payload: IPaymentPayload, bookingId: string) => {
  // Find the booking to validate its existence and status
  const booking = await BookingModel.findById(bookingId);

  if (!booking) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'The booking confirmation request was not found.',
    );
  }

  if (booking.status === 'confirmed') {
    throw new AppError(
      httpStatus.CONFLICT,
      'The booking has already been confirmed.',
    );
  }

  // Confirm the booking
  booking.status = 'confirmed';
  await booking.save();

  // Validate the hotel exists
  const hotel = await HotelModel.findById(booking.hotel);
  if (!hotel) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'The hotel you requested was not found.',
    );
  }

  // Check if payment already exists for the transaction ID
  const isPayment = await PaymentModel.findOne({
    transactionId: payload.transactionId,
  });
  if (isPayment) {
    throw new AppError(httpStatus.CONFLICT, 'You have already paid!');
  }

  // Create a new payment record
  const payment = await PaymentModel.create({
    ...payload,
    booking: booking._id,
    paymentStatus: 'paid',
    method:'stripe' ,
    paymentDate: new Date(),
    hotel: booking.hotel

  });
  return payment;
};

const fetchPayments = async (query: Record<string, unknown>) => {
  const totalPayments = await PaymentModel.countDocuments().lean();
  const queryBuilder = new QueryBuilder(
    PaymentModel.find(),
    query,
    totalPayments,
  );
  const payments = await queryBuilder.modelQuery.lean();
  return payments;
};
const fetchUserPayments = async (
  userId: string,
  filter: Record<string, unknown>,
) => {
  const totalPaymentCount = await PaymentModel.countDocuments({
    user: userId,
  }).lean();

  const queryBuilder = new QueryBuilder(
    PaymentModel.find({ user: userId }),
    filter,
    totalPaymentCount,
  ).paginate();

  const userPayments = await queryBuilder.modelQuery.lean();

  return userPayments;
};

export const paymentService = {
  createPayment,
  fetchPayments,
  fetchUserPayments,
};
