import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { paymentService } from './payment.service';
import { IPayment, IPaymentRequest } from './payment.interface';
import { bookingService } from '../booking/booking.service';
import mongoose, { Types } from 'mongoose';
import config from '../../config';
import stripe from '../../utils/stripe';
import { HotelModel } from '../hotel/hotel.model';

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
    req.user?.userId as string,
    req.query,
  );
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User Payment retrieve successfully',
    data: payments,
  });
});

import Stripe from 'stripe';

const createPaymentIntent = catchAsync(async (req: Request, res: Response) => {
  const {
    hotel,
    currency,
    checkin,
    checkout,
    guest,
    roomsAllocated,
  }: IPaymentRequest = req.body;

  const reserveBooked = await bookingService.createBooking({
    checkInDate: checkin,
    checkOutDate: checkout,
    currency,
    hotel,
    user: req.user?.userId as string,
    roomsAllocated,
    guest,
  });

  const findHotel = await HotelModel.findById(reserveBooked.hotel).lean();
  // Explicitly define the parameters for session creation
  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    payment_method_types: ['card'],
    mode: 'payment',
    submit_type: 'auto',
    line_items: [
      {
        price_data: {
          currency: currency || 'usd',
          product_data: {
            name: findHotel?.title || 'Hotel Booking',
            images: findHotel?.images.slice(0, 1) || [],
          },
          unit_amount: Math.round(reserveBooked.totalPrice * 100),
        },
        quantity: 1,
      },
    ],
    success_url: `${config.client_public_domain}/payment/success?payment_status=succeeded&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${config.client_public_domain}/payment/failed?payment_status=false`,
    metadata: {
      bookingId: reserveBooked._id.toString(),
    },
  };

  const session = await stripe.checkout.sessions.create(sessionParams);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'The stripe payment intent created successfully',
    data: session.url
  });
});


export const paymentController = {
  createPaymentIntent
}