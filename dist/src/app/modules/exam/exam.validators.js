"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exam_validators = void 0;
const zod_1 = __importDefault(require("zod"));
const validators_1 = require("../../utils/validators");
const create_exam = zod_1.default.object({
    body: zod_1.default.object({
        exam_code: validators_1.required_string,
        exam_type: zod_1.default.enum([
            "daily",
            "weekly",
            "monthly",
            "practice",
            "question bank",
        ]),
        title: validators_1.required_string,
        duration: zod_1.default.number(),
        exam_date: validators_1.required_string,
        subject_id: zod_1.default.uuid(),
        topic_id: zod_1.default.uuid(),
    }),
});
const create_mcq = zod_1.default.object({
    body: zod_1.default.object({
        exam_id: validators_1.required_string,
        question: validators_1.required_string,
        explanation: zod_1.default.string().trim().optional(),
        ans_tag: zod_1.default.enum(["A", "B", "C", "D"]),
        options: zod_1.default.array(zod_1.default.object({
            tag: zod_1.default.enum(["A", "B", "C", "D"]),
            option: validators_1.required_string,
        })),
    }),
});
const create_bulk_mcqs = zod_1.default.object({
    body: zod_1.default
        .object({
        exam_id: validators_1.required_string,
        question: validators_1.required_string,
        explanation: zod_1.default.string().trim().optional(),
        ans_tag: zod_1.default.enum(["A", "B", "C", "D"]),
        options: zod_1.default.array(zod_1.default.object({
            tag: zod_1.default.enum(["A", "B", "C", "D"]),
            option: validators_1.required_string,
        })),
    })
        .array(),
});
const create_user_exam_ans = zod_1.default.object({
    body: zod_1.default
        .object({
        exam_id: zod_1.default.uuid(),
        mcq_id: zod_1.default.uuid(),
        ans_tag: zod_1.default.enum(["A", "B", "C", "D"]),
    })
        .array(),
});
exports.exam_validators = {
    create_exam,
    create_mcq,
    create_bulk_mcqs,
    create_user_exam_ans,
};
