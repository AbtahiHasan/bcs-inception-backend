import { and, eq, or } from "drizzle-orm";
import { users } from "../../../../drizzle/schema";
import { db } from "../../../db";
import { i_register_user } from "./auth.interfaces";
import AppError from "../../errors/app-error";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import config from "../../../config";

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
    .returning();

  return result;
};
const login_user = async () => {};

export const auth_services = { register_user, login_user };
