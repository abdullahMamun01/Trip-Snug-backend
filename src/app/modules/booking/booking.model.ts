import { Schema, model } from 'mongoose';
import { IBooking } from './booking.interface';

const bookingSchema = new Schema<IBooking>({
  hotel: { type: Schema.Types.ObjectId, ref: 'Hotel', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  currency: { type: String, required: true },
  roomsAllocated: { type: Number, required: true },
  duration: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'canceled', 'completed'],
    default: 'pending',
  },
  guest: {
    children: { type: Number, default: 0 },
    adults: { type: Number, required: true },
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
} , {timestamps:true ,versionKey:false});

const BookingModel = model<IBooking>('Booking', bookingSchema);

export default BookingModel;
