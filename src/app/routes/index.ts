import { Router } from 'express';
import { userRoutes } from '../modules/user/user.route';
import { authRoutes } from '../modules/auth/auth.route';
import { HotelRoutes } from '../modules/hotel/hotel.routes';
import { bookingRoutes } from '../modules/booking/booking.route';


const router = Router();

const routes = [
  {
    path: '/',
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


];

routes.forEach(({ path, route }) => {
  router.use(path, route);
});
export default router;
