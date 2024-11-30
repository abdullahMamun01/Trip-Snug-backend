import { Schema } from 'mongoose';

// Interface for the Payment model
export interface IPayment {
  user: Schema.Types.ObjectId;
  hotel: Schema.Types.ObjectId;
  paymentStatus: 'paid' | 'unpaid' | 'refunded'; // Payment status
  method: 'cash' | 'stripe'; // Payment method
  transactionId: string;
  amount: number;
  currency: string;
  paymentDate: Date;
}

/* 
hotel,
    currency,
    checkin,
    checkout,
    guest,
    roomsAllocated,
*/
export interface IPaymentRequest {
  hotel: Schema.Types.ObjectId;
  checkin: Date;
  checkout: Date;
  guest: {
    adults: number;
    children: number;
  };
  roomsAllocated: number;
  currency:string
}
