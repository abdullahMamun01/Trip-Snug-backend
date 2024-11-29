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
router.get(
  '/:hotelId/related' ,
  hotelController.getRelatedHotels,
);

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



export const HotelRoutes = router