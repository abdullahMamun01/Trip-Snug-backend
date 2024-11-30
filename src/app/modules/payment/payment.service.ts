import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { HotelModel } from '../hotel/hotel.model';
import { IPayment } from './payment.interface';
import PaymentModel from './payment.model';
import QueryBuilder from '../../utils/QueryBuilder';

const createPayment = async (payload: IPayment) => {
  const hotel = await HotelModel.findById(payload.hotel);
  if (!hotel)
    throw new AppError(
      httpStatus.NOT_FOUND,
      'The hotel you requested not found',
    );
  const isPayment = await PaymentModel.findOne({
    transactionId: payload.transactionId,
  });
  if (isPayment)
    throw new AppError(httpStatus.CONFLICT, 'You have already paid!');
  const payment = await PaymentModel.create(payload);
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
