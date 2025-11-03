"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const neon_serverless_1 = require("drizzle-orm/neon-serverless");
const config_1 = __importDefault(require("./config"));
exports.db = (0, neon_serverless_1.drizzle)(config_1.default.database_url);
