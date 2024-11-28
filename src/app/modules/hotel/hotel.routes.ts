import express from 'express'
import { hotelController } from './hotel.controller';
import authenticate from '../../middleware/authenticate';
import { authoRization } from '../../middleware/authoRization';
import { USER_ROLE } from '../user/user.constants';


const router = express.Router();
router.get(
  '/',
  hotelController.getAllHotels,
);

router.post(
  '/',
  authenticate,
  authoRization(USER_ROLE.user),
  hotelController.createHotel,
);
export const HotelRoutes = router