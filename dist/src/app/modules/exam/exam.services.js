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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exam_services = void 0;
const http_status_1 = __importDefault(require("http-status"));
const schema_1 = require("../../../../drizzle/schema");
const db_1 = require("../../../db");
const app_error_1 = __importDefault(require("../../errors/app-error"));
const drizzle_orm_1 = require("drizzle-orm");
const create_exam = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield db_1.db
        .insert(schema_1.exams)
        .values({
        exam_code: payload.exam_code,
        exam_type: payload.exam_type,
        title: payload.title,
        duration: payload.duration,
        exam_date: new Date(payload.exam_date),
        subject_id: payload.subject_id,
        topic_id: payload.topic_id,
    })
        .returning();
    return result;
});
const update_exam = (exam_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.db
        .update(schema_1.exams)
        .set({
        exam_code: payload.exam_code,
        exam_type: payload.exam_type,
        title: payload.title,
        duration: payload.duration,
        exam_date: new Date(payload.exam_date),
        subject_id: payload.subject_id,
        topic_id: payload.topic_id,
    })
        .where((0, drizzle_orm_1.eq)(schema_1.exams.id, exam_id));
});
const create_mcq = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = db_1.db.transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const exam_id = payload.exam_id;
        const mcq_data = {
            exam_id,
            question: payload.question,
            question_image: payload.question_image,
            explanation: payload.explanation,
            explanation_image: payload.explanation_image,
            ans_tag: payload.ans_tag,
        };
        const [mcq] = yield tx.insert(schema_1.mcqs).values(mcq_data).returning();
        if (!(mcq === null || mcq === void 0 ? void 0 : mcq.id))
            throw new app_error_1.default(http_status_1.default.OK, "failed to create mcq");
        const option_inserts = payload.options.map((opt) => ({
            mcq_id: mcq === null || mcq === void 0 ? void 0 : mcq.id,
            tag: opt.tag,
            option: opt.option,
        }));
        const optionsData = yield tx
            .insert(schema_1.options)
            .values(option_inserts)
            .returning();
        return Object.assign(Object.assign({}, mcq), { options: optionsData });
    }));
    return result;
});
const update_mcq = (mcq_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    db_1.db.transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        yield tx
            .update(schema_1.mcqs)
            .set({
            question: payload.question,
            question_image: payload.question_image,
            explanation: payload.explanation,
            explanation_image: payload.explanation_image,
            ans_tag: payload.ans_tag,
        })
            .where((0, drizzle_orm_1.eq)(schema_1.mcqs.id, mcq_id));
        yield tx.delete(schema_1.options).where((0, drizzle_orm_1.eq)(schema_1.options.mcq_id, mcq_id));
        const option_inserts = payload.options.map((opt) => ({
            mcq_id: mcq_id,
            tag: opt.tag,
            option: opt.option,
        }));
        yield tx.insert(schema_1.options).values(option_inserts);
    }));
});
const delete_mcq = (mcq_id) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.db.delete(schema_1.mcqs).where((0, drizzle_orm_1.eq)(schema_1.mcqs.id, mcq_id));
});
const create_bulk_mcqs = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const promises = [];
    payload.forEach((item) => {
        promises.push(create_mcq(item));
    });
    const result = yield Promise.all(promises);
    return result;
});
const get_exam = (id, exam_status) => __awaiter(void 0, void 0, void 0, function* () {
    if (exam_status == undefined) {
        exam_status = "live";
    }
    const rows = yield db_1.db
        .select()
        .from(schema_1.exams)
        .leftJoin(schema_1.mcqs, (0, drizzle_orm_1.eq)(schema_1.mcqs.exam_id, schema_1.exams.id))
        .leftJoin(schema_1.options, (0, drizzle_orm_1.eq)(schema_1.options.mcq_id, schema_1.mcqs.id))
        .where((0, drizzle_orm_1.eq)(schema_1.exams.id, id));
    const exam = rows[0].exams;
    const mcqMap = new Map();
    for (const row of rows) {
        const mcq = row.mcqs;
        const option = row.options;
        if (!mcq)
            continue;
        if (!mcqMap.has(mcq.id)) {
            mcqMap.set(mcq.id, Object.assign(Object.assign({
                id: mcq.id,
                exam_id: mcq.exam_id,
                question: mcq.question,
                question_image: mcq.question_image,
                explanation: mcq.explanation,
                explanation_image: mcq.explanation_image,
                created_at: mcq.created_at,
            }, (exam_status == "result" && { ans_tag: mcq.ans_tag })), { options: [] }));
        }
        if (option) {
            mcqMap.get(mcq.id).options.push(option);
        }
    }
    return Object.assign(Object.assign({}, exam), { mcqs: Array.from(mcqMap.values()) });
});
const get_exams = (params, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 10, search, exam_type, subject_id, selected_status, } = params;
    const offset = (page - 1) * limit;
    const where_clauses = [];
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    if (search)
        where_clauses.push((0, drizzle_orm_1.ilike)(schema_1.exams.title, `%${search}%`));
    if (exam_type && exam_type != "past" && exam_type !== "free")
        where_clauses.push((0, drizzle_orm_1.eq)(schema_1.exams.exam_type, exam_type));
    if (exam_type && (exam_type == "past" || exam_type == "free"))
        where_clauses.push((0, drizzle_orm_1.lt)(schema_1.exams.exam_date, startOfToday));
    if (exam_type && exam_type == "past")
        where_clauses.push((0, drizzle_orm_1.not)((0, drizzle_orm_1.eq)(schema_1.exams.exam_type, "question bank")));
    if (exam_type && exam_type == "free")
        where_clauses.push((0, drizzle_orm_1.eq)(schema_1.exams.exam_type, "weekly"));
    if (subject_id)
        where_clauses.push((0, drizzle_orm_1.eq)(schema_1.exams.subject_id, subject_id));
    if (selected_status) {
        const ids = yield get_user_taken_exams(user_id);
        if (selected_status === "Already Taken") {
            where_clauses.push((0, drizzle_orm_1.inArray)(schema_1.exams.id, ids));
        }
        if (selected_status === "Not Taken Yet") {
            where_clauses.push((0, drizzle_orm_1.not)((0, drizzle_orm_1.inArray)(schema_1.exams.id, ids)));
        }
    }
    const results_promise = yield db_1.db
        .select()
        .from(schema_1.exams)
        .where(where_clauses.length ? (0, drizzle_orm_1.and)(...where_clauses) : undefined)
        .orderBy((0, drizzle_orm_1.desc)(schema_1.exams.exam_date))
        .leftJoin(schema_1.subjects, (0, drizzle_orm_1.eq)(schema_1.subjects.id, schema_1.exams.subject_id))
        .leftJoin(schema_1.topics, (0, drizzle_orm_1.eq)(schema_1.topics.id, schema_1.exams.topic_id))
        .offset(Number(offset))
        .limit(Number(limit));
    const count_promise = yield db_1.db
        .select({ count: (0, drizzle_orm_1.count)() })
        .from(schema_1.exams)
        .where(where_clauses.length ? (0, drizzle_orm_1.and)(...where_clauses) : undefined);
    const [result, [total]] = yield Promise.all([results_promise, count_promise]);
    const total_page = Math.ceil(Number(total.count) / (params.limit || 10));
    const exam_data = result.map((item) => {
        var _a, _b;
        return ({
            id: item.exams.id,
            exam_code: item.exams.exam_code,
            exam_type: item.exams.exam_type,
            title: item.exams.title,
            duration: item.exams.duration,
            exam_date: item.exams.exam_date,
            subject_id: item.exams.subject_id,
            subject: (_a = item.subjects) === null || _a === void 0 ? void 0 : _a.title,
            topic: (_b = item.topics) === null || _b === void 0 ? void 0 : _b.title,
            topic_id: item.exams.topic_id,
            created_at: item.exams.created_at,
        });
    });
    return {
        data: exam_data,
        meta: {
            page: Number(page) || 1,
            limit: Number(limit),
            total: total.count,
            total_page,
        },
    };
});
const delete_exam = (exam_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.db
        .delete(schema_1.exams)
        .where((0, drizzle_orm_1.eq)(schema_1.exams.id, exam_id))
        .returning();
    return result;
});
const create_user_exam_ans = (user_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const data = [];
    payload.forEach((item) => {
        data.push(Object.assign(Object.assign({}, item), { user_id: user_id }));
    });
    const result = yield db_1.db.insert(schema_1.user_answers).values(data).returning();
    return result;
});
const get_user_ans = (user_id, exam_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.db
        .select()
        .from(schema_1.user_answers)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.user_answers.user_id, user_id), (0, drizzle_orm_1.eq)(schema_1.user_answers.exam_id, exam_id)));
    return result;
});
const get_user_taken_exams = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.db
        .select()
        .from(schema_1.user_answers)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.user_answers.user_id, user_id)));
    const uniqueExamIds = [...new Set(result.map((r) => r.exam_id))];
    return uniqueExamIds;
});
exports.exam_services = {
    create_exam,
    update_exam,
    create_mcq,
    update_mcq,
    delete_mcq,
    create_bulk_mcqs,
    get_exam,
    get_exams,
    delete_exam,
    create_user_exam_ans,
    get_user_ans,
    get_user_taken_exams,
};
