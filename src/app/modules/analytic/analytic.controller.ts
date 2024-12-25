import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { analyticService } from './analytic.service';

const revenueAnalytics = catchAsync(async (req: Request, res: Response) => {
    const analytics = await analyticService.revenueAnalytic();

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'All analytics retrieve successfully',
    data: analytics,
  });
});

const analyticOverview = catchAsync(async (req: Request, res: Response) => {
    const analytics = await analyticService.analyticOverview();

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'All analytics retrieve successfully',
    data: analytics,
  });
});
const bookingAnalytic = catchAsync(async (req: Request, res: Response) => {
    const analytics = await analyticService.bookingAnalytic();

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'All booking analytics retrieve successfully',
    data: analytics,
  });
});


export const analyticController = {
  revenueAnalytics,
  analyticOverview,
  bookingAnalytic
};
