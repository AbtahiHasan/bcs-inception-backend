import z from "zod";
import { required_string } from "../../utils/validators";
const create_subject = z.object({
  body: z.object({
    title: required_string,
  }),
});

export const subject_validators = {
  create_subject,
};
