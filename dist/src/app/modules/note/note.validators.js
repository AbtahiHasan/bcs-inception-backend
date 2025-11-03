"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.note_validators = void 0;
const zod_1 = __importDefault(require("zod"));
const validators_1 = require("../../utils/validators");
const create_note = zod_1.default.object({
    body: zod_1.default.object({
        title: validators_1.required_string,
        description: validators_1.required_string,
        pdf_link: zod_1.default.url(),
    }),
});
exports.note_validators = {
    create_note,
};
