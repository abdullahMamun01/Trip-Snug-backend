import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { AnyZodObject } from 'zod';

export const validateRequest =  (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.body)
    const { location, policies ,tags ,amenities} = req.body;

    if (location) {
        req.body.location = JSON.parse(location); // Parse location from JSON string
    }

    if (policies) {

        req.body.policies = JSON.parse(policies); // Parse policies from JSON string

    }
    if(tags){
      req.body.tags = JSON.parse(tags);
    }
    if(amenities){
      req.body.amenities = JSON.parse(amenities);
    }

    await schema.parseAsync({
      body: req.body,
      cookies: req.cookies
    });
    next();
  });
};



