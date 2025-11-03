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
exports.subject_controllers = void 0;
const catch_async_1 = __importDefault(require("../../utils/catch-async"));
const send_response_1 = require("../../utils/send-response");
const subject_services_1 = require("./subject.services");
const http_status_1 = __importDefault(require("http-status"));
const create_subject = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield subject_services_1.subject_services.create_subject(req.body);
    (0, send_response_1.send_response)(res, {
        success: true,
        status_code: http_status_1.default.OK,
        data: result,
    });
}));
const get_all_subjects = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield subject_services_1.subject_services.get_all_subjects();
    (0, send_response_1.send_response)(res, {
        success: true,
        status_code: http_status_1.default.OK,
        data: result,
    });
}));
exports.subject_controllers = {
    create_subject,
    get_all_subjects,
};
