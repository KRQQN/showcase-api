import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { ICustomError } from '../zod/interfaces';
import { HttpError } from '../utils/customErrors';
import { UniqueConstraintError, ValidationError } from 'sequelize';

export function exceptionHandler(
  error: ICustomError | any,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  let statusCode = 500;
  let message = 'An unexpected error occurred';
  let redirect = '';

  if (error instanceof HttpError) {
    statusCode = error.statusCode;
    message = error.message;
    redirect = error.redirect;
  }
  
  if (error instanceof UniqueConstraintError) {
    message = error.message
    error.errors.forEach((err)=> {
      console.error(err.message)
      console.log(err.value) // Conflicting value
    })
  }

  console.error(`[${error.name}] ${message} \n`, error);

  // Todo: experiment to add body to redirect with errordata(?)
  redirect && res.redirect(redirect);
  return res.status(statusCode).json({
    statusCode,
    message
  });
}
