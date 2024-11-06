import { Request, Response, NextFunction } from 'express';

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ClientError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  if (err instanceof ServerError) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }

  res.status(500).json({
    success: false,
    message: 'An unexpected error occurred',
  });
}

export default errorHandler;