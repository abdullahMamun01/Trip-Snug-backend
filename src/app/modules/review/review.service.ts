import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { HotelModel } from '../hotel/hotel.model';
import BookingModel from '../booking/booking.model';
import { IRatingReview } from './review.interface';
import { RatingReviewModel } from './review.model';
import QueryBuilder from '../../utils/QueryBuilder';

const fetchReviews = async (
  hotelId: string,
  query: Record<string, unknown>,
) => {
  const hotel = await HotelModel.findById(hotelId).lean();
 
  if (!hotel)
    throw new AppError(
      httpStatus.NOT_FOUND,
      'The hotel you requested not found!',
    );
  const totalReview = await RatingReviewModel.countDocuments().lean();
  const reviewQueryBuilder = new QueryBuilder(
    RatingReviewModel.find({isDeleted:false}),
    query,
    totalReview,
  );
  const reviews = await reviewQueryBuilder.modelQuery;
  return reviews;
};

const createReviewHotel = async (payload: IRatingReview) => {
  const { hotel: hotelId, user: userId } = payload;
  console.log(hotelId)
  const hotel = await HotelModel.findById(hotelId).lean();
  if (!hotel)
    throw new AppError(
      httpStatus.NOT_FOUND,
      'The hotel you requested not found!',
    );
  const isBooked = await BookingModel.findOne({
    hotel: hotelId,
    status: 'completed',
  });
  if (!isBooked)
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You are not eligible for review this hotel!',
    );
  const existingReview = await RatingReviewModel.findOne({ hotelId, userId });
  if (existingReview)
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You are not eligible to review this hotel!',
    );

  const doReview = await RatingReviewModel.create(payload);
  return doReview;
};

const updateReview = async (
  reviewId: string,
  payload: Partial<IRatingReview>,
) => {
  const hotel = await RatingReviewModel.findById(reviewId).lean();
  if (!hotel)
    throw new AppError(
      httpStatus.NOT_FOUND,
      'The Reveiw you requested not found!',
    );
    const updateReview = await RatingReviewModel.findByIdAndUpdate(reviewId , payload , {new:true , runValidators:true})
    return updateReview
};


const detleteReview = async (
    reviewId: string
  ) => {
    const hotel = await RatingReviewModel.findById(reviewId).lean();
    if (!hotel)
      throw new AppError(
        httpStatus.NOT_FOUND,
        'The Reveiw you requested not found!',
      );
      const updateReview = await RatingReviewModel.findByIdAndUpdate(reviewId , {isDeleted:true} , {new:true , runValidators:true})
      return updateReview
  };

export const reviewService = {
  fetchReviews,
  createReviewHotel,
  updateReview,
  detleteReview
};
