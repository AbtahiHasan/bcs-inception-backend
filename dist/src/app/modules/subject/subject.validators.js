"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subject_validators = void 0;
const zod_1 = __importDefault(require("zod"));
const validators_1 = require("../../utils/validators");
const create_subject = zod_1.default.object({
    body: zod_1.default.object({
        title: validators_1.required_string,
    }),
});
exports.subject_validators = {
    create_subject,
};
