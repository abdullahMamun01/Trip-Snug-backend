import express from 'express';
import authenticate from '../../middleware/authenticate';
import { paymentController } from './payment.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { paymentValidationSchema } from './payment.validation';
import { z } from 'zod';
import { authoRization } from '../../middleware/authoRization';
import { USER_ROLE } from '../user/user.constants';

const router = express.Router();
router.post(
  '/stripe/create-payment-intent',
  validateRequest(paymentValidationSchema),
  authenticate,
  paymentController.createPaymentIntent,
);
router.post(
  '/stripe/confirm',
  validateRequest(
    z.object({
      body: z.object({
        session_id: z.string(),
      }),
    }),
  ),
  authenticate,
  paymentController.stripeConfirmPayment,
);

router.post(
  '/',
  authenticate,
  authoRization(USER_ROLE.admin) ,
  paymentController.getAllPayments,
);
router.post(
  '/user',
  authenticate,
  authoRization(USER_ROLE.user) ,
  paymentController.getUserPayments,
);
export const paymentRoutes = router;
