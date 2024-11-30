import express from 'express';
import authenticate from '../../middleware/authenticate';
import { paymentController } from './payment.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { paymentValidationSchema } from './payment.validation';

const router = express.Router();
router.post(
  '/stripe/create-payment-intent',
  validateRequest(paymentValidationSchema),
  authenticate,
  paymentController.createPaymentIntent,
);

export const paymentRoutes = router;
