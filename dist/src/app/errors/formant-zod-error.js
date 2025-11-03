"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const format_zod_error = (err) => {
    let errorMessage = "";
    err.issues.forEach((issue) => {
        errorMessage += `${issue === null || issue === void 0 ? void 0 : issue.path[issue.path.length - 1]} is required. `;
    });
    const statusCode = http_status_1.default.BAD_REQUEST;
    return {
        statusCode,
        message: "Validation Error",
        errorMessage,
        errorDetails: err,
    };
};
exports.default = format_zod_error;
