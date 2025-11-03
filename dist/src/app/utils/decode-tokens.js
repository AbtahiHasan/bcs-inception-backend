"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh_token_decode = exports.access_token_decode = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const access_token_decode = (token) => {
    const user_data = jsonwebtoken_1.default.verify(token, config_1.default.jwt.access_secret);
    const user = {
        id: user_data.id,
        name: user_data.name,
        email: user_data.email,
        phone_number: user_data.phone_number,
        role: user_data.role,
    };
    return user;
};
exports.access_token_decode = access_token_decode;
const refresh_token_decode = (token) => {
    const result = jsonwebtoken_1.default.verify(token, config_1.default.jwt.refresh_secret);
    return result;
};
exports.refresh_token_decode = refresh_token_decode;
