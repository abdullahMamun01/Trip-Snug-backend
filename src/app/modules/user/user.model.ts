import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import { hashedPassword } from './user.utils';

// Create the Mongoose schema
const userSchema = new Schema<TUser>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: function() {
        return !this.isOAuthUser
      },
      select: false
    },
    isOAuthUser: {
      type: Boolean,
      default: false,
    },
    oauthProvider: {
      type: String,
      enum: ['google', 'facebook'], // Add more providers as needed
      required: function () {
        return this.isOAuthUser;
      },
    },
    phone: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    location: {
      lat: { type: Number, required: false },
      lng: { type: Number, required: false },
    },
    dateOfBirth: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey:false
  },
);

userSchema.pre('save' , async function(next){
  if(!this.isOAuthUser)
    this.password = await hashedPassword(this.password)
  next()
})



// Create the Mongoose model
const UserModel = model<TUser>('User', userSchema);

export default UserModel;
