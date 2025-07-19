import { NextFunction, Request, Response } from "express";

import { ZodType } from "zod";
import catch_async from "../utils/catch-async";

export const validate_request = (schema: ZodType<any>) => {
  return catch_async(
    async (req: Request, res: Response, next: NextFunction) => {
      await schema.parseAsync({
        body: req.body,
        cookies: req.cookies,
        query: req.query,
      });

      next();
    }
  );
};
