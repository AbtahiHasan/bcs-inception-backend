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
exports.note_services = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../../../../drizzle/schema");
const db_1 = require("../../../db");
const create_note = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.db.insert(schema_1.notes).values(payload).returning();
    return result;
});
const get_notes = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 10 } = params;
    const offset = (page - 1) * limit;
    const results_promise = yield db_1.db
        .select()
        .from(schema_1.notes)
        .orderBy((0, drizzle_orm_1.desc)(schema_1.notes.created_at))
        .offset(Number(offset))
        .limit(Number(limit));
    const count_promise = yield db_1.db.select({ count: (0, drizzle_orm_1.count)() }).from(schema_1.notes);
    const [result, [total]] = yield Promise.all([results_promise, count_promise]);
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
});
const delete_note = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.db.delete(schema_1.notes).where((0, drizzle_orm_1.eq)(schema_1.notes.id, id)).returning();
    return result;
});
exports.note_services = { create_note, get_notes, delete_note };
