import mongoose, {  Schema } from "mongoose";
import { IRoom } from "./room.interface";


const roomSchema = new Schema<IRoom>({
  hotel: { type: Schema.Types.ObjectId, required: true, ref: "Hotel" },
  title: { type: String, required: true },
  description: { type: String, required: true },
  roomType: { type: String, required: true },
  roomNo: { type: String, optional: true },
  pricePerNight: { type: Number, required: true },
  maxGuest: { type: Number, required: true },
  amenities: [{ type: String, required: true }],
  images: [{ type: String }],
  isDeleted: {
    type:Boolean ,
    default:false
  }
});

const RoomModel = mongoose.model<IRoom>("Room", roomSchema);

export default RoomModel;
