/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { paymentService } from './payment.service';
import { IPaymentRequest } from './payment.interface';
import { bookingService } from '../booking/booking.service';
import config from '../../config';
import stripe from '../../utils/stripe';
import { HotelModel } from '../hotel/hotel.model';
import Stripe from 'stripe';

import {
  getExchangeRate,
  savePaymentData,
  validateCheckoutSession,
} from './payment.utils';

const getAllPayments = catchAsync(async (req: Request, res: Response) => {
  const payments = await paymentService.fetchPayments(req.query);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Payment retrieve successfully',
    data: payments,
  });
});

const getUserPayments = catchAsync(async (req: Request, res: Response) => {
  const payments = await paymentService.fetchUserPayments(
    req.user?.userId?.toString() as string,
    req.query,
  );
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User Payment retrieve successfully',
    data: payments,
  });
});

// cs_test_a1Df0aozCPZEvjDMlUu1QIFgwUUMCdmQdZbiJgXKxATN8Yj5xDU2mZeJNg
const createBookingForPayment = async (
  body: IPaymentRequest,
  userId: string,
) => {
  return await bookingService.createBooking({
    checkInDate: body.checkin,
    checkOutDate: body.checkout,
    currency: body.currency,
    hotel: body.hotel,
    user: userId,
    roomsAllocated: body.roomsAllocated,
    guest: body.guest,
  });
};

const prepareSessionParams = (
  booking: any,
  hotel: any,
  clientPublicDomain: string,
  currency: string,
  amount:number
): Stripe.Checkout.SessionCreateParams => {
  return {
    payment_method_types: ['card'],
    mode: 'payment',
    submit_type: 'auto',
    line_items: [
      {
        price_data: {
          currency: currency || 'usd',
          product_data: {
            name: hotel?.title || 'Hotel Booking',
            images: hotel?.images.slice(0, 1) || [],
          },
          unit_amount:amount * 100,
        },
        quantity: 1,
      },
    ],
    success_url: `${clientPublicDomain}/payment/success?payment_status=succeeded&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${clientPublicDomain}/payment/failed?payment_status=false`,
    metadata: {
      bookingId: booking._id.toString(),
    },
  };
};

const createPaymentIntent = catchAsync(async (req: Request, res: Response) => {
  const body: IPaymentRequest = req.body;
  const userId = req.user?.userId?.toString() as string;

  const booking = await createBookingForPayment(body, userId);
  const hotel = await HotelModel.findById(booking.hotel).lean();

  const amount =
    body.currency === 'usd'
      ? Math.round(booking.totalPrice)
      : await getExchangeRate(body.currency) * booking.totalPrice;


  const sessionParams = prepareSessionParams(
    booking,
    hotel,
    config.client_public_domain as string,
    body.currency,
    Math.floor(amount)
  );

  const session = await stripe.checkout.sessions.create(sessionParams);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'The stripe payment intent created successfully',
    data: session.url,
  });
});

const stripeConfirmPayment = catchAsync(async (req: Request, res: Response) => {
  const { session_id } = req.body;
  const userId = req.user?.userId?.toString() as string;

  const checkoutSession = await validateCheckoutSession(session_id);
  const payment = await savePaymentData(checkoutSession, userId , checkoutSession.currency as string);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Payment retrieved successfully',
    data: payment,
  });
});

export const paymentController = {
  createPaymentIntent,
  stripeConfirmPayment,
  getAllPayments,
  getUserPayments,
};
