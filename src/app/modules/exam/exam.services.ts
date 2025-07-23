import httpStatus from "http-status";
import { exams, mcqs, options } from "../../../../drizzle/schema";
import { db } from "../../../db";
import AppError from "../../errors/app-error";
import { i_exam, i_exam_mcq } from "./exam.interface";
import { eq } from "drizzle-orm";

const create_exam = async (payload: i_exam) => {
  const [result] = await db
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

  return result;
};

const create_mcq = async (payload: i_exam_mcq) => {
  const result = db.transaction(async (tx) => {
    const exam_id = payload.exam_id;

    const mcq_data = {
      exam_id,
      question: payload.question,
      explanation: payload.explanation,
      ans_tag: payload.ans_tag,
    };
    const [mcq] = await tx.insert(mcqs).values(mcq_data).returning();
    if (!mcq?.id) throw new AppError(httpStatus.OK, "failed to create mcq");
    const option_inserts = payload.options.map((opt) => ({
      mcq_id: mcq?.id,
      tag: opt.tag,
      option: opt.option,
    }));

    const optionsData = await tx
      .insert(options)
      .values(option_inserts)
      .returning();

    return { ...mcq, options: optionsData };
  });

  return result;
};

const get_exam = async (id: string) => {
  const rows = await db
    .select()
    .from(exams)
    .leftJoin(mcqs, eq(mcqs.exam_id, exams.id))
    .leftJoin(options, eq(options.mcq_id, mcqs.id))
    .where(eq(exams.id, id));

  const exam = rows[0].exams;
  const mcqMap = new Map();

  for (const row of rows) {
    const mcq = row.mcqs;
    const option = row.options;

    // Skip if no MCQ (in case left join didn’t match any mcq)
    if (!mcq) continue;

    // Initialize mcq with options array
    if (!mcqMap.has(mcq.id)) {
      mcqMap.set(mcq.id, {
        ...mcq,
        options: [],
      });
    }

    // Push option if available
    if (option) {
      mcqMap.get(mcq.id).options.push(option);
    }
  }

  return {
    ...exam,
    mcqs: Array.from(mcqMap.values()),
  };
  // if (!result) throw new AppError(httpStatus.NOT_FOUND, "exam not found");
  return exam;
};

export const exam_services = { create_exam, create_mcq, get_exam };
