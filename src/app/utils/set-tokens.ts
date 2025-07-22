import { Response } from "express";
import config from "../../config";

export const set_tokens = (
  res: Response,
  tokens: { access_token: string; refresh_token: string }
) => {
  res.cookie("access_token", tokens.access_token, {
    httpOnly: config.env == "production",
    secure: config.env == "production",
    sameSite: "lax",
    maxAge: 24 * 30 * 60 * 60 * 1000,
    domain: config.domain,
  });
  res.cookie("refresh_token", tokens.refresh_token, {
    httpOnly: config.env == "production",
    secure: config.env == "production",
    sameSite: "lax",
    maxAge: 12 * 24 * 30 * 60 * 60 * 1000,
    domain: config.domain,
  });
};
