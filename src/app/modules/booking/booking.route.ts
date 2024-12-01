import express from 'express';
import authenticate from '../../middleware/authenticate';
import { bookingController } from './booking.controller';
import { validateRequest } from '../../middleware/validateRequest';
import {
  bookingUpdateValidationSchema,
} from './booking.validation';
import { authoRization } from '../../middleware/authoRization';
import { USER_ROLE } from '../user/user.constants';

const router = express.Router();
router.get(
  '/',
  authenticate,
  authoRization(USER_ROLE.admin),
  bookingController.getBookings,
);
// router.post(
//   '/',
//   authenticate,
//   authoRization(USER_ROLE.admin),
//   validateRequest(bookingValidationSchema),
//   bookingController.createBoking,
// );

router.patch(
  '/:bookingId',
  authenticate,
  authoRization(USER_ROLE.admin),
  validateRequest(bookingUpdateValidationSchema),
  bookingController.updateBookings,
);
router.delete(
  '/:bookingId',
  authenticate,
  authoRization(USER_ROLE.admin),
  bookingController.deleteBooking,
);

export const bookingRoutes = router;
