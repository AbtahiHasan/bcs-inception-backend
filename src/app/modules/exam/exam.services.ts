import { exams, mcqs, options } from "../../../../drizzle/schema";
import { db } from "../../../db";
import { i_exam } from "./exam.interface";

const create_exam = async (payload: i_exam) => {
  const result = await db.transaction(async (tx) => {
    const [new_exam] = await tx
      .insert(exams)
      .values({
        exam_code: payload.exam_code,
        exam_type: payload.exam_type,
        title: payload.title,
        duration: payload.duration,
        exam_date: new Date(payload.exam_date),
        subject_id: payload.subject_id,
        topic_id: payload.topic_id,
      })
      .returning();

    const exam_id = new_exam.id;

    const mcqs_data = payload.mcqs.map((mcq) => ({
      exam_id,
      question: mcq.question,
      explanation: mcq.explanation,
      ans_tag: mcq.ans_tag,
    }));

    const inserted_mcqs = await tx
      .insert(mcqs)
      .values(mcqs_data)
      .returning({ id: mcqs.id, question: mcqs.question });

    const mcq_id_map = new Map(
      inserted_mcqs.map((m, i) => [payload.mcqs[i].question, m.id])
    );

    const option_inserts = payload.mcqs.flatMap((mcq) =>
      mcq.options.map((opt) => ({
        mcq_id: mcq_id_map.get(mcq.question)!,
        tag: opt.tag,
        option: opt.option,
      }))
    );

    await tx.insert(options).values(option_inserts);

    return new_exam;
  });

  return result;
};

export const exam_services = { create_exam };
