import z from "zod";

const update_user_role = z.object({
  body: z.object({
    user_id: z.uuid(),
    role: z.enum(["student", "admin"]),
  }),
});

export const user_validators = {
  update_user_role,
};
