import { Schema, Types } from 'mongoose';

// Interface for the Payment model
export interface IPayment {
  user: Schema.Types.ObjectId;
  hotel: Schema.Types.ObjectId;
  booking: Schema.Types.ObjectId,
  paymentStatus: 'paid' | 'unpaid' | 'refunded'; // Payment status
  method: 'cash' | 'stripe'; // Payment method
  transactionId: string;
  amount: number;
  currency: string;
  paymentDate: Date;
}


export interface IPaymentPayload {
  user: Types.ObjectId;
  transactionId: string;
  amount: number;
  currency: string;
}

export interface IPaymentRequest {
  hotel: Schema.Types.ObjectId;
  room: Types.ObjectId ;
  checkin: Date;
  checkout: Date;
  guest: {
    adults: number;
    children: number;
  };
  roomsAllocated: number;
  currency:string
}
