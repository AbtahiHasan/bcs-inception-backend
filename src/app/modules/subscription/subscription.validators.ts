import z from "zod";

const create_subscription = z.object({
  body: z.object({
    phone_number: z
      .string()
      .min(11, { message: "Phone number must be at least 10 digits" })
      .regex(/^(?:\+880|880|0)1[3-9]\d{8}$/, {
        message: "Please enter a valid phone number",
      }),
    payment_method: z.enum(["bkash", "nagad"]),
    transaction_id: z.string().min(1, "Please enter a transaction id"),
  }),
});

export const subscription_validators = {
  create_subscription,
};
