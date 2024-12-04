// hotelService.ts

import httpStatus from 'http-status';
import AppError from '../../error/AppError';

import { HotelModel } from './hotel.model';
import { IHotel } from './hotel.interface';
import { convertArrayIdToId } from '../../utils';
import HotelQueryBuilder from '../../builder/HotelQueryBuilder';

const findHotelById = async (hotelId: string) => {
  const hotel = await HotelModel.findById(hotelId).lean();
  if (!hotel) {
    throw new AppError(httpStatus.NOT_FOUND, 'The Hotel not found');
  }
  return hotel;
};

const fetchAllHotels = async (query: Record<string, unknown>) => {
  // Logic to fetch all hotels from the database
  const totalItem = await HotelModel.countDocuments();

  const hotelQUery = new HotelQueryBuilder(
    HotelModel.find({availableRooms: {$gt : 0}}),
    query,
    Number(totalItem),
  ).paginate().search(['title' , 'description']);

  const hotels = await hotelQUery.modelQuery.lean().select('-isDeleted -__v');
  return {
    totalPage: hotelQUery.totalPage,
    hotels: convertArrayIdToId(hotels),
    hasNextpage: hotelQUery.hasNextPage,
    currentPage: Number(query.page),
    nextPage: hotelQUery.nextPage,
    prevPage: hotelQUery.prevPage,
  };
};

const fetchHotelById = async (hotelId: string) => {
  // Logic to fetch a hotel by its ID
  const hotel = await findHotelById(hotelId);
  if (!hotel) throw new AppError(httpStatus.NOT_FOUND, 'The Hotel not found');
  return hotel;
};

const fetchRelatedHotels = async (hotelId: string) => {
  const hotel = await findHotelById(hotelId);
  if (!hotel) throw new AppError(httpStatus.NOT_FOUND, 'The Hotel not found');
  const relatedHotel = await HotelModel.find({
    $or: [{ location: hotel.location }, { tags: { $in: hotel.tags } }],
  }).limit(10); // Limit to 10 results
  return relatedHotel;
};

const createHotel = async (hotelData: IHotel) => {
  // Logic to create a new hotel in the database
  const hotel = await HotelModel.create(hotelData);
  return hotel;
};

const updateHotel = async (hotelId: string, payload: Partial<IHotel>) => {
  const hotel = await HotelModel.findById(hotelId).lean();
  if (!hotel) throw new AppError(httpStatus.NOT_FOUND, 'The Hotel not found');
  // Logic to update a hotel by its ID
  const updatedHotel = await HotelModel.findByIdAndUpdate(hotelId, payload, {
    new: true,
    runValidators: true,
  }).lean();
  if (!updatedHotel) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to update hotel');
  }
  return updatedHotel;
};

const deleteHotel = async (hotelId: string) => {
  // Logic to delete a hotel by its ID
  const hotel = await HotelModel.findById(hotelId).lean();
  if (!hotel) throw new AppError(httpStatus.NOT_FOUND, 'The Hotel not found');
  const deletedHotel = await HotelModel.findByIdAndUpdate(
    hotelId,
    { isDeleted: true },
    { runValidators: true, new: true },
  );
  return deletedHotel;
};
const fetchMostRatingHotels = async () => {
  const mostRatingHotels = await HotelModel.find({ rating: { $gte: 4 } })
    .sort({ rating: -1 }) // Sort by rating in descending order
    .limit(10); // Limit to top 10 hotels
  return mostRatingHotels;
};

const fetchMostBookingHotels = async () => {
  const mostRatingHotels = await HotelModel.find()
    .sort({ reviews: -1 }) // Sort by rating in descending order
    .limit(10); // Limit to top 10 hotels
  return mostRatingHotels;
};


export const hotelService = {
  fetchAllHotels,
  fetchHotelById,
  fetchRelatedHotels,
  createHotel,
  updateHotel,
  deleteHotel,
  fetchMostBookingHotels,
  fetchMostRatingHotels
};
