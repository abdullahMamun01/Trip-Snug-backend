import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { hotelService } from './hotel.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { uploadImage, uploadImageByUrls } from '../../utils/uploadImage';

/* 
catchAsync(async (req:Request, res:Response) => {
    
});

*/

const getAllHotels = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const hotels = await hotelService.fetchAllHotels(query);
  sendResponse(res, {
    success: true,
    message: 'All Hotel retrieve successfully',
    statusCode: httpStatus.OK,
    data: hotels,
  });
});
const getHotel = catchAsync(async (req: Request, res: Response) => {
  const hotleId = req.params.hotelId;
  const hotels = await hotelService.fetchHotelById(hotleId);
  sendResponse(res, {
    success: true,
    message: 'Hotel retrieve successfully',
    statusCode: httpStatus.OK,
    data: hotels,
  });
});

const createHotel = catchAsync(async (req: Request, res: Response) => {
  const file = req.files;
  const imageUrls = req.body.images;

  if ( imageUrls.length === 0 && !file)
    throw new AppError(
      httpStatus.UNPROCESSABLE_ENTITY,
      'Hotel images required',
    );

  let hotelImages : string [] = [] 
  if(file){
    hotelImages = await uploadImage(file);
  }
  if(imageUrls) {
    hotelImages = await uploadImageByUrls(imageUrls);
  }

  const body = req.body;
  const hotel = await hotelService.createHotel({
    ...body,
    images: hotelImages,
  });
  sendResponse(res, {
    success: true,
    message: 'Hotel created successfully',
    statusCode: httpStatus.OK,
    data: hotel,
  });
});
const updateHotel = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  const hotelId = req.params.hotelId;
  const hotel = await hotelService.updateHotel(hotelId, body);
  sendResponse(res, {
    success: true,
    message: 'Hotel updated successfully',
    statusCode: httpStatus.OK,
    data: hotel,
  });
});
const deleteHotel = catchAsync(async (req: Request, res: Response) => {
  const hotelId = req.params.hotelId;
  const deletedHotel = await hotelService.deleteHotel(hotelId);
  sendResponse(res, {
    success: true,
    message: 'Hotel deleted successfully',
    statusCode: httpStatus.OK,
    data: deletedHotel,
  });
});
const getRelatedHotels = catchAsync(async (req: Request, res: Response) => {
  const hotelId = req.params.hotelId;
  const deletedHotel = await hotelService.fetchRelatedHotels(hotelId);
  sendResponse(res, {
    success: true,
    message: 'Related Hotel retrireve successfully',
    statusCode: httpStatus.OK,
    data: deletedHotel,
  });
});

const recentHotel = catchAsync(async (req: Request, res: Response) => {
  const hotels = await hotelService.fetchRecentHotel();
  sendResponse(res, {
    success: true,
    message: 'Hotel retrieve successfully',
    statusCode: httpStatus.OK,
    data: hotels,
  });
});

const mostRatingHotel = catchAsync(async (req: Request, res: Response) => {
  const hotels = await hotelService.fetchMostRatingHotels();
  sendResponse(res, {
    success: true,
    message: 'Hotel retrieve successfully',
    statusCode: httpStatus.OK,
    data: hotels,
  });
});
export const hotelController = {
  getAllHotels,
  getHotel,
  getRelatedHotels,
  createHotel,
  updateHotel,
  deleteHotel,
  recentHotel,
  mostRatingHotel
};
