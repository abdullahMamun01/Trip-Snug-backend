// hotelService.ts

import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import QueryBuilder from '../../utils/QueryBuilder';
import { HotelModel } from './hotel.model';
import { IHotel } from './hotel.interface';


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

  const hotelQUery = new QueryBuilder(
    HotelModel.find(),
    query,
    Number(totalItem),
  ).paginate();

  const hotels = await hotelQUery.modelQuery;
  return {
    page: hotelQUery.totalPage ,
    hotels ,
    hasNextpage: hotelQUery.hasNextPage,
    nextPage: hotelQUery.nextPage ,
    prevPage: hotelQUery.prevPage
  };
};

const fetchHotelById = async (hotelId: string) => {
  // Logic to fetch a hotel by its ID
  const hotel = await findHotelById(hotelId);
  if (!hotel) throw new AppError(httpStatus.NOT_FOUND, 'The Hotel not found');
  return hotel
};

const fetchRelatedHotels = async (hotelId: string) => {
  const hotel = await findHotelById(hotelId);
  if (!hotel) throw new AppError(httpStatus.NOT_FOUND, 'The Hotel not found');
  const relatedHotel = await HotelModel.find({
    $or: [
      { location: hotel.location }, 
      { tags: { $in: hotel.tags } }
    ]
  }).limit(10); // Limit to 10 results
  return relatedHotel
};

const createHotel = async (hotelData: IHotel) => {
  // Logic to create a new hotel in the database
  const hotel = await HotelModel.create(hotelData)
  return hotel
};

const updateHotel = async (hotelId: string, payload: Partial<IHotel>) => {
  const hotel = await HotelModel.findById(hotelId).lean();
  if (!hotel) throw new AppError(httpStatus.NOT_FOUND, 'The Hotel not found');
  // Logic to update a hotel by its ID
  const updatedHotel = await HotelModel.findByIdAndUpdate(hotelId , payload , {new:true ,runValidators: true}).lean()
  if (!updatedHotel) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to update hotel');
  }
  return updatedHotel
};

const deleteHotel = async (hotelId: string) => {
  // Logic to delete a hotel by its ID
  const hotel = await HotelModel.findById(hotelId).lean();
  if (!hotel) throw new AppError(httpStatus.NOT_FOUND, 'The Hotel not found');
  const deletedHotel = await HotelModel.findByIdAndDelete(hotelId)
  return deletedHotel
};

export const hotelService = {
  fetchAllHotels,
  fetchHotelById,
  fetchRelatedHotels,
  createHotel,
  updateHotel,
  deleteHotel,
};
