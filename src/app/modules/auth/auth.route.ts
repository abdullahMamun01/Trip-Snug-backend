import express, {  NextFunction, Request, Response } from 'express';

import { authController } from './auth.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { loginValidationSchema } from './auth.validation';
import userRegisterValidationSchema from '../user/user.validation';
import { userController } from '../user/user.controller';
import passport from 'passport';

const router = express.Router();
router.post(
  '/signup',
  validateRequest(userRegisterValidationSchema),
  userController.signup,
);

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
    session: false,
  }),
  (req,res) => {

    return res.json({message: 'hello sir'})
  }
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/notFound',
  }),

);

router.get('/login/success', authController.OauthLoginSuccess);

router.get('/logout', (req: Request, res: Response, next: NextFunction) => {
  req.logOut((err) => {
    if (err) {
      return next(err); 
    }
    res.redirect('/'); 
  });
});



router.post(
  '/signin',
  validateRequest(loginValidationSchema),
  authController.login,
);

export const authRoutes = router;
