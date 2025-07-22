import z from "zod";
import { required_string } from "../../utils/validators";
const create_topic = z.object({
  body: z.object({
    subject_id: required_string,
    title: required_string,
  }),
});

export const topic_validators = {
  create_topic,
};
