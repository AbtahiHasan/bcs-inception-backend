"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscription_validators = void 0;
const zod_1 = __importDefault(require("zod"));
const create_subscription = zod_1.default.object({
    body: zod_1.default.object({
        phone_number: zod_1.default
            .string()
            .min(11, { message: "Phone number must be at least 10 digits" })
            .regex(/^(?:\+880|880|0)1[3-9]\d{8}$/, {
            message: "Please enter a valid phone number",
        }),
        transaction_id: zod_1.default.string().min(1, "Please enter a transaction id"),
    }),
});
exports.subscription_validators = {
    create_subscription,
};
