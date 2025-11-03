"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.required_string = void 0;
const zod_1 = require("zod");
exports.required_string = zod_1.z.string().trim().min(1, "required");
