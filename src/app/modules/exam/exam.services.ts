import httpStatus from "http-status";
import {
  exams,
  mcqs,
  options,
  subjects,
  topics,
  user_answers,
  user_performances,
} from "../../../../drizzle/schema";
import { db } from "../../../db";
import AppError from "../../errors/app-error";
import { i_exam, i_exam_mcq, i_user_exam_ans } from "./exam.interface";
import {
  and,
  count,
  desc,
  eq,
  ilike,
  inArray,
  like,
  lt,
  lte,
  not,
  or,
} from "drizzle-orm";

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
const update_exam = async (exam_id: string, payload: i_exam) => {
  await db
    .update(exams)
    .set({
      exam_code: payload.exam_code,
      exam_type: payload.exam_type,
      title: payload.title,
      duration: payload.duration,
      exam_date: new Date(payload.exam_date),
      subject_id: payload.subject_id,
      topic_id: payload.topic_id,
    })
    .where(eq(exams.id, exam_id));
};

const create_mcq = async (payload: i_exam_mcq) => {
  const result = db.transaction(async (tx) => {
    const exam_id = payload.exam_id;

    const mcq_data = {
      exam_id,
      question: payload.question,
      question_image: payload.question_image,
      explanation: payload.explanation,
      explanation_image: payload.explanation_image,
      ans_tag: payload.ans_tag as "A" | "B" | "C" | "D",
    };
    const [mcq] = await tx.insert(mcqs).values(mcq_data).returning();
    if (!mcq?.id) throw new AppError(httpStatus.OK, "failed to create mcq");
    const option_inserts = payload.options.map((opt) => ({
      mcq_id: mcq?.id,
      tag: opt.tag as "A" | "B" | "C" | "D",
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
const update_mcq = async (mcq_id: string, payload: i_exam_mcq) => {
  db.transaction(async (tx) => {
    await tx
      .update(mcqs)
      .set({
        question: payload.question,
        question_image: payload.question_image,
        explanation: payload.explanation,
        explanation_image: payload.explanation_image,
        ans_tag: payload.ans_tag as "A" | "B" | "C" | "D",
      })
      .where(eq(mcqs.id, mcq_id));

    await tx.delete(options).where(eq(options.mcq_id, mcq_id));

    const option_inserts = payload.options.map((opt) => ({
      mcq_id: mcq_id,
      tag: opt.tag as "A" | "B" | "C" | "D",
      option: opt.option,
    }));

    await tx.insert(options).values(option_inserts);
  });
};
const delete_mcq = async (mcq_id: string) => {
  await db.delete(mcqs).where(eq(mcqs.id, mcq_id));
};

const create_bulk_mcqs = async (payload: i_exam_mcq[]) => {
  const promises: any = [];
  payload.forEach((item) => {
    promises.push(create_mcq(item));
  });

  const result = await Promise.all(promises);
  return result;
};

type exam_status = "live" | "result";
const get_exam = async (id: string, exam_status: exam_status) => {
  if (exam_status == undefined) {
    exam_status = "live";
  }
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

    if (!mcq) continue;

    if (!mcqMap.has(mcq.id)) {
      mcqMap.set(mcq.id, {
        ...{
          id: mcq.id,
          exam_id: mcq.exam_id,
          question: mcq.question,
          question_image: mcq.question_image,
          explanation: mcq.explanation,
          explanation_image: mcq.explanation_image,
          created_at: mcq.created_at,
        },
        ...(exam_status == "result" && { ans_tag: mcq.ans_tag }),
        options: [],
      });
    }

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
  exam_type?:
    | "daily"
    | "weekly"
    | "monthly"
    | "practice"
    | "question bank"
    | "past"
    | "free";
  subject_id?: string;
  user_id?: string;
  selected_status?: "Not Taken Yet" | "Already Taken";
}
const get_exams = async (params: exam_query_params, user_id: string) => {
  const {
    page = 1,
    limit = 10,
    search,
    exam_type,
    subject_id,
    selected_status,
  } = params;

  const offset = (page - 1) * limit;

  const where_clauses = [];
  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  if (search) where_clauses.push(ilike(exams.title, `%${search}%`));

  if (exam_type && exam_type != "past" && exam_type !== "free")
    where_clauses.push(eq(exams.exam_type, exam_type));

  if (exam_type && (exam_type == "past" || exam_type == "free"))
    where_clauses.push(lt(exams.exam_date, startOfToday));

  if (exam_type && exam_type == "past")
    where_clauses.push(not(eq(exams.exam_type, "question bank")));

  if (exam_type && exam_type == "free")
    where_clauses.push(eq(exams.exam_type, "weekly"));

  if (subject_id) where_clauses.push(eq(exams.subject_id, subject_id));

  if (selected_status) {
    const ids = await get_user_taken_exams(user_id);

    if (selected_status === "Already Taken") {
      where_clauses.push(inArray(exams.id, ids));
    }
    if (selected_status === "Not Taken Yet") {
      where_clauses.push(not(inArray(exams.id, ids)));
    }
  }

  const results_promise = await db
    .select()
    .from(exams)
    .where(where_clauses.length ? and(...where_clauses) : undefined)
    .orderBy(desc(exams.exam_date))
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

const get_home_exams = async () => {
  const now = new Date();

  const result = await db
    .select()
    .from(exams)
    .where(or(lte(exams.exam_date, now), eq(exams.exam_type, "practice"))) // exam_date <= now
    .orderBy(exams.exam_date)
    .limit(10);

  return result;
};

const delete_exam = async (exam_id: string) => {
  const result = await db
    .delete(exams)
    .where(eq(exams.id, exam_id))
    .returning();
  return result;
};

const create_user_exam_ans = async (
  user_id: any,
  payload: i_user_exam_ans[]
) => {
  if (payload.length === 0) {
    throw new AppError(httpStatus.BAD_REQUEST, "No answers provided");
  }

  const exam_id = payload[0].exam_id;

  return await db.transaction(async (tx) => {
    const existing = await tx
      .select()
      .from(user_performances)
      .where(
        and(
          eq(user_performances.user_id, user_id),
          eq(user_performances.exam_id, exam_id)
        )
      );

    if (existing.length > 0) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "You have already submitted this exam."
      );
    }

    const answersData = payload.map((item) => ({
      ...item,
      user_id,
    }));

    const result = await tx.insert(user_answers).values(answersData);

    const mcqsList = await tx
      .select({
        id: mcqs.id,
        correct_tag: mcqs.ans_tag,
      })
      .from(mcqs)
      .where(eq(mcqs.exam_id, exam_id));

    const totalMcqs = mcqsList.length;

    let marks = 0;
    for (const mcq of mcqsList) {
      const userAnswer = answersData.find((a) => a.mcq_id === mcq.id);
      if (userAnswer) {
        if (userAnswer.ans_tag === mcq.correct_tag) {
          marks += 1;
        } else {
          marks -= 0.5;
        }
      }
    }

    await tx.insert(user_performances).values({
      user_id,
      exam_id,
      marks,
      total_marks: totalMcqs,
    });

    return result;
  });
};
const get_user_ans = async (user_id: string, exam_id: string) => {
  const result = await db
    .select()
    .from(user_answers)
    .where(
      and(eq(user_answers.user_id, user_id), eq(user_answers.exam_id, exam_id))
    );

  return result;
};
const get_user_taken_exams = async (user_id: string) => {
  const result = await db
    .select()
    .from(user_answers)
    .where(and(eq(user_answers.user_id, user_id)));
  const uniqueExamIds = [...new Set(result.map((r) => r.exam_id))];
  return uniqueExamIds;
};

export const exam_services = {
  create_exam,
  update_exam,
  create_mcq,
  update_mcq,
  get_home_exams,
  delete_mcq,
  create_bulk_mcqs,
  get_exam,
  get_exams,
  delete_exam,
  create_user_exam_ans,
  get_user_ans,
  get_user_taken_exams,
};
