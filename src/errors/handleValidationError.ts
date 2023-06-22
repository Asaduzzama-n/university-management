import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../interfaces/error';
import { IGenericErrorResponse } from '../interfaces/common';

export default function handleValidationError(
  err: mongoose.Error.ValidationError
): IGenericErrorResponse {
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
    (elm: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: elm.path,
        message: elm.message,
      };
    }
  );
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
}
