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
exports.user_services = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../../../../drizzle/schema");
const db_1 = require("../../../db");
const get_users = (params, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 10, search } = params;
    const offset = (page - 1) * limit;
    const where_clauses = [];
    if (search)
        where_clauses.push((0, drizzle_orm_1.ilike)(schema_1.users.email, `%${search}%`));
    where_clauses.push((0, drizzle_orm_1.not)((0, drizzle_orm_1.eq)(schema_1.users.id, user_id)));
    const results_promise = yield db_1.db
        .select({
        id: schema_1.users.id,
        name: schema_1.users.name,
        email: schema_1.users.email,
        phone_number: schema_1.users.phone_number,
        role: schema_1.users.role,
        created_at: schema_1.users.created_at,
    })
        .from(schema_1.users)
        .where(where_clauses.length ? (0, drizzle_orm_1.and)(...where_clauses) : undefined)
        .orderBy((0, drizzle_orm_1.desc)(schema_1.users.created_at), (0, drizzle_orm_1.desc)(schema_1.users.role))
        .offset(Number(offset))
        .limit(Number(limit));
    const count_promise = yield db_1.db
        .select({ count: (0, drizzle_orm_1.count)() })
        .from(schema_1.users)
        .where(where_clauses.length ? (0, drizzle_orm_1.and)(...where_clauses) : undefined);
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
const update_user_role = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield db_1.db
        .update(schema_1.users)
        .set({ role: payload.role })
        .where((0, drizzle_orm_1.eq)(schema_1.users.id, payload.user_id))
        .returning();
    return result;
});
exports.user_services = {
    get_users,
    update_user_role,
};
