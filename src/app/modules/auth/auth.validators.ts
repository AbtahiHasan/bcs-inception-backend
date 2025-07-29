import z from "zod";
import { required_string } from "../../utils/validators";

const register_user = z.object({
  body: z.object({
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
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,16}$/, {
        message:
          "Password must be 8–16 characters long and contain at least one letter, one number, and one special character",
      })
      .trim(),
  }),
});

const login_user = z.object({
  body: z.object({
    email: z.email(),
    password: required_string,
  }),
});

const assess_token = z.object({
  cookies: z.object({
    access_token: z.string().min(1),
  }),
});

const refresh_token = z.object({
  cookies: z.object({
    refresh_token: z.string().min(1),
  }),
});

const change_auth_info = z.object({
  body: z.object({
    name: required_string.optional(),
    old_password: z
      .string()
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,16}$/)
      .trim()
      .optional(),
    new_password: z
      .string()
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,16}$/)
      .trim()
      .optional(),
  }),
});

export const auth_validators = {
  register_user,
  login_user,
  assess_token,
  refresh_token,
  change_auth_info,
};
