import z from "zod";
import { required_string } from "../../utils/validators";

const create_note = z.object({
  body: z.object({
    title: required_string,
    description: required_string,
    pdf_link: z.url(),
  }),
});

export const note_validators = {
  create_note,
};
