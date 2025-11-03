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
exports.subscription_services = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../../../../drizzle/schema");
const db_1 = require("../../../db");
const create_subscription = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield db_1.db
        .insert(schema_1.subscriptions)
        .values(Object.assign({}, payload))
        .returning({ id: schema_1.subscriptions.id });
    return result;
});
const get_my_subscriptions_history = (user_id, params) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 10 } = params;
    const offset = (page - 1) * limit;
    const results_promise = yield db_1.db
        .select()
        .from(schema_1.subscriptions)
        .where((0, drizzle_orm_1.eq)(schema_1.subscriptions.user_id, user_id))
        .orderBy((0, drizzle_orm_1.desc)(schema_1.subscriptions.start))
        .offset(Number(offset))
        .limit(Number(limit));
    const count_promise = yield db_1.db
        .select({ count: (0, drizzle_orm_1.count)() })
        .from(schema_1.subscriptions)
        .where((0, drizzle_orm_1.eq)(schema_1.subscriptions.user_id, user_id));
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
const get_subscriptions = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 10, search, status } = params;
    const offset = (page - 1) * limit;
    const where_clauses = [];
    if (search)
        where_clauses.push((0, drizzle_orm_1.eq)(schema_1.subscriptions.transaction_id, search));
    if (status)
        where_clauses.push((0, drizzle_orm_1.eq)(schema_1.subscriptions.status, status));
    const results_promise = yield db_1.db
        .select({
        id: schema_1.subscriptions.id,
        user_id: schema_1.subscriptions.user_id,
        phone_number: schema_1.subscriptions.phone_number,
        transaction_id: schema_1.subscriptions.transaction_id,
        status: schema_1.subscriptions.status,
        start: schema_1.subscriptions.start,
        end: schema_1.subscriptions.end,
        user_info: {
            name: schema_1.users.name,
            email: schema_1.users.email,
            phone_number: schema_1.users.phone_number,
        },
    })
        .from(schema_1.subscriptions)
        .where(where_clauses.length ? (0, drizzle_orm_1.and)(...where_clauses) : undefined)
        .leftJoin(schema_1.users, (0, drizzle_orm_1.eq)(schema_1.subscriptions.user_id, schema_1.users.id))
        .orderBy((0, drizzle_orm_1.desc)(schema_1.subscriptions.start))
        .offset(Number(offset))
        .limit(Number(limit));
    const count_promise = yield db_1.db
        .select({ count: (0, drizzle_orm_1.count)() })
        .from(schema_1.subscriptions)
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
const update_status = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield db_1.db
        .update(schema_1.subscriptions)
        .set({ status: status })
        .where((0, drizzle_orm_1.eq)(schema_1.subscriptions.id, id))
        .returning({ id: schema_1.subscriptions.id });
    return result;
});
exports.subscription_services = {
    create_subscription,
    get_my_subscriptions_history,
    get_subscriptions,
    update_status,
};
