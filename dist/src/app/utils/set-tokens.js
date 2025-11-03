"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.set_tokens = void 0;
const config_1 = __importDefault(require("../../config"));
const set_tokens = (res, tokens) => {
    // TODO change some site or domain
    res.cookie("access_token", tokens.access_token, {
        httpOnly: config_1.default.env == "production",
        secure: config_1.default.env == "production",
        sameSite: config_1.default.env == "production" ? "none" : "lax",
        maxAge: 24 * 30 * 60 * 60 * 1000,
        // domain: config.domain,
    });
    res.cookie("refresh_token", tokens.refresh_token, {
        httpOnly: config_1.default.env == "production",
        secure: config_1.default.env == "production",
        sameSite: config_1.default.env == "production" ? "none" : "lax",
        maxAge: 12 * 24 * 30 * 60 * 60 * 1000,
        // domain: config.domain,
    });
};
exports.set_tokens = set_tokens;
