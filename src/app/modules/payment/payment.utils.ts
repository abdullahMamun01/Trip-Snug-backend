import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { paymentService } from "./payment.service";
import { Types } from "mongoose";
import Stripe from "stripe";
import stripe from "../../utils/stripe";

const validateCheckoutSession = async (session_id: string) => {
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['line_items', 'payment_intent'],
    });
    if (!checkoutSession) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Session ID not found or expired',
      );
    }
    if (checkoutSession.status !== 'complete') {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Please confirm the payment first!',
      );
    }
    return checkoutSession;
  };
  
  const savePaymentData = async (
    checkoutSession: Stripe.Checkout.Session,
    userId: string,
    currency:string
  ) => {
    const paymentIntent = checkoutSession.payment_intent as Stripe.PaymentIntent;
    const bookingId = checkoutSession?.metadata?.bookingId;
  
    if (!paymentIntent || !bookingId) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Invalid session ID');
    }
  
    return await paymentService.createPayment(
      {
        amount: (checkoutSession.amount_total as number) / 100,
        user: new Types.ObjectId(userId),
        currency,
        transactionId: paymentIntent.id,
      },
      bookingId,
    );
  };
  
  async function getExchangeRate(targetCurrency: string): Promise<number> {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/d208cb326e21296aee0bfe09/latest/USD`);
    if (!response.ok) {
        throw new Error(`Failed to fetch exchange rates: ${response.statusText}`);
    }

    const data = await response.json();
    return data.conversion_rates[targetCurrency.toUpperCase()];
}



  export {savePaymentData,validateCheckoutSession,getExchangeRate}

  