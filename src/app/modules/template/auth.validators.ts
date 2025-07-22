import z from "zod";
import { required_string } from "../../utils/validators";

const register_user = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name must be less than 50 characters" })
    .trim(),
  email: z.email({ message: "Please enter a valid email address" }).trim(),
  phone_number: z
    .string()
    .min(11, { message: "Phone number must be at least 10 digits" })
    .regex(/^(?:\+880|880|0)1[3-9]\d{8}$/, {
      message: "Please enter a valid phone number",
    })
    .trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Password must contain at least one letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character",
    })
    .max(16, { message: "Password can maximum 16 characters long" })
    .trim(),
});

const login_user = z.object({
  body: z.object({
    email: z.email(),
    password: required_string,
  }),
});

export const auth_validators = {
  register_user,
  login_user,
};
