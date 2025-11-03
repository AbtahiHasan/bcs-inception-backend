"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contact_validators = void 0;
const zod_1 = __importDefault(require("zod"));
const create_contact = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string().min(2).max(50),
        email: zod_1.default.email(),
        phone_number: zod_1.default.string().regex(/^(?:\+880|880|0)1[3-9]\d{8}$/),
        subject: zod_1.default.string().min(1),
        message: zod_1.default.string().min(10).max(1000),
    }),
});
exports.contact_validators = {
    create_contact,
};
