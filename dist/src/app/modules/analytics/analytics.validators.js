"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth_validators = void 0;
const zod_1 = __importDefault(require("zod"));
const validators_1 = require("../../utils/validators");
const register_user = zod_1.default.object({
    name: zod_1.default
        .string()
        .min(2, { message: "Name must be at least 2 characters long" })
        .max(50, { message: "Name must be less than 50 characters" })
        .trim(),
    email: zod_1.default.email({ message: "Please enter a valid email address" }).trim(),
    phone_number: zod_1.default
        .string()
        .min(11, { message: "Phone number must be at least 10 digits" })
        .regex(/^(?:\+880|880|0)1[3-9]\d{8}$/, {
        message: "Please enter a valid phone number",
    })
        .trim(),
    password: zod_1.default
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/[a-zA-Z]/, { message: "Password must contain at least one letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain at least one special character",
    })
        .max(16, { message: "Password can maximum 16 characters long" })
        .trim(),
});
const login_user = zod_1.default.object({
    body: zod_1.default.object({
        email: zod_1.default.email(),
        password: validators_1.required_string,
    }),
});
exports.auth_validators = {
    register_user,
    login_user,
};
