"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analytics_services = void 0;
const db_1 = require("../../../db");
const schema_1 = require("../../../../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
const get_analytics = () => __awaiter(void 0, void 0, void 0, function* () {
    const seven_days_ago = new Date();
    seven_days_ago.setDate(seven_days_ago.getDate() - 7);
    const [users_tot_res, subjects_tot_res, topics_tot_res, exams_tot_res, contacts_tot_res, users_by_role, exams_by_type, recent_users_res, recent_exams_res, recent_contacts_list, subjects_with_counts,] = yield Promise.all([
        // totals
        db_1.db.select({ count: (0, drizzle_orm_1.sql) `CAST(COUNT(*) AS INT)` }).from(schema_1.users),
        db_1.db.select({ count: (0, drizzle_orm_1.sql) `CAST(COUNT(*) AS INT)` }).from(schema_1.subjects),
        db_1.db.select({ count: (0, drizzle_orm_1.sql) `CAST(COUNT(*) AS INT)` }).from(schema_1.topics),
        db_1.db.select({ count: (0, drizzle_orm_1.sql) `CAST(COUNT(*) AS INT)` }).from(schema_1.exams),
        db_1.db.select({ count: (0, drizzle_orm_1.sql) `CAST(COUNT(*) AS INT)` }).from(schema_1.contacts),
        // distributions
        db_1.db
            .select({
            role: schema_1.users.role,
            count: (0, drizzle_orm_1.sql) `CAST(COUNT(*) AS INT)`,
        })
            .from(schema_1.users)
            .groupBy(schema_1.users.role),
        db_1.db
            .select({
            type: schema_1.exams.exam_type,
            count: (0, drizzle_orm_1.sql) `CAST(COUNT(*) AS INT)`,
        })
            .from(schema_1.exams)
            .groupBy(schema_1.exams.exam_type),
        // recent activity
        db_1.db
            .select({ count: (0, drizzle_orm_1.sql) `CAST(COUNT(*) AS INT)` })
            .from(schema_1.users)
            .where((0, drizzle_orm_1.gte)(schema_1.users.created_at, seven_days_ago)),
        db_1.db
            .select({ count: (0, drizzle_orm_1.sql) `CAST(COUNT(*) AS INT)` })
            .from(schema_1.exams)
            .where((0, drizzle_orm_1.gte)(schema_1.exams.created_at, seven_days_ago)),
        // recent contacts
        db_1.db
            .select({
            id: schema_1.contacts.id,
            name: schema_1.contacts.name,
            email: schema_1.contacts.email,
            subject: schema_1.contacts.subject,
            created_at: schema_1.contacts.created_at,
        })
            .from(schema_1.contacts)
            .orderBy((0, drizzle_orm_1.desc)(schema_1.contacts.created_at))
            .limit(5),
        // subjects with counts via $count
        db_1.db
            .select({
            id: schema_1.subjects.id,
            title: schema_1.subjects.title,
            created_at: schema_1.subjects.created_at,
            topic_count: db_1.db.$count(schema_1.topics, (0, drizzle_orm_1.eq)(schema_1.topics.subject_id, schema_1.subjects.id)),
            exam_count: db_1.db.$count(schema_1.exams, (0, drizzle_orm_1.eq)(schema_1.exams.subject_id, schema_1.subjects.id)),
        })
            .from(schema_1.subjects)
            .groupBy(schema_1.subjects.id, schema_1.subjects.title, schema_1.subjects.created_at)
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
});
exports.analytics_services = { get_analytics };
