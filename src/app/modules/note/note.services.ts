import { count, desc, eq } from "drizzle-orm";
import { notes } from "../../../../drizzle/schema";
import { db } from "../../../db";

const create_note = async (payload: {
  title: string;
  description: string;
  pdf_link: string;
}) => {
  const result = await db.insert(notes).values(payload).returning();
  return result;
};

interface notes_query_params {
  page?: number;
  limit?: number;
}
const get_notes = async (params: notes_query_params) => {
  const { page = 1, limit = 10 } = params;

  const offset = (page - 1) * limit;

  const results_promise = await db
    .select()
    .from(notes)
    .orderBy(desc(notes.created_at))
    .offset(Number(offset))
    .limit(Number(limit));

  const count_promise = await db.select({ count: count() }).from(notes);

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

const delete_note = async (id: string) => {
  const result = await db.delete(notes).where(eq(notes.id, id)).returning();
  return result;
};

export const note_services = { create_note, get_notes, delete_note };
