import {
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  boolean,
  uniqueIndex,
  numeric,
} from "drizzle-orm/pg-core";

// ================= User & Auth =================

// Roles enum
export const user_role_enum = pgEnum("role", [
  "student",
  "admin",
  "super_admin",
]);

export const subscription_status_user_enum = pgEnum("subscription_status", [
  "active",
  "none",
]);

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  email_verified: boolean("email_verified").default(false).notNull(),
  phone_number: varchar("phone_number", { length: 20 }), // nullable for Better Auth
  role: user_role_enum("role").default("student"),
  subscription_status: subscription_status_user_enum("subscription_status")
    .default("none")
    .notNull(),
  image: text("image"),
  created_at: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updated_at: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  user_id: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  expires_at: timestamp("expires_at", { withTimezone: true }).notNull(),
  ip_address: text("ip_address"),
  user_agent: text("user_agent"),
  created_at: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updated_at: timestamp("updated_at", { withTimezone: true })
    .$onUpdate(() => new Date())
    .notNull(),
});

export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  user_id: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  account_id: text("account_id").notNull(),
  provider_id: text("provider_id").notNull(),
  access_token: text("access_token"),
  refresh_token: text("refresh_token"),
  id_token: text("id_token"),
  access_token_expires_at: timestamp("access_token_expires_at", {
    withTimezone: true,
  }),
  refresh_token_expires_at: timestamp("refresh_token_expires_at", {
    withTimezone: true,
  }),
  scope: text("scope"),
  password: text("password"),
  created_at: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updated_at: timestamp("updated_at", { withTimezone: true })
    .$onUpdate(() => new Date())
    .notNull(),
});

export const verification_tokens = pgTable("verification_tokens", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expires_at: timestamp("expires_at", { withTimezone: true }).notNull(),
  created_at: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updated_at: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// ================= Subscriptions =================
export const subscription_status_enum = pgEnum("subscription_status_enum", [
  "pending",
  "accepted",
  "rejected",
]);
export const payment_method_enum = pgEnum("payment_method_enum", [
  "bkash",
  "nagad",
]);

export const subscriptions = pgTable("subscriptions", {
  id: uuid("id").defaultRandom().primaryKey(),
  user_id: text("user_id")
    .notNull()
    .references(() => users.id),
  payment_method: payment_method_enum("payment_method").notNull(),
  phone_number: varchar("phone_number", { length: 20 }).notNull(),
  transaction_id: varchar("transaction_id", { length: 255 }).notNull(),
  status: subscription_status_enum("status").default("pending"),
  start: timestamp("start", { withTimezone: true }).defaultNow(),
  end: timestamp("end", { withTimezone: true }),
});

// ================= Contacts =================
export const contacts = pgTable("contacts", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone_number: varchar("phone_number", { length: 15 }).notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: varchar("message", { length: 1055 }).notNull(),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// ================= Subjects =================
export const subjects = pgTable("subjects", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).unique().notNull(),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// ================= Topics =================
export const topics = pgTable("topics", {
  id: uuid("id").primaryKey().defaultRandom(),
  subject_id: uuid("subject_id")
    .references(() => subjects.id, { onDelete: "cascade" })
    .notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// ================= Exams =================
export const exam_type_enum = pgEnum("exam_type", [
  "daily",
  "weekly",
  "monthly",
  "practice",
  "question bank",
]);

export const exams = pgTable("exams", {
  id: uuid("id").primaryKey().defaultRandom(),
  exam_code: varchar("exam_code", { length: 100 }).unique(),
  exam_type: exam_type_enum("exam_type").notNull(),
  title: varchar("title", { length: 350 }).notNull(),
  duration: integer("duration").notNull(),
  exam_date: timestamp("exam_date", { withTimezone: true }).notNull(),
  subject_id: uuid("subject_id")
    .references(() => subjects.id, { onDelete: "cascade" })
    .notNull(),
  topic_id: uuid("topic_id")
    .references(() => topics.id, { onDelete: "cascade" })
    .notNull(),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// ================= MCQs =================
export const ans_tag_enum = pgEnum("ans_tag", ["A", "B", "C", "D"]);

export const mcqs = pgTable("mcqs", {
  id: uuid("id").primaryKey().defaultRandom(),
  exam_id: uuid("exam_id")
    .references(() => exams.id, { onDelete: "cascade" })
    .notNull(),
  question: text("question").notNull(),
  question_image: text("question_image"),
  explanation: text("explanation").notNull(),
  explanation_image: text("explanation_image"),
  ans_tag: ans_tag_enum("ans_tag").notNull(),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// ================= Options =================
export const options = pgTable("options", {
  id: uuid("id").primaryKey().defaultRandom(),
  mcq_id: uuid("mcq_id")
    .references(() => mcqs.id, { onDelete: "cascade" })
    .notNull(),
  tag: ans_tag_enum("tag").notNull(),
  option: text("option").notNull(),
});

// ================= User Answers =================
export const user_answers = pgTable(
  "user_answers",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    exam_id: uuid("exam_id")
      .references(() => exams.id, { onDelete: "cascade" })
      .notNull(),
    user_id: text("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    mcq_id: uuid("mcq_id")
      .references(() => mcqs.id, { onDelete: "cascade" })
      .notNull(),
    ans_tag: ans_tag_enum("ans_tag").notNull(),
  },
  (table) => [
    index("exam_user_idx").on(table.exam_id, table.user_id),
    uniqueIndex("user_mcq_unique").on(table.user_id, table.mcq_id), // prevent duplicate answers
  ]
);

// ================= Performance =================

export const user_performances = pgTable("user_performances", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  exam_id: uuid("exam_id")
    .references(() => exams.id, { onDelete: "cascade" })
    .notNull(),
  marks: numeric("marks", { precision: 10, scale: 2 }),
  total_marks: numeric("total_marks", { precision: 10, scale: 2 }),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// ================= Notes =================
export const notes = pgTable("notes", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  pdf_link: text("pdf_link").notNull(),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
// ================= Notice =================
export const notices = pgTable("notices", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  urgent: boolean("urgent").notNull().default(false),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
