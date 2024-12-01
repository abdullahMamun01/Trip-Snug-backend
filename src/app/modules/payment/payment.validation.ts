import { z } from 'zod';

// Zod schema for payment validation
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const paymentSchema = z.object({
  hotel: z
    .string()
    .regex(/^[a-f\d]{24}$/i, { message: 'Invalid hotel ID format' }),
  checkin: z
    .string()
    .regex(dateRegex, {
      message: 'Check-in date must be in YYYY-MM-DD format',
    })
    .refine((date) => new Date(date) > new Date(), {
      message: 'Check-in must be a future date',
    }),
  checkout: z
    .string()
    .regex(dateRegex, {
      message: 'Check-out date must be in YYYY-MM-DD format',
    })
    .refine((date) => new Date(date) > new Date(), {
      message: 'Check-out must be a future date',
    }),
  guest: z.object({
    adults: z
      .number({ invalid_type_error: 'Adults must be a number' })
      .min(1, { message: 'At least one adult is required' }),
    children: z
      .number({ invalid_type_error: 'Children must be a number' })
      .min(0, { message: 'Children cannot be negative' }),
  }),
  roomsAllocated: z
    .number({ invalid_type_error: 'Rooms allocated must be a number' })
    .min(1, { message: 'At least one room must be allocated' }),
});

export const paymentValidationSchema = z.object({
  body: paymentSchema.refine(
    (data) => {
      const checkinDate = new Date(data.checkin);
      const checkoutDate = new Date(data.checkout);

      if (checkoutDate <= checkinDate) {
        return false;
      }

      if (checkoutDate <= new Date()) {
        return false;
      }

      return true;
    },
    {
      message: 'Check-out must be after check-in and a future date',
    },
  ),
});


export const paymentPartialValidationSchema = z.object({
  body: paymentSchema.partial(),
});
