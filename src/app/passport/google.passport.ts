/* eslint-disable @typescript-eslint/no-explicit-any */
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import config from '../config';
import UserModel from '../modules/user/user.model';


passport.use(
  new GoogleStrategy(
    {
      clientID: config.google_client_id as string,
      clientSecret: config.google_secret_id as string,
      callbackURL: 'http://localhost:5500/api/v1/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.email;
      const firstName = profile.given_name;
      const lastName = profile.family_name;

      let user = await UserModel.findOne({ email }).lean();
      if (user) {
        
        done(null, user);
      }else {
        user = await UserModel.create({firstName,lastName ,email ,isOAuthUser: true ,oauthProvider:'google'})
        done(null, user);
      }
      
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => done(null, user));
