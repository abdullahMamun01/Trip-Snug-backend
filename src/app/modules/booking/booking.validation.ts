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

function formatDate(date:Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, add 1
  const day = String(date.getDate()).padStart(2, '0'); // Ensure day is two digits

  return `${year}-${month}-${day}`;
}


export { bookingValidationSchema,bookingUpdateValidationSchema ,formatDate};
