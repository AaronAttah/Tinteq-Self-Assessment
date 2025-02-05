import winston from "winston";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export const pageNotFound =
  () => (req: Request, res: Response, next: NextFunction) => {
    const error = `Not Found : ${req.originalUrl}`;
    console.log(error);
    res.sendStatus(404);
    next();
  };

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statuscode = res.statusCode === 200 ? 500 : res.statusCode;
  const message = "Internal Server Error";

  console.log({ err, error_msg: err.message });
  res.status(statuscode).json({
    status: "Failed..",
    // message: err?.message ? err.message : message,
    message: message,
  });
};

export const logRequest = (req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
};

export const errorHandlerGPEE = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log the error for debugging purposes
  console.error(err.stack);

  // Check if the response has already been sent
  if (res.headersSent) {
    return next(err);
  }

  // Set the status code and send an error response
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
  });
};

export const winstonErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  winston.error(error.message, error);

  return res.status(500).json({
    error: {
      message: error.message,
    },
  });
};

export const asyncHandler = (handler: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
