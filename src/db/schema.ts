import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

// ================= Users =================

export const user_role_enum = pgEnum("role", [
  "student",
  "admin",
  "super_admin",
]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).unique(),
  phone_number: varchar("phone_number", { length: 20 }),
  password: varchar("password", { length: 255 }),
  role: user_role_enum("role"),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// ================= Subjects =================
export const subjects = pgTable("subjects", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }),
});

export const subjectsRelations = relations(subjects, ({ many }) => ({
  topics: many(topics),
  exams: many(exams),
}));

// ================= Topics =================
export const topics = pgTable("topics", {
  id: uuid("id").primaryKey().defaultRandom(),
  subject_id: varchar("subject_id", { length: 255 }).references(
    () => subjects.id
  ),
  title: varchar("title", { length: 255 }),
});

export const topicsRelations = relations(topics, ({ one, many }) => ({
  subject: one(subjects, {
    fields: [topics.subject_id],
    references: [subjects.id],
  }),
  exams: many(exams),
}));

// ================= Exams =================
export const exam_type_enum = pgEnum("exam_type", [
  "daily",
  "weekly",
  "monthly",
  "practice",
  "free",
]);

export const exams = pgTable("exams", {
  id: uuid("id").primaryKey().defaultRandom(),
  exam_code: varchar("exam_code", { length: 100 }).unique(),
  exam_type: exam_type_enum("exam_type"),
  duration: integer("duration"),
  exam_date: timestamp("exam_date", { withTimezone: true }),
  subject_id: varchar("subject_id", { length: 255 }).references(
    () => subjects.id
  ),
  topic_id: varchar("topic_id", { length: 255 }).references(() => topics.id),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const examsRelations = relations(exams, ({ one, many }) => ({
  subject: one(subjects, {
    fields: [exams.subject_id],
    references: [subjects.id],
  }),
  topic: one(topics, {
    fields: [exams.topic_id],
    references: [topics.id],
  }),
  mcqs: many(mcqs),
}));

// ================= MCQs =================
export const mcqs = pgTable("mcqs", {
  id: uuid("id").primaryKey().defaultRandom(),
  exam_id: varchar("exam_id", { length: 255 }).references(() => exams.id),
  question: text("question"),
  explanation: text("explanation"),
  ans_tag: varchar("ans_tag", { length: 10 }),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const mcqsRelations = relations(mcqs, ({ one, many }) => ({
  exam: one(exams, {
    fields: [mcqs.exam_id],
    references: [exams.id],
  }),
  options: many(options),
}));

// ================= Options =================
export const options = pgTable("options", {
  id: uuid("id").primaryKey().defaultRandom(),
  mcq_id: varchar("mcq_id", { length: 255 }).references(() => mcqs.id),
  tag: varchar("tag", { length: 10 }),
  option: text("option"),
});

export const optionsRelations = relations(options, ({ one }) => ({
  mcq: one(mcqs, {
    fields: [options.mcq_id],
    references: [mcqs.id],
  }),
}));
