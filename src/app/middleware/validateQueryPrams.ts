import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { AnyZodObject } from 'zod';

export const validateQueryPrams = (schema: AnyZodObject ,) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync({
      query: req.query,
    });
    next();
  });
};
