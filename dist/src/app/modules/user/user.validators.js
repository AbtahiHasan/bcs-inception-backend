"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_validators = void 0;
const zod_1 = __importDefault(require("zod"));
const update_user_role = zod_1.default.object({
    body: zod_1.default.object({
        user_id: zod_1.default.uuid(),
        role: zod_1.default.enum(["student", "admin"]),
    }),
});
exports.user_validators = {
    update_user_role,
};
