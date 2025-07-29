import jwt from "jsonwebtoken";
import config from "../../config";

interface i_user {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  role: "student" | "admin" | "super_admin";
}
export const access_token_encode = (user: i_user) => {
  const token = jwt.sign(user, config.jwt.access_secret, {
    algorithm: "HS256",
    expiresIn: config.jwt.access_expires_in as any,
  });

  return token;
};
export const refresh_token_encode = (user_id: string) => {
  const token = jwt.sign({ user_id }, config.jwt.refresh_secret, {
    algorithm: "HS256",
    expiresIn: config.jwt.refresh_expires_in as any,
  });

  return token;
};
