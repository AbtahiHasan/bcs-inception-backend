import { and, eq, or } from "drizzle-orm";
import { users } from "../../../../drizzle/schema";
import { db } from "../../../db";
import { i_login_user, i_register_user } from "./auth.interfaces";
import AppError from "../../errors/app-error";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import config from "../../../config";
import {
  access_token_encode,
  refresh_token_encode,
} from "../../utils/encode-tokens";
import { access_token_decode } from "../../utils/decode-tokens";

const register_user = async (payload: i_register_user) => {
  const [user] = await db
    .select()
    .from(users)
    .where(
      or(
        eq(users.email, payload.email),
        eq(users.phone_number, payload.phone_number)
      )
    );

  if (user?.email) {
    if (user?.email == payload.email)
      throw new AppError(httpStatus.CONFLICT, "this email already exits");
    else
      throw new AppError(
        httpStatus.CONFLICT,
        "this phone number already exits"
      );
  }

  const hash_password = await bcrypt.hash(
    payload.password,
    config.bcrypt_salt_rounds
  );

  payload.password = hash_password;

  const result = await db
    .insert(users)
    .values({ ...payload, role: "student" })
    .returning({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      created_at: users.created_at,
    });

  return result;
};
const login_user = async (payload: i_login_user) => {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, payload.email));

  if (!user) throw new AppError(httpStatus.NOT_FOUND, "User not found");

  const is_match = await bcrypt.compare(payload.password, user.password!);

  if (!is_match)
    throw new AppError(httpStatus.BAD_REQUEST, "invalid credentials");

  const access_token = access_token_encode({
    id: user.id,
    name: user.name!,
    phone_number: user.phone_number!,
    email: user.email!,
    role: user.role!,
  });
  const refresh_token = refresh_token_encode({
    id: user.id,
    name: user.name!,
    phone_number: user.phone_number!,
    email: user.email!,
    role: user.role!,
  });

  return {
    access_token,
    refresh_token,
  };
};

const get_me = (payload: string) => {
  const user = access_token_decode(payload);

  return user;
};

export const auth_services = { register_user, login_user, get_me };
