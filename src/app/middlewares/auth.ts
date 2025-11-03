import { fromNodeHeaders } from "better-auth/node";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import AppError from "../errors/app-error";
import { auth as better_auth } from "../lib/auth";
import catch_async from "../utils/catch-async";

const auth = (roles: ("student" | "admin" | "super_admin")[]) => {
  return catch_async(
    async (req: Request, res: Response, next: NextFunction) => {
      // const session = await better_auth.api.getSession({
      //   headers: fromNodeHeaders(req.headers),
      // });

      // if (!session?.user) {
      //   throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
      // }

      // if (!roles.includes(session?.user?.role)) {
      //   throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
      // }

      // req.user = session?.user;
      next();
    }
  );
};

export default auth;
