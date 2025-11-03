"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.topic_validators = void 0;
const zod_1 = __importDefault(require("zod"));
const validators_1 = require("../../utils/validators");
const create_topic = zod_1.default.object({
    body: zod_1.default.object({
        subject_id: validators_1.required_string,
        title: validators_1.required_string,
    }),
});
exports.topic_validators = {
    create_topic,
};
