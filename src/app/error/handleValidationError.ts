import mongoose from 'mongoose';
import {
  TErrorSources,
  TGenericErrorResponse,
} from '../interface/error.interface';

type ErrorType = mongoose.Error.ValidatorError | mongoose.Error.CastError

export const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const errorSources: TErrorSources = Object.values(err.errors).map((val:ErrorType) => {
    return {
      path: val?.path,
      message: val?.message,
    };
  })
  const statusCode = 400

  return {
    errorSources ,
    statusCode ,
    message: 'validation error'
  }

};
