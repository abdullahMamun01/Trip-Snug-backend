import { z } from 'zod';

export const hotelValidateSchema = z.object({
  body: z.object({
    title: z.string(),
    description: z.string(),
    images: z.array(z.string().url()), // Assuming URLs for images
    location: z.object({
      country: z.string(),
      city: z.string(),
      zipCode: z.string(), // Adjusted for camelCase
      address: z.string(),
      latitude: z.number(),
      longitude: z.number(),
    }),
    contactInfo: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
    pricePerNight: z.number().positive(),
    availableRooms: z.number().int().nonnegative(),
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
