import  { Schema, Types } from "mongoose";

export interface IBooking  {
    hotel: Schema.Types.ObjectId;
    user: Schema.Types.ObjectId;
    room:Schema.Types.ObjectId ;
    checkInDate: Date;
    checkOutDate: Date;
    duration: number;
    totalPrice: number;
    currency: string;
    roomsAllocated:number ,
    status: 'pending' | 'confirmed' | 'canceled' | 'completed';
    guest: {
      children: number;
      adults: number;
    };
    isDeleted?:boolean 
  }


  export interface IBookingPayload  {
    hotel: Schema.Types.ObjectId;
    user: string;
    room: Types.ObjectId ,
    checkInDate: Date;
    checkOutDate: Date;
    currency: string;
    roomsAllocated:number ,
    guest: {
      children: number;
      adults: number;
    };
  }