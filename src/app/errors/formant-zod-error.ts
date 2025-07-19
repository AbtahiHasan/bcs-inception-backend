import { ZodError } from "zod";

import httpStatus from "http-status";
import { TGenericErrorResponse } from "../interfaces/error-interface";

const format_zod_error = (err: ZodError): TGenericErrorResponse => {
  let errorMessage = "";
  err.issues.forEach((issue: { path: any }) => {
    errorMessage += `${issue?.path[issue.path.length - 1]} is required. `;
  });

  const statusCode = httpStatus.BAD_REQUEST;

  return {
    statusCode,
    message: "Validation Error",
    errorMessage,
    errorDetails: err,
  };
};

export default format_zod_error;
