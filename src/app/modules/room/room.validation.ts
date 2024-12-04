import { z } from 'zod';

const bookingSchema = z.object({
  checkin: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid check-in date format',
  }),
  checkout: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid check-out date format',
  }),
});

// Define the full room schema
const roomSchema = z.object({
  hotel: z.string().min(1),
  title: z.string().min(1),
  description: z.string(),
  roomType: z.string().min(1),
  roomNo: z.string().optional(),
  pricePerNight: z.number().positive(),
  maxGuest: z.number().int().positive(),
  amenities: z.array(z.string()).nonempty(),
  bookings: z.array(bookingSchema).optional(),
  images: z.array(z.string()).optional(),
});

// Type inference from the Zod schema
const roomValidationSchema = z.object({
  body: roomSchema,
});

const roomValidationUpdateSchema = z.object({
  body: roomSchema.partial(),
});

export { roomValidationSchema, roomValidationUpdateSchema };
