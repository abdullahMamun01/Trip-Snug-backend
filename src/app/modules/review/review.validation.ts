import { z } from 'zod';

const RatingReviewSchema = z.object({
  hotel: z.string({ message: 'Invalid hotel ID' }),
  rating: z
    .number()
    .min(1, { message: 'Rating must be at least 1' })
    .max(5, { message: 'Rating cannot exceed 5' }),
  review: z
    .string()
    .min(10, { message: 'Review must be at least 10 characters long' })
    .max(2000, { message: 'Review cannot exceed 2000 characters' }),
});

export const reviewValidateSchmea = z.object({
  body: RatingReviewSchema,
});

export const PartialRatingReviewSchema = z.object({
  body: RatingReviewSchema.partial(),
});
