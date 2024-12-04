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
    images?: string[];
    isDeleted?:boolean
  }