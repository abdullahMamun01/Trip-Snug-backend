import { Types } from 'mongoose';

export interface IRatingReview {
  hotel: Types.ObjectId;
  user: Types.ObjectId;
  rating: number;
  review: string;
  isDeleted?:boolean
}
