import z from "zod";
import { required_string } from "../../utils/validators";

const create_notice = z.object({
  body: z.object({
    title: required_string,
    urgent: z.boolean(),
  }),
});

export const notice_validators = {
  create_notice,
};
