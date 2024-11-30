/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';

const guestSchema = z.object({
  children: z.number().nonnegative().int(),
  adults: z.number().nonnegative().int(),
});

const bookingValidationSchema = z.object({
  body: z.object({
    hotel: z.string().refine((val) => /^[a-fA-F0-9]{24}$/.test(val), {
      message: 'Invalid hotel ID format.',
    }),
    checkInDate: z.coerce.date(),
    checkOutDate: z.coerce.date(),
    currency: z.string().min(1),
    roomsAllocated: z.number().positive().int(),
    guest: guestSchema,
  }),
});


const bookingUpdateValidationSchema = z.object({
  body: bookingValidationSchema.partial(),
});

export { bookingValidationSchema,bookingUpdateValidationSchema };
