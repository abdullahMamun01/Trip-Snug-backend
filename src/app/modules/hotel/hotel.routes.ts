import express from 'express';
import { hotelController } from './hotel.controller';
import authenticate from '../../middleware/authenticate';
import { authoRization } from '../../middleware/authoRization';
import { USER_ROLE } from '../user/user.constants';
import { roomController } from '../room/room.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { roomValidationSchema } from '../room/room.validation';

const router = express.Router();
router.get('/', hotelController.getAllHotels);
router.get('/:hotelId/related', hotelController.getRelatedHotels);
router.get('/recent' , hotelController.recentHotel)
router.get('/top-rated' , hotelController.mostRatingHotel)

router.post(
  '/',
  authenticate,
  authoRization(USER_ROLE.admin),
  hotelController.createHotel,
);
router.patch(
  '/:hotelId',
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
router.get('/:hotelId/rooms', roomController.getAllRooms);

//create room by passing hotel id
router.post(
  '/:hotelId/rooms',
  validateRequest(roomValidationSchema),
  authenticate,
  authoRization(USER_ROLE.admin),
  roomController.createRoom,
);

export const HotelRoutes = router;
