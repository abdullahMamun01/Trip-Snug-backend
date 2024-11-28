import { USER_ROLE } from './user.constants';

export type TUser = {
  userId?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  isOAuthUser?: boolean;
  role: 'user' | 'admin';
  oauthProvider?: string;
  address: string;
  image?: string;
  city?: string; // New field
  country?: string; // New field
  location?: {
    lat: number;
    lng: number;
  }; // New field for geolocation
  dateOfBirth?: Date; // New field
};

export type TLogin = {
  email: string;
  password: string;
};

export type TUserRole = keyof typeof USER_ROLE;
