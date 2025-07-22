import z from "zod";
import { required_string } from "../../utils/validators";

const create_exam = z.object({
  body: z.object({
    exam_code: required_string,
    exam_type: z.enum(["daily", "weekly", "monthly", "practice", "free"]),
    title: required_string,
    duration: z.number(),
    exam_date: required_string,
    subject_id: z.uuid(),
    topic_id: z.uuid(),
    mcqs: z.array(
      z.object({
        question: required_string,
        explanation: required_string,
        ans_tag: required_string,
        options: z.array(
          z.object({
            tag: required_string,
            option: required_string,
          })
        ),
      })
    ),
  }),
});

export const exam_validators = {
  create_exam,
};
