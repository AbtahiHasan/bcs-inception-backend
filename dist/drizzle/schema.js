"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notes = exports.user_answers = exports.options = exports.mcqs = exports.ans_tag_enum = exports.exams = exports.exam_type_enum = exports.topics = exports.subjects = exports.contacts = exports.subscriptions = exports.subscription_status_enum = exports.verification_tokens = exports.accounts = exports.sessions = exports.users = exports.user_role_enum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
// ================= User & Auth =================
// Roles enum
exports.user_role_enum = (0, pg_core_1.pgEnum)("role", [
    "student",
    "admin",
    "super_admin",
]);
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.text)("id").primaryKey(),
    name: (0, pg_core_1.text)("name").notNull(),
    email: (0, pg_core_1.text)("email").notNull().unique(),
    email_verified: (0, pg_core_1.boolean)("email_verified").default(false).notNull(),
    phone_number: (0, pg_core_1.varchar)("phone_number", { length: 20 }), // nullable for Better Auth
    role: (0, exports.user_role_enum)("role").default("student"),
    image: (0, pg_core_1.text)("image"),
    created_at: (0, pg_core_1.timestamp)("created_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
    updated_at: (0, pg_core_1.timestamp)("updated_at", { withTimezone: true })
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});
exports.sessions = (0, pg_core_1.pgTable)("sessions", {
    id: (0, pg_core_1.text)("id").primaryKey(),
    user_id: (0, pg_core_1.text)("user_id")
        .notNull()
        .references(() => exports.users.id, { onDelete: "cascade" }),
    token: (0, pg_core_1.text)("token").notNull().unique(),
    expires_at: (0, pg_core_1.timestamp)("expires_at", { withTimezone: true }).notNull(),
    ip_address: (0, pg_core_1.text)("ip_address"),
    user_agent: (0, pg_core_1.text)("user_agent"),
    created_at: (0, pg_core_1.timestamp)("created_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
    updated_at: (0, pg_core_1.timestamp)("updated_at", { withTimezone: true })
        .$onUpdate(() => new Date())
        .notNull(),
});
exports.accounts = (0, pg_core_1.pgTable)("accounts", {
    id: (0, pg_core_1.text)("id").primaryKey(),
    user_id: (0, pg_core_1.text)("user_id")
        .notNull()
        .references(() => exports.users.id, { onDelete: "cascade" }),
    account_id: (0, pg_core_1.text)("account_id").notNull(),
    provider_id: (0, pg_core_1.text)("provider_id").notNull(),
    access_token: (0, pg_core_1.text)("access_token"),
    refresh_token: (0, pg_core_1.text)("refresh_token"),
    id_token: (0, pg_core_1.text)("id_token"),
    access_token_expires_at: (0, pg_core_1.timestamp)("access_token_expires_at", {
        withTimezone: true,
    }),
    refresh_token_expires_at: (0, pg_core_1.timestamp)("refresh_token_expires_at", {
        withTimezone: true,
    }),
    scope: (0, pg_core_1.text)("scope"),
    password: (0, pg_core_1.text)("password"),
    created_at: (0, pg_core_1.timestamp)("created_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
    updated_at: (0, pg_core_1.timestamp)("updated_at", { withTimezone: true })
        .$onUpdate(() => new Date())
        .notNull(),
});
exports.verification_tokens = (0, pg_core_1.pgTable)("verification_tokens", {
    id: (0, pg_core_1.text)("id").primaryKey(),
    identifier: (0, pg_core_1.text)("identifier").notNull(),
    value: (0, pg_core_1.text)("value").notNull(),
    expires_at: (0, pg_core_1.timestamp)("expires_at", { withTimezone: true }).notNull(),
    created_at: (0, pg_core_1.timestamp)("created_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
    updated_at: (0, pg_core_1.timestamp)("updated_at", { withTimezone: true })
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});
// ================= Subscriptions =================
exports.subscription_status_enum = (0, pg_core_1.pgEnum)("subscription_status_enum", [
    "pending",
    "accepted",
    "rejected",
]);
exports.subscriptions = (0, pg_core_1.pgTable)("subscriptions", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
    user_id: (0, pg_core_1.text)("user_id")
        .notNull()
        .references(() => exports.users.id),
    phone_number: (0, pg_core_1.varchar)("phone_number", { length: 20 }).notNull(),
    transaction_id: (0, pg_core_1.varchar)("transaction_id", { length: 255 }).notNull(),
    status: (0, exports.subscription_status_enum)("status").default("pending"),
    start: (0, pg_core_1.timestamp)("start", { withTimezone: true }).defaultNow(),
    end: (0, pg_core_1.timestamp)("end", { withTimezone: true }),
});
// ================= Contacts =================
exports.contacts = (0, pg_core_1.pgTable)("contacts", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull(),
    email: (0, pg_core_1.varchar)("email", { length: 255 }).notNull(),
    phone_number: (0, pg_core_1.varchar)("phone_number", { length: 15 }).notNull(),
    subject: (0, pg_core_1.varchar)("subject", { length: 255 }).notNull(),
    message: (0, pg_core_1.varchar)("message", { length: 1055 }).notNull(),
    created_at: (0, pg_core_1.timestamp)("created_at", { withTimezone: true }).defaultNow(),
});
// ================= Subjects =================
exports.subjects = (0, pg_core_1.pgTable)("subjects", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    title: (0, pg_core_1.varchar)("title", { length: 255 }).unique().notNull(),
    created_at: (0, pg_core_1.timestamp)("created_at", { withTimezone: true }).defaultNow(),
});
// ================= Topics =================
exports.topics = (0, pg_core_1.pgTable)("topics", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    subject_id: (0, pg_core_1.uuid)("subject_id")
        .references(() => exports.subjects.id, { onDelete: "cascade" })
        .notNull(),
    title: (0, pg_core_1.varchar)("title", { length: 255 }).notNull(),
    created_at: (0, pg_core_1.timestamp)("created_at", { withTimezone: true }).defaultNow(),
});
// ================= Exams =================
exports.exam_type_enum = (0, pg_core_1.pgEnum)("exam_type", [
    "daily",
    "weekly",
    "monthly",
    "practice",
    "question bank",
]);
exports.exams = (0, pg_core_1.pgTable)("exams", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    exam_code: (0, pg_core_1.varchar)("exam_code", { length: 100 }).unique(),
    exam_type: (0, exports.exam_type_enum)("exam_type").notNull(),
    title: (0, pg_core_1.varchar)("title", { length: 350 }).notNull(),
    duration: (0, pg_core_1.integer)("duration").notNull(),
    exam_date: (0, pg_core_1.timestamp)("exam_date", { withTimezone: true }).notNull(),
    subject_id: (0, pg_core_1.uuid)("subject_id")
        .references(() => exports.subjects.id, { onDelete: "cascade" })
        .notNull(),
    topic_id: (0, pg_core_1.uuid)("topic_id")
        .references(() => exports.topics.id, { onDelete: "cascade" })
        .notNull(),
    created_at: (0, pg_core_1.timestamp)("created_at", { withTimezone: true }).defaultNow(),
});
// ================= MCQs =================
exports.ans_tag_enum = (0, pg_core_1.pgEnum)("ans_tag", ["A", "B", "C", "D"]);
exports.mcqs = (0, pg_core_1.pgTable)("mcqs", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    exam_id: (0, pg_core_1.uuid)("exam_id")
        .references(() => exports.exams.id, { onDelete: "cascade" })
        .notNull(),
    question: (0, pg_core_1.text)("question").notNull(),
    question_image: (0, pg_core_1.text)("question_image"),
    explanation: (0, pg_core_1.text)("explanation").notNull(),
    explanation_image: (0, pg_core_1.text)("explanation_image"),
    ans_tag: (0, exports.ans_tag_enum)("ans_tag").notNull(),
    created_at: (0, pg_core_1.timestamp)("created_at", { withTimezone: true }).defaultNow(),
});
// ================= Options =================
exports.options = (0, pg_core_1.pgTable)("options", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    mcq_id: (0, pg_core_1.uuid)("mcq_id")
        .references(() => exports.mcqs.id, { onDelete: "cascade" })
        .notNull(),
    tag: (0, exports.ans_tag_enum)("tag").notNull(),
    option: (0, pg_core_1.text)("option").notNull(),
});
// ================= User Answers =================
exports.user_answers = (0, pg_core_1.pgTable)("user_answers", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    exam_id: (0, pg_core_1.uuid)("exam_id")
        .references(() => exports.exams.id, { onDelete: "cascade" })
        .notNull(),
    user_id: (0, pg_core_1.text)("user_id")
        .references(() => exports.users.id, { onDelete: "cascade" })
        .notNull(),
    mcq_id: (0, pg_core_1.uuid)("mcq_id")
        .references(() => exports.mcqs.id, { onDelete: "cascade" })
        .notNull(),
    ans_tag: (0, exports.ans_tag_enum)("ans_tag").notNull(),
}, (table) => [
    (0, pg_core_1.index)("exam_user_idx").on(table.exam_id, table.user_id),
    (0, pg_core_1.uniqueIndex)("user_mcq_unique").on(table.user_id, table.mcq_id), // prevent duplicate answers
]);
// ================= Notes =================
exports.notes = (0, pg_core_1.pgTable)("notes", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    title: (0, pg_core_1.text)("title").notNull(),
    description: (0, pg_core_1.text)("description").notNull(),
    pdf_link: (0, pg_core_1.text)("pdf_link").notNull(),
    created_at: (0, pg_core_1.timestamp)("created_at", { withTimezone: true }).defaultNow(),
});
