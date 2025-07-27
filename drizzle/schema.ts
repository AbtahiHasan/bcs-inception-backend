import { relations } from "drizzle-orm";
import {
  index,
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
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).unique(),
  phone_number: varchar("phone_number", { length: 20 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  role: user_role_enum("role").default("student"),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const user_relations = relations(users, ({ many }) => ({
  user_answers: many(user_answers),
}));

// ================= Subjects =================
export const subjects = pgTable("subjects", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).unique().notNull(),
});

export const subjects_relations = relations(subjects, ({ many }) => ({
  topics: many(topics),
  exams: many(exams),
}));

// ================= Topics =================
export const topics = pgTable("topics", {
  id: uuid("id").primaryKey().defaultRandom(),
  subject_id: uuid("subject_id")
    .references(() => subjects.id, {
      onDelete: "cascade",
    })
    .notNull(),
  title: varchar("title", { length: 255 }).notNull(),
});

export const topics_relations = relations(topics, ({ one, many }) => ({
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
  exam_type: exam_type_enum("exam_type").notNull(),
  title: varchar("title", { length: 350 }).notNull(),
  duration: integer("duration").notNull(),
  exam_date: timestamp("exam_date", { withTimezone: true }).notNull(),
  subject_id: uuid("subject_id")
    .references(() => subjects.id, {
      onDelete: "cascade",
    })
    .notNull(),
  topic_id: uuid("topic_id")
    .references(() => topics.id, {
      onDelete: "cascade",
    })
    .notNull(),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const exams_relations = relations(exams, ({ one, many }) => ({
  subject: one(subjects, {
    fields: [exams.subject_id],
    references: [subjects.id],
  }),
  topic: one(topics, {
    fields: [exams.topic_id],
    references: [topics.id],
  }),
  mcqs: many(mcqs),
  user_answers: many(user_answers),
}));

// ================= MCQs =================

export const ans_tag_enum = pgEnum("ans_tag", ["A", "B", "C", "D"]);
export const mcqs = pgTable("mcqs", {
  id: uuid("id").primaryKey().defaultRandom(),
  exam_id: uuid("exam_id")
    .references(() => exams.id, {
      onDelete: "cascade",
    })
    .notNull(),
  question: text("question").notNull(),
  explanation: text("explanation").notNull(),
  ans_tag: ans_tag_enum("ans_tag").notNull(),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const mcqs_relations = relations(mcqs, ({ one, many }) => ({
  exam: one(exams, {
    fields: [mcqs.exam_id],
    references: [exams.id],
  }),
  options: many(options),
  user_answers: many(user_answers),
}));

// ================= Options =================
export const options = pgTable("options", {
  id: uuid("id").primaryKey().defaultRandom(),
  mcq_id: uuid("mcq_id")
    .references(() => mcqs.id, {
      onDelete: "cascade",
    })
    .notNull(),
  tag: ans_tag_enum("tag").notNull(),
  option: text("option").notNull(),
});

export const options_relations = relations(options, ({ one }) => ({
  mcq: one(mcqs, {
    fields: [options.mcq_id],
    references: [mcqs.id],
  }),
}));

// ================= User Answers =================

export const user_answers = pgTable(
  "user_answers",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    exam_id: uuid("exam_id")
      .references(() => exams.id, {
        onDelete: "cascade",
      })
      .notNull(),
    user_id: uuid("user_id")
      .references(() => users.id, {
        onDelete: "cascade",
      })
      .notNull(),
    mcq_id: uuid("mcq_id")
      .references(() => mcqs.id, {
        onDelete: "cascade",
      })
      .notNull(),
    ans_tag: ans_tag_enum("ans_tag").notNull(),
  },
  (table) => [index("exam_user_idx").on(table.exam_id, table.user_id)]
);
