import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import catch_async from "../utils/catch-async";
import AppError from "../errors/app-error";
import config from "../../config";

const auth = (roles: ("student" | "admin" | "super-admin")[]) => {
  return catch_async(
    async (req: Request, res: Response, next: NextFunction) => {
      const token = req.cookies.access_token;

      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
      }

      const user = jwt.verify(
        token,
        config.jwt.access_secret as string
      ) as JwtPayload;

      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
      }

      //TODO uncomment this conditions
      //   if (!roles.includes(user.role)) {
      //     throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
      //   }

      req.user = user as JwtPayload;
      next();
    }
  );
};

export default auth;
