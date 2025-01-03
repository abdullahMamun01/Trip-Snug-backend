import express from 'express';
import { hotelController } from './hotel.controller';
import authenticate from '../../middleware/authenticate';
import { authoRization } from '../../middleware/authoRization';
import { USER_ROLE } from '../user/user.constants';
import { roomController } from '../room/room.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { roomValidationSchema } from '../room/room.validation';
import {
  hotelRoomQuerySchema,
  hotelUpdateSchema,
  hotelValidateSchema,
} from './hotel.validation';
import { validateQueryPrams } from '../../middleware/validateQueryPrams';
import { reviewValidateSchmea } from '../review/review.validation';
import { reviewController } from '../review/review.controller';

const router = express.Router();
router.get('/', hotelController.getAllHotels);
router.get('/recent', hotelController.recentHotel);
router.get('/top-rated', hotelController.mostRatingHotel);
router.get('/:hotelId', hotelController.getHotel);
router.get('/:hotelId/related', hotelController.getRelatedHotels);

router.post(
  '/',
  validateRequest(hotelValidateSchema),
  authenticate,
  authoRization(USER_ROLE.admin),
  hotelController.createHotel,
);
router.get(
  '/:hotelId/reviews',
  reviewController.getHotelReviews,
);
router.post(
  '/:hotelId/reviews',
  validateRequest(reviewValidateSchmea) ,
  authenticate,
  authoRization(USER_ROLE.user),
  reviewController.createReview,
);

router.patch(
  '/:hotelId',
  validateRequest(hotelUpdateSchema),
  authenticate,
  authoRization(USER_ROLE.admin),
  hotelController.updateHotel,
);
router.delete(
  '/:hotelId',
  authenticate,
  authoRization(USER_ROLE.admin),
  hotelController.deleteHotel,
);
//fetch all hotel rooms by hotel id
router.get(
  '/:hotelId/rooms',
  validateQueryPrams(hotelRoomQuerySchema),
  roomController.getAllRooms,
);

//create room by passing hotel id
router.post(
  '/:hotelId/rooms',
  validateRequest(roomValidationSchema),
  authenticate,
  authoRization(USER_ROLE.admin),
  roomController.createRoom,
);

export const HotelRoutes = router;
