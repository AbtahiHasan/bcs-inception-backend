"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.not_found = void 0;
const http_status_1 = __importDefault(require("http-status"));
const not_found = (_req, res, _next) => {
    return res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: "API Not Found !!",
        error: "",
    });
};
exports.not_found = not_found;
