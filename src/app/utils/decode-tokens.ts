import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
interface i_user {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  role: "student" | "admin" | "super_admin";
}

export const access_token_decode = (token: string): i_user => {
  const user_data = jwt.verify(token, config.jwt.access_secret) as JwtPayload;

  const user: i_user = {
    id: user_data.id,
    name: user_data.name,
    email: user_data.email,
    phone_number: user_data.phone_number,
    role: user_data.role,
  };
  return user;
};
export const refresh_token_decode = (token: string) => {
  const result = jwt.verify(token, config.jwt.refresh_secret) as JwtPayload;

  return result;
};
