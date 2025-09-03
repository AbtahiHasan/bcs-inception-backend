import { and, count, desc, eq } from "drizzle-orm";
import { subscriptions, users } from "../../../../drizzle/schema";
import { db } from "../../../db";

const create_subscription = async (payload: {
  user_id: string;
  transaction_id: string;
  phone_number: string;
}) => {
  const [result] = await db
    .insert(subscriptions)
    .values({ ...payload })
    .returning({ id: subscriptions.id });

  return result;
};

const get_my_subscriptions_history = async (
  user_id: string,
  params: { page: number; limit: number }
) => {
  const { page = 1, limit = 10 } = params;

  const offset = (page - 1) * limit;

  const results_promise = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.user_id, user_id))
    .orderBy(desc(subscriptions.start))

    .offset(Number(offset))
    .limit(Number(limit));

  const count_promise = await db
    .select({ count: count() })
    .from(subscriptions)
    .where(eq(subscriptions.user_id, user_id));

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

interface subscriptions_query_params {
  page?: number;
  limit?: number;
  search?: string;
  status?: "pending" | "accepted" | "rejected";
}

const get_subscriptions = async (params: subscriptions_query_params) => {
  const { page = 1, limit = 10, search, status } = params;

  const offset = (page - 1) * limit;

  const where_clauses = [];

  if (search) where_clauses.push(eq(subscriptions.transaction_id, search));
  if (status) where_clauses.push(eq(subscriptions.status, status));

  const results_promise = await db
    .select({
      id: subscriptions.id,
      user_id: subscriptions.user_id,
      phone_number: subscriptions.phone_number,
      transaction_id: subscriptions.transaction_id,
      status: subscriptions.status,
      start: subscriptions.start,
      end: subscriptions.end,
      user_info: {
        name: users.name,
        email: users.email,
        phone_number: users.phone_number,
      },
    })
    .from(subscriptions)
    .where(where_clauses.length ? and(...where_clauses) : undefined)
    .leftJoin(users, eq(subscriptions.user_id, users.id))
    .orderBy(desc(subscriptions.start))

    .offset(Number(offset))
    .limit(Number(limit));

  const count_promise = await db
    .select({ count: count() })
    .from(subscriptions)
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

const update_status = async (
  id: string,
  status: "pending" | "accepted" | "rejected"
) => {
  const [result] = await db
    .update(subscriptions)
    .set({ status: status })
    .where(eq(subscriptions.id, id))
    .returning({ id: subscriptions.id });

  return result;
};

export const subscription_services = {
  create_subscription,
  get_my_subscriptions_history,
  get_subscriptions,
  update_status,
};
