import { Schema, model } from 'mongoose';
import { IHotel } from './hotel.interface';
// List of hotel types (classifications)
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
];

// Location schema without _id field
const locationSchema = new Schema(
  {
    country: { type: String, required: true },
    city: { type: String, required: true },
    zipCode: { type: String, required: true },
    address: { type: String, required: true },
    latitude: { type: Number, required: false },
    longitude: { type: Number, required: false },
  },
  { _id: false },
); // Add _id: false here

// Policies schema without _id field
const policiesSchema = new Schema(
  {
    checkIn: { type: String, required: true },
    checkOut: { type: String, required: true },
    cancellationPolicy: { type: String, required: true },
  },
  { _id: false },
); // Add _id: false here

// Discount schema without _id field
const discountSchema = new Schema(
  {
    percentage: { type: Number, required: true },
    description: { type: String, required: false },
    validFrom: { type: String, required: false },
    validUntil: { type: String, required: false },
  },
  { _id: false },
); // _id is already excluded here

// Hotel schema with the subdocuments
const hotelSchema = new Schema<IHotel>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: [String], required: true },
    location: { type: locationSchema, required: true },
    contactInfo: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    totalRooms: { type: Number, required: true },
    availableRooms: { type: Number, required: true },
    amenities: { type: [String], required: true },
    tags: { type: [String], required: true },
    currency: { type: String, required: true },
    policies: { type: policiesSchema, required: true },
    discount: { type: discountSchema, required: false },
    rating: {
      type: Number,
      required: false,
      min: [0, 'Rating cannot be less than 0'], // Ensure it is >= 0
      max: [5, 'Rating cannot be more than 5'], // Ensure it is <= 5
      default: 0,
    },
    reviews: {
      type: Number,
      default: 0,
    },

    classification: {
      type: String,
      enum: hotelType,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false },
);

export const HotelModel = model<IHotel>('Hotel', hotelSchema);
