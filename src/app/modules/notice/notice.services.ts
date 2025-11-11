import { count, desc, eq } from "drizzle-orm";
import { notices } from "../../../../drizzle/schema";
import { db } from "../../../db";

const create_notice = async (payload: { title: string; urgent: boolean }) => {
  const result = await db.insert(notices).values(payload).returning();
  return result;
};

interface notice_query_params {
  page?: number;
  limit?: number;
}
const get_notices = async (params: notice_query_params) => {
  const { page = 1, limit = 10 } = params;

  const offset = (page - 1) * limit;

  const results_promise = await db
    .select()
    .from(notices)
    .orderBy(desc(notices.created_at))
    .offset(Number(offset))
    .limit(Number(limit));

  const count_promise = await db.select({ count: count() }).from(notices);

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

const delete_notice = async (id: string) => {
  const result = await db.delete(notices).where(eq(notices.id, id)).returning();
  return result;
};

export const notice_services = { create_notice, get_notices, delete_notice };
