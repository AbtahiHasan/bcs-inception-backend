import { desc } from "drizzle-orm";
import { subjects } from "../../../../drizzle/schema";
import { db } from "../../../db";

const create_subject = async (payload: { title: string }) => {
  const [result] = await db
    .insert(subjects)
    .values({ title: payload.title })
    .returning();

  return result;
};
const get_all_subjects = async () => {
  const result = await db
    .select()
    .from(subjects)
    .orderBy(desc(subjects.created_at));

  return result;
};

export const subject_services = { create_subject, get_all_subjects };
