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
exports.user_controllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catch_async_1 = __importDefault(require("../../utils/catch-async"));
const send_response_1 = require("../../utils/send-response");
const user_services_1 = require("./user.services");
const get_users = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_services_1.user_services.get_users(req.query, req.user.id);
    (0, send_response_1.send_response)(res, {
        success: true,
        status_code: http_status_1.default.OK,
        message: "users fetched successfully",
        data: result.data,
        meta: result.meta,
    });
}));
const update_user_role = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_services_1.user_services.update_user_role(req.body);
    (0, send_response_1.send_response)(res, {
        success: true,
        status_code: http_status_1.default.OK,
        message: "user role updated successfully",
        data: result,
    });
}));
exports.user_controllers = {
    get_users,
    update_user_role,
};
