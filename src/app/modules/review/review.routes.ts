import express from 'express';
import authenticate from '../../middleware/authenticate';

import { authoRization } from '../../middleware/authoRization';
import { USER_ROLE } from '../user/user.constants';
import { reviewController } from './review.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { PartialRatingReviewSchema, reviewValidateSchmea } from './review.validation';

const router = express.Router();

router.get('/hotels/:hotelId', authenticate, reviewController.getHotelReviews);
router.post(
  '/hotels/:hotelId',
  validateRequest(reviewValidateSchmea) ,
  authenticate,
  authoRization(USER_ROLE.user),
  reviewController.createReview,
);
router.patch(
  '/:reviewId',
  validateRequest(PartialRatingReviewSchema) ,
  authenticate,
  authoRization(USER_ROLE.user),
  reviewController.updateReview,
);
router.delete(
  '/:reviewId',
  authenticate,
  authoRization(USER_ROLE.user),
  reviewController.deleteReview,
);

export const reviewRoutes = router;
