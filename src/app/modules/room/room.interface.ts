import { Types } from "mongoose";

export interface IRoom  {
    hotel: Types.ObjectId;
    title: string;
    description: string;
    roomType: string;
    roomNo?: string;
    pricePerNight: number;
    maxGuest: number;
    amenities: string[];
    availability: {
      totalRoom: number;
      availableRoom: number;
    };
    bookings: {
      checkin: string;
      checkout: string;
    }[];
    images?: string[];
    isDeleted?:boolean
  }