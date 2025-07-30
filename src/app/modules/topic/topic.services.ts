import { desc } from "drizzle-orm";
import { topics } from "../../../../drizzle/schema";
import { db } from "../../../db";

const create_topic = async (payload: { title: string; subject_id: string }) => {
  const [result] = await db
    .insert(topics)
    .values({ title: payload.title, subject_id: payload.subject_id })
    .returning();

  return result;
};
const get_all_topics = async () => {
  const result = await db
    .select()
    .from(topics)
    .orderBy(desc(topics.created_at));

  return result;
};

export const topic_services = { create_topic, get_all_topics };
