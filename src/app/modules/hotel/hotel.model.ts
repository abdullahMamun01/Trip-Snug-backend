import { Schema, model } from 'mongoose';
import { IHotel } from './hotel.interface';
const hotelType = [
  '1-star',
  '2-star',
  '3-star',
  '4-star',
  '5-star',
  'Luxury',
  'Budget',
  'Resort',
  'Boutique',
  'Business',
  'Family-friendly',
]
const locationSchema = new Schema({
  country: { type: String, required: true },
  city: { type: String, required: true },
  zipCode: { type: String, required: true },
  address: { type: String, required: true },
  latitude: { type: Number, required: false },
  longitude: { type: Number, required: false },
});

const policiesSchema = new Schema({
  checkIn: { type: String, required: true },
  checkOut: { type: String, required: true },
  cancellationPolicy: { type: String, required: true },
});

const discountSchema = new Schema(
  {
    percentage: { type: Number, required: true },
    description: { type: String, required: false },
    validFrom: { type: String, required: false },
    validUntil: { type: String, required: false },
  },
  { _id: false },
);

const hotelSchema = new Schema<IHotel>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: [String], required: true },
  location: { type: locationSchema, required: true },
  contactInfo: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  availableRooms: { type: Number, required: true },
  amenities: { type: [String], required: true },
  tags: { type: [String], required: true },
  currency: { type: String, required: true },
  policies: { type: policiesSchema, required: true },
  discount: { type: discountSchema, required: false },
  classification: {
    type: String,
    enum: hotelType,
    required: true,
  },
  isDeleted: {
    type:Boolean ,
    default: false
  }
});

export const HotelModel = model<IHotel>('Hotel', hotelSchema);
