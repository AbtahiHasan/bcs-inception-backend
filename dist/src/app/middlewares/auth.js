"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("better-auth/node");
const http_status_1 = __importDefault(require("http-status"));
const app_error_1 = __importDefault(require("../errors/app-error"));
const auth_1 = require("../lib/auth");
const catch_async_1 = __importDefault(require("../utils/catch-async"));
const auth = (roles) => {
    return (0, catch_async_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const session = yield auth_1.auth.api.getSession({
            headers: (0, node_1.fromNodeHeaders)(req.headers),
        });
        if (!(session === null || session === void 0 ? void 0 : session.user)) {
            throw new app_error_1.default(http_status_1.default.NOT_FOUND, "This user is not found !");
        }
        if (!roles.includes((_a = session === null || session === void 0 ? void 0 : session.user) === null || _a === void 0 ? void 0 : _a.role)) {
            throw new app_error_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized!");
        }
        req.user = session === null || session === void 0 ? void 0 : session.user;
        next();
    }));
};
exports.default = auth;
