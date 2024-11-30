import { Request, Response } from 'express';
import sendResponse from '../../utils/sendResponse';
import { reviewService } from './review.service';
import { catchAsync } from '../../utils/catchAsync';

const getHotelReviews = catchAsync(async (req: Request, res: Response) => {
  const hotelId = req.params.hotelId;
  const bookings = await reviewService.fetchReviews(hotelId, req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Hotel Reviews retrieve succcessfully',
    data: bookings,
  });
});

const createReview = catchAsync(async (req: Request, res: Response) => {
  const hotelId = req.params.hotelId;

  const bookings = await reviewService.createReviewHotel(
    { ...req.body, hotel: hotelId, user: req.user?.userId },
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Reviews created succcessfully',
    data: bookings,
  });
});

const updateReview = catchAsync(async (req: Request, res: Response) => {
  const reviewId = req.params.reviewId;
  const bookings = await reviewService.updateReview(reviewId, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Reviews updated succcessfully',
    data: bookings,
  });
});

const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const reviewId = req.params.reviewId;
  const bookings = await reviewService.detleteReview(reviewId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Reviews deleted succcessfully',
    data: bookings,
  });
});

export const reviewController = {
  createReview,
  getHotelReviews,
  updateReview,
  deleteReview,
};
