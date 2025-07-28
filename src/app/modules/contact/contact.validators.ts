import z from "zod";

const create_contact = z.object({
  body: z.object({
    name: z.string().min(2).max(50),
    email: z.email(),
    phone_number: z.string().regex(/^(?:\+880|880|0)1[3-9]\d{8}$/),
    subject: z.string().min(1),
    message: z.string().min(10).max(1000),
  }),
});

export const contact_validators = {
  create_contact,
};
