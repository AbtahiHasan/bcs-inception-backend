/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

import httpStatus from "http-status";

import format_zod_error from "../errors/formant-zod-error";
import config from "../../config";
import AppError from "../errors/app-error";

export const global_error_handler: ErrorRequestHandler = (
  err,
  _,
  res,
  _next
) => {
  // here default values
  let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;
  let message = "Internal server error!";
  let errorMessage = "";
  let errorDetails: object | null = {};
  // handle zod error
  if (err instanceof ZodError) {
    const handledError = format_zod_error(err);
    statusCode = handledError?.statusCode;
    message = handledError?.message;
    errorMessage = handledError?.errorMessage;
    errorDetails = handledError.errorDetails;
  }

  // handle custom app error
  else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
  }
  //  handle default throw new Error
  else if (err instanceof Error) {
    message = err.message;
  }

  //   send error response
  return res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    errorDetails,
    stack: config.env === "development" ? err?.stack : null,
  });
};
