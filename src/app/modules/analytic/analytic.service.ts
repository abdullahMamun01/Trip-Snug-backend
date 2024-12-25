/* eslint-disable @typescript-eslint/no-explicit-any */
import BookingModel from '../booking/booking.model';
import { HotelModel } from '../hotel/hotel.model';
import PaymentModel from '../payment/payment.model';
import UserModel from '../user/user.model';
const allMonths  = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const revenueAnalytic = async () => {
  const monthlyRevenue = await PaymentModel.aggregate([
    {
      $project: {
        yearMonth: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
        monthName: { $dateToString: { format: '%B', date: '$createdAt' } },

        amount: 1,
      },
    },
    {
      $group: {
        _id: '$yearMonth',
        amount: { $sum: '$amount' },
        monthName: { $first: '$monthName' },
      },
    },
  ]);
  const yearlyRevenue = await PaymentModel.aggregate([
    {
      $project: {
        year: { $dateToString: { format: '%Y', date: '$createdAt' } },
        amount: 1,
      },
    },
    {
      $group: {
        _id: '$year',
        amount: { $sum: '$amount' },
      },
    },
  ]);

  const monthlyData = monthlyRevenue.reduce((acc, rev) => {
    const year = rev._id.split('-')[0];
    const monthIndex = allMonths.indexOf(rev.monthName.slice(0, 3)); // Get month index from the full month name
    if (!acc[year]) {
      acc[year] = allMonths.map((month) => ({
        year: year,
        amount: 0, // Default to 0 for all months initially
        monthName: month,
      }));
    }
    
    // Find the matching month and update the amount
    if (monthIndex !== -1) {
      acc[year][monthIndex].amount = rev.amount; // Set the amount for the matched month
    }
  
    return acc;
  }, {});
  
  return {
    monthly: monthlyData[new Date().getFullYear()],
    yearly: yearlyRevenue.map((yr) => ({ year: yr._id, amount: yr.amount })),
  };
};

const analyticOverview = async () => {
  const bookings = await BookingModel.countDocuments().lean();
  const users = await UserModel.countDocuments().lean();
  const totalHotels = await HotelModel.countDocuments().lean();
  const revenue = await PaymentModel.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: {
          $sum: '$amount',
        },
      },
    },
  ]);
  const totalRevenue = revenue.length > 0 ? revenue[0].totalRevenue : 0;

  return {
    totalBookings: bookings,
    totalUsers: users,
    totalRevenue,
    totalHotels,
  };
};

const bookingAnalytic = async () => {
  const booking = await BookingModel.aggregate([
    {
      $project: {
        yearMonth: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
        monthName: { $dateToString: { format: '%B', date: '$createdAt' } },
        year: { $dateToString: { format: '%Y', date: '$createdAt' } },
      },
    },
    {
      $facet: {
        monthly: [
          {
            $group: {
              _id: '$yearMonth',
              amount: { $sum: 1 },
              monthName: { $first: '$monthName' },
            },
          },
        ],

        yearly: [
          {
            $group: {
              _id: '$year',
              amount: { $sum: 1 },
            },
          },
        ],
      },
    },
  ]);


  return {
    monthly: booking[0].monthly.map((item:any) => ({ monthName: item.monthName.slice(0 ,3), amount: item.amount ,year: item._id.split('-')[0]})),  
    yearly: booking[0].yearly.map((item:any ) => ({ year: item._id, amount: item.amount })),
  }
};
export const analyticService = {
  revenueAnalytic,
  analyticOverview,
  bookingAnalytic,
};
