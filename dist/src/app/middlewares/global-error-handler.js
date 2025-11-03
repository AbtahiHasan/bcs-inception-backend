"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.global_error_handler = void 0;
const zod_1 = require("zod");
const http_status_1 = __importDefault(require("http-status"));
const formant_zod_error_1 = __importDefault(require("../errors/formant-zod-error"));
const config_1 = __importDefault(require("../../config"));
const app_error_1 = __importDefault(require("../errors/app-error"));
const global_error_handler = (err, _, res, _next) => {
    // here default values
    let statusCode = http_status_1.default.INTERNAL_SERVER_ERROR;
    let message = "Internal server error!";
    let errorMessage = "";
    let errorDetails = {};
    // handle zod error
    if (err instanceof zod_1.ZodError) {
        const handledError = (0, formant_zod_error_1.default)(err);
        statusCode = handledError === null || handledError === void 0 ? void 0 : handledError.statusCode;
        message = handledError === null || handledError === void 0 ? void 0 : handledError.message;
        errorMessage = handledError === null || handledError === void 0 ? void 0 : handledError.errorMessage;
        errorDetails = handledError.errorDetails;
    }
    // handle custom app error
    else if (err instanceof app_error_1.default) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err.message;
    }
    //  handle default throw new Error
    else if (err instanceof Error) {
        message = err.message;
    }
    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
        statusCode = http_status_1.default.UNAUTHORIZED;
        message = "Unauthorized Access";
        errorMessage =
            "You do not have the necessary permissions to access this resource.";
        errorDetails = null;
        err.stack = null;
    }
    //   send error response
    return res.status(statusCode).json({
        success: false,
        message,
        errorMessage,
        errorDetails,
        stack: config_1.default.env === "development" ? err === null || err === void 0 ? void 0 : err.stack : null,
    });
};
exports.global_error_handler = global_error_handler;
