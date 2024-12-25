/* eslint-disable no-useless-escape */
import { z } from 'zod';

export const hotelValidateSchema = z.object({
  body: z.object({
    title: z.string(),
    description: z.string(),
    location: z.object({
      country: z.string(),
      city: z.string(),
      zipCode: z.string(), // Adjusted for camelCase
      address: z.string(),
      latitude: z.number(),
      longitude: z.number(),
    }),
    contactInfo: z.string().regex(/^\+?(\d{1,3})?[\s\-]?\(?\d{1,4}?\)?[\s\-]?\d{1,4}[\s\-]?\d{1,4}$/, 'Invalid phone number'),
    pricePerNight: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: 'Price per night must be a positive number.',
    }),
    availableRooms: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: 'Price per night must be a positive number.',
    }),
    amenities: z.array(z.string()),
    tags: z.array(z.string()),
    currency: z.string(),
    policies: z.object({
      checkIn: z.string(), // Consider using z.string().regex() for time format validation
      checkOut: z.string(), // Consider using z.string().regex() for time format validation
      cancellationPolicy: z.string(),
    }),
  }),
});


export const hotelUpdateSchema  = z.object({
  body: hotelValidateSchema.partial(),
});

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
// Schema for hotel-specific room  query
export const hotelRoomQuerySchema = z.object({
  query: z.object({
    checkIn: z
      .string()
      .refine((val) => dateRegex.test(val), {
        message: "Invalid checkIn date format. Please use 'yyyy-MM-dd'.",
      }),
    checkOut: z
      .string()
      .refine((val) => dateRegex.test(val), {
        message: "Invalid checkOut date format. Please use 'yyyy-MM-dd'.",
      }),
  })
})
