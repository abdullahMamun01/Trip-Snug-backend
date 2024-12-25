import { USER_ROLE } from './user.constants';

export type TUser = {
  userId?: string;
  id?:string ;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  gender?:'male' | 'female' |'other';
  isOAuthUser?: boolean;
  role: 'user' | 'admin';
  oauthProvider?: string;
  address: string;
  image?: string;
  city?: string; // New field
  country?: string; // New field
  dateOfBirth?: Date; // New field
  currency?:string
};

export type TLogin = {
  email: string;
  password: string;
};

export type TUserRole = keyof typeof USER_ROLE;
