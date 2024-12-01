import { Schema, model } from 'mongoose';
import { IRatingReview } from './review.interface';

const RatingReviewSchema = new Schema<IRatingReview>(
  {
    hotel: {
      type: Schema.Types.ObjectId,
      ref: 'Hotel',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 2000,
    },
    isDeleted: {
      type: Boolean,
      default: false, 
    },
 
  },
  {
    timestamps: true, versionKey:false
  }
);

// // Indexes for performance and unique constraints
// RatingReviewSchema.index({ hotelId: 1, userId: 1 }, { unique: true }); // Ensures a user can only review a hotel once
// RatingReviewSchema.index({ hotelId: 1, createdAt: -1 }); // Optimizes pagination by hotel and time

export const RatingReviewModel = model('Review', RatingReviewSchema);
