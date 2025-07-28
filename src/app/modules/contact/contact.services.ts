import { count } from "drizzle-orm";
import { contacts } from "../../../../drizzle/schema";
import { db } from "../../../db";
import { i_contact } from "./contact.interface";

const create_contact = async (payload: i_contact) => {
  const [result] = await db.insert(contacts).values(payload).returning();
  return result;
};
interface exam_query_params {
  page?: number;
  limit?: number;
}
const get_contacts = async (params: exam_query_params) => {
  const { page = 1, limit = 20 } = params;
  const offset = (page - 1) * limit;
  const results_promise = await db
    .select()
    .from(contacts)
    .offset(Number(offset))
    .limit(Number(limit));

  const count_promise = await db.select({ count: count() }).from(contacts);

  const [result, [total]] = await Promise.all([results_promise, count_promise]);
  const total_page = Math.ceil(Number(total.count) / (limit || 10));
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

export const contact_services = { create_contact, get_contacts };
