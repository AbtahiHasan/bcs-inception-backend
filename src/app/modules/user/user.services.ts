import { and, count, desc, eq, ilike, not } from "drizzle-orm";
import { users } from "../../../../drizzle/schema";
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

export const user_services = {
  get_users,
  update_user_role,
};
