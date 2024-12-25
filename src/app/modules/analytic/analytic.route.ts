
import express from 'express';
import { analyticController } from './analytic.controller';
const route = express.Router();

route.get('/revenue', analyticController.revenueAnalytics); 
route.get('/overview', analyticController.analyticOverview); 
route.get('/bookings', analyticController.bookingAnalytic); 




export const analyticRoutes = route;