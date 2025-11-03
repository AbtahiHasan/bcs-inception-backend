"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh_token_encode = exports.access_token_encode = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const access_token_encode = (user) => {
    const token = jsonwebtoken_1.default.sign(user, config_1.default.jwt.access_secret, {
        algorithm: "HS256",
        expiresIn: config_1.default.jwt.access_expires_in,
    });
    return token;
};
exports.access_token_encode = access_token_encode;
const refresh_token_encode = (user_id) => {
    const token = jsonwebtoken_1.default.sign({ user_id }, config_1.default.jwt.refresh_secret, {
        algorithm: "HS256",
        expiresIn: config_1.default.jwt.refresh_expires_in,
    });
    return token;
};
exports.refresh_token_encode = refresh_token_encode;
