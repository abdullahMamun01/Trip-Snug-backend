import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';


import passport from 'passport';
import UserModel from '../modules/user/user.model';
import config from '../config';




const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.accessTokenSecret as string,
};

passport.use(
    new JwtStrategy(opts, async (jwtPayload, done) => {

        try {
            const user = await UserModel.findById(jwtPayload.userId).lean();

            if (user) {
                return done(null, {userId: user._id , ...user} );
            }

            return done(null, false);
        } catch (err) {
            return done(err, false);
        }
    })
);
