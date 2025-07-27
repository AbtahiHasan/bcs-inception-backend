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
  }),
});

const create_mcq = z.object({
  body: z.object({
    exam_id: required_string,
    question: required_string,
    explanation: required_string,
    ans_tag: z.enum(["A", "B", "C", "D"]),
    options: z.array(
      z.object({
        tag: z.enum(["A", "B", "C", "D"]),
        option: required_string,
      })
    ),
  }),
});

const create_bulk_mcqs = z.object({
  body: z
    .object({
      exam_id: required_string,
      question: required_string,
      explanation: required_string,
      ans_tag: z.enum(["A", "B", "C", "D"]),
      options: z.array(
        z.object({
          tag: z.enum(["A", "B", "C", "D"]),
          option: required_string,
        })
      ),
    })
    .array(),
});
const create_user_exam_ans = z.object({
  body: z
    .object({
      exam_id: z.uuid(),
      mcq_id: z.uuid(),
      ans_tag: z.enum(["A", "B", "C", "D"]),
    })
    .array(),
});

export const exam_validators = {
  create_exam,
  create_mcq,
  create_bulk_mcqs,
  create_user_exam_ans,
};
