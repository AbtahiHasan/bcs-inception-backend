import httpStatus from "http-status";
import {
  exams,
  mcqs,
  options,
  subjects,
  topics,
} from "../../../../drizzle/schema";
import { db } from "../../../db";
import AppError from "../../errors/app-error";
import { i_exam, i_exam_mcq } from "./exam.interface";
import { and, count, eq, ilike, like } from "drizzle-orm";

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

const create_bulk_mcqs = async (payload: i_exam_mcq[]) => {
  const promises: any = [];
  payload.forEach((item) => {
    promises.push(create_mcq(item));
  });

  const result = await Promise.all(promises);
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
};
interface exam_query_params {
  page?: number;
  limit?: number;
  search?: string;
  exam_type?: "daily" | "weekly" | "monthly" | "practice" | "free";
  subject_id?: string;
  user_id?: string;
}
const get_exams = async (params: exam_query_params) => {
  const { page = 1, limit = 10, search, exam_type, subject_id } = params;

  const offset = (page - 1) * limit;

  const where_clauses = [];

  if (search) {
    where_clauses.push(ilike(exams.title, `%${search}%`));
  }

  if (exam_type) {
    where_clauses.push(eq(exams.exam_type, exam_type));
  }

  if (subject_id) {
    where_clauses.push(eq(exams.subject_id, subject_id));
  }

  const results_promise = await db
    .select()
    .from(exams)
    .where(where_clauses.length ? and(...where_clauses) : undefined)
    .leftJoin(subjects, eq(subjects.id, exams.subject_id))
    .leftJoin(topics, eq(topics.id, exams.topic_id))
    .offset(Number(offset))
    .limit(Number(limit));

  const count_promise = await db
    .select({ count: count() })
    .from(exams)
    .where(where_clauses.length ? and(...where_clauses) : undefined);

  const [result, [total]] = await Promise.all([results_promise, count_promise]);
  const total_page = Math.ceil(Number(total.count) / (params.limit || 10));

  const exam_data = result.map((item) => ({
    id: item.exams.id,
    exam_code: item.exams.exam_code,
    exam_type: item.exams.exam_type,
    title: item.exams.title,
    duration: item.exams.duration,
    exam_date: item.exams.exam_date,
    subject_id: item.exams.subject_id,
    subject: item.subjects?.title,
    topic: item.topics?.title,
    topic_id: item.exams.topic_id,
    created_at: item.exams.created_at,
  }));
  return {
    data: exam_data,
    meta: {
      page: Number(page) || 1,
      limit: Number(limit),
      total: total.count,
      total_page,
    },
  };
};

const delete_exam = async (exam_id: string) => {
  const result = await db
    .delete(exams)
    .where(eq(exams.id, exam_id))
    .returning();
  return result;
};

export const exam_services = {
  create_exam,
  create_mcq,
  create_bulk_mcqs,
  get_exam,
  get_exams,
  delete_exam,
};
