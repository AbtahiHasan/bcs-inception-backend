import { Response } from "express";

type t_response<T> = {
  status_code: number;
  success: boolean;
  message?: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
    total_page: number;
  };
  data: T;
};

export const send_response = <T>(res: Response, data: t_response<T>) => {
  res.status(data?.status_code).json({
    success: data.success,
    message: data.message,
    ...(data?.meta && { meta: data.meta }),
    data: data.data,
  });
};
