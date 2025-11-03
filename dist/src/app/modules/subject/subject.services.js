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
exports.subject_services = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../../../../drizzle/schema");
const db_1 = require("../../../db");
const create_subject = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield db_1.db
        .insert(schema_1.subjects)
        .values({ title: payload.title })
        .returning();
    return result;
});
const get_all_subjects = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.db
        .select()
        .from(schema_1.subjects)
        .orderBy((0, drizzle_orm_1.desc)(schema_1.subjects.created_at));
    return result;
});
exports.subject_services = { create_subject, get_all_subjects };
