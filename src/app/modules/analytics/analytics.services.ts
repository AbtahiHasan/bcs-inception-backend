import { db } from "../../../db";
import {
  contacts,
  exams,
  subjects,
  topics,
  users,
} from "../../../../drizzle/schema";
import { desc, eq, gte, sql } from "drizzle-orm";

const get_analytics = async () => {
  const seven_days_ago = new Date();
  seven_days_ago.setDate(seven_days_ago.getDate() - 7);

  const [
    users_tot_res,
    subjects_tot_res,
    topics_tot_res,
    exams_tot_res,
    contacts_tot_res,
    users_by_role,
    exams_by_type,
    recent_users_res,
    recent_exams_res,
    recent_contacts_list,
    subjects_with_counts,
  ] = await Promise.all([
    // totals
    db.select({ count: sql<number>`CAST(COUNT(*) AS INT)` }).from(users),
    db.select({ count: sql<number>`CAST(COUNT(*) AS INT)` }).from(subjects),
    db.select({ count: sql<number>`CAST(COUNT(*) AS INT)` }).from(topics),
    db.select({ count: sql<number>`CAST(COUNT(*) AS INT)` }).from(exams),
    db.select({ count: sql<number>`CAST(COUNT(*) AS INT)` }).from(contacts),
    // distributions
    db
      .select({
        role: users.role,
        count: sql<number>`CAST(COUNT(*) AS INT)`,
      })
      .from(users)
      .groupBy(users.role),
    db
      .select({
        type: exams.exam_type,
        count: sql<number>`CAST(COUNT(*) AS INT)`,
      })
      .from(exams)
      .groupBy(exams.exam_type),
    // recent activity
    db
      .select({ count: sql<number>`CAST(COUNT(*) AS INT)` })
      .from(users)
      .where(gte(users.created_at, seven_days_ago)),
    db
      .select({ count: sql<number>`CAST(COUNT(*) AS INT)` })
      .from(exams)
      .where(gte(exams.created_at, seven_days_ago)),
    // recent contacts
    db
      .select({
        id: contacts.id,
        name: contacts.name,
        email: contacts.email,
        subject: contacts.subject,
        created_at: contacts.created_at,
      })
      .from(contacts)
      .orderBy(desc(contacts.created_at))
      .limit(5),
    // subjects with counts via $count
    db
      .select({
        id: subjects.id,
        title: subjects.title,
        created_at: subjects.created_at,
        topic_count: db.$count(topics, eq(topics.subject_id, subjects.id)),
        exam_count: db.$count(exams, eq(exams.subject_id, subjects.id)),
      })
      .from(subjects)
      .groupBy(subjects.id, subjects.title, subjects.created_at)
      .limit(10),
  ]);

  return {
    totals: {
      users: users_tot_res[0].count,
      subjects: subjects_tot_res[0].count,
      topics: topics_tot_res[0].count,
      exams: exams_tot_res[0].count,
      contacts: contacts_tot_res[0].count,
    },
    users_by_role,
    exams_by_type,
    recent_activity: {
      users: recent_users_res[0].count,
      exams: recent_exams_res[0].count,
    },
    recent_contacts: recent_contacts_list,
    subjects_with_counts,
  };
};

export const analytics_services = { get_analytics };
