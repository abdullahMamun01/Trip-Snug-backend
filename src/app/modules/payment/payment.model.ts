import mongoose, {  Schema } from 'mongoose';
import { IPayment } from './payment.interface';

// Define the payment schema
const paymentSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hotel',
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['paid', 'unpaid', 'refunded'],
      required: true,
    },
    method: {
      type: String,
      enum: ['cash', 'stripe'],
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      required: true,
      default: 'USD', // You can modify this to handle other currencies
    },
    paymentDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { timestamps: true } // automatically adds createdAt and updatedAt
);

const PaymentModel = mongoose.model<IPayment>('Payment', paymentSchema);

export default PaymentModel;
