import {
  and,
  count,
  desc,
  eq,
  ilike,
  lte,
  ne,
  not,
  or,
  sql,
} from "drizzle-orm";
import { exams, user_performances, users } from "../../../../drizzle/schema";
import { db } from "../../../db";

interface user_query_params {
  page?: number;
  limit?: number;
  search?: string;
}
const get_users = async (params: user_query_params, user_id: string) => {
  const { page = 1, limit = 10, search } = params;

  const offset = (page - 1) * limit;

  const where_clauses = [];

  if (search) where_clauses.push(ilike(users.email, `%${search}%`));

  where_clauses.push(not(eq(users.id, user_id)));

  const results_promise = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      phone_number: users.phone_number,
      role: users.role,
      created_at: users.created_at,
    })
    .from(users)
    .where(where_clauses.length ? and(...where_clauses) : undefined)
    .orderBy(desc(users.created_at), desc(users.role))
    .offset(Number(offset))
    .limit(Number(limit));

  const count_promise = await db
    .select({ count: count() })
    .from(users)
    .where(where_clauses.length ? and(...where_clauses) : undefined);

  const [result, [total]] = await Promise.all([results_promise, count_promise]);
  const total_page = Math.ceil(Number(total.count) / (params.limit || 10));

  return {
    data: result,
    meta: {
      page: Number(page) || 1,
      limit: Number(limit),
      total: total.count,
      total_page,
    },
  };
};

const update_user_role = async (payload: {
  role: "student" | "admin";
  user_id: string;
}) => {
  const [result] = await db
    .update(users)
    .set({ role: payload.role })
    .where(eq(users.id, payload.user_id))
    .returning();
  return result;
};

interface query_params {
  page?: number;
  limit?: number;
}

const get_user_performance = async (params: query_params, user_id: string) => {
  const { page = 1, limit = 10 } = params;

  const offset = (page - 1) * limit;

  const results_promise = db
    .select({
      exam: exams,
      user_score: user_performances.marks, // this user
      total_marks: user_performances.total_marks, // this user
      highest_score: sql`
      (SELECT MAX(up.marks)
       FROM ${user_performances} up
       WHERE up.exam_id = ${exams.id}
      )
    `.as("highest_score"),
    })
    .from(exams)
    .where(
      or(
        and(
          lte(exams.exam_date, new Date()),
          ne(exams.exam_type, "question bank")
        ),
        eq(exams.exam_type, "practice")
      )
    )
    .leftJoin(
      user_performances,
      and(
        eq(user_performances.exam_id, exams.id),
        eq(user_performances.user_id, user_id)
      )
    )
    .orderBy(desc(exams.created_at))
    .offset(Number(offset))
    .limit(Number(limit));

  const count_promise = db
    .select({ count: count() })
    .from(exams)
    .where(lte(exams.exam_date, new Date()));

  const [result, [total]] = await Promise.all([results_promise, count_promise]);
  const total_page = Math.ceil(Number(total.count) / (params.limit || 10));

  const modified_data = result.map((exam) => ({
    ...exam.exam,
    user_score: exam.user_score,
    highest_score: exam.highest_score,
    total_marks: exam.total_marks,
  }));
  return {
    data: modified_data,
    meta: {
      page: Number(page) || 1,
      limit: Number(limit),
      total: total.count,
      total_page,
    },
  };
};
export const user_services = {
  get_users,
  update_user_role,
  get_user_performance,
};
