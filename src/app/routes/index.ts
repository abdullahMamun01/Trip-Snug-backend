import { Router } from 'express';
import { userRoutes } from '../modules/user/user.route';
import { authRoutes } from '../modules/auth/auth.route';
import { HotelRoutes } from '../modules/hotel/hotel.routes';
import { bookingRoutes } from '../modules/booking/booking.route';
import { reviewRoutes } from '../modules/review/review.routes';
import { paymentRoutes } from '../modules/payment/payment.routes';
import { roomRoutes } from '../modules/room/room.route';
import { analyticRoutes } from '../modules/analytic/analytic.route';

const router = Router();

const routes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/hotels',
    route: HotelRoutes,
  },
  {
    path: '/bookings',
    route: bookingRoutes,
  },
  {
    path: '/reviews',
    route: reviewRoutes,
  },
  {
    path: '/rooms',
    route: roomRoutes,
  },
  {
    path: '/payments',
    route: paymentRoutes,
  },
  {
    path: '/analytics',
    route: analyticRoutes,
  },
];

routes.forEach(({ path, route }) => {
  router.use(path, route);
});
export default router;
