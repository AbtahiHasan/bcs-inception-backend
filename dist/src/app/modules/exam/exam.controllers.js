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
exports.exam_controllers = void 0;
const catch_async_1 = __importDefault(require("../../utils/catch-async"));
const send_response_1 = require("../../utils/send-response");
const exam_services_1 = require("./exam.services");
const http_status_1 = __importDefault(require("http-status"));
const create_exam = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield exam_services_1.exam_services.create_exam(req.body);
    (0, send_response_1.send_response)(res, {
        success: true,
        status_code: http_status_1.default.OK,
        message: "exam created successfully",
        data: result,
    });
}));
const update_exam = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield exam_services_1.exam_services.update_exam(req.params.id, req.body);
    (0, send_response_1.send_response)(res, {
        success: true,
        status_code: http_status_1.default.OK,
        message: "exam update successfully",
        data: null,
    });
}));
const create_mcq = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield exam_services_1.exam_services.create_mcq(req.body);
    (0, send_response_1.send_response)(res, {
        success: true,
        status_code: http_status_1.default.OK,
        message: "mcq created successfully",
        data: result,
    });
}));
const update_mcq = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield exam_services_1.exam_services.update_mcq(req.params.id, req.body);
    (0, send_response_1.send_response)(res, {
        success: true,
        status_code: http_status_1.default.OK,
        message: "mcq updated successfully",
        data: result,
    });
}));
const delete_mcq = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield exam_services_1.exam_services.delete_mcq(req.params.id);
    (0, send_response_1.send_response)(res, {
        success: true,
        status_code: http_status_1.default.OK,
        message: "mcq deleted successfully",
        data: result,
    });
}));
const create_bulk_mcqs = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield exam_services_1.exam_services.create_bulk_mcqs(req.body);
    (0, send_response_1.send_response)(res, {
        success: true,
        status_code: http_status_1.default.OK,
        message: "mcqs created successfully",
        data: result,
    });
}));
const get_exam = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield exam_services_1.exam_services.get_exam(req.params.id, (_a = req.query) === null || _a === void 0 ? void 0 : _a.exam_status);
    (0, send_response_1.send_response)(res, {
        success: true,
        status_code: http_status_1.default.OK,
        message: "exam fetched successfully",
        data: result,
    });
}));
const get_exams = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield exam_services_1.exam_services.get_exams(req.query, req.user.id);
    (0, send_response_1.send_response)(res, {
        success: true,
        status_code: http_status_1.default.OK,
        message: "exams fetched successfully",
        data: result.data,
        meta: result.meta,
    });
}));
const delete_exam = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield exam_services_1.exam_services.delete_exam(req.params.id);
    (0, send_response_1.send_response)(res, {
        success: true,
        status_code: http_status_1.default.OK,
        message: "exam delete successfully",
        data: result,
    });
}));
const create_user_exam_ans = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield exam_services_1.exam_services.create_user_exam_ans(req.user.id, req.body);
    (0, send_response_1.send_response)(res, {
        success: true,
        status_code: http_status_1.default.OK,
        message: "user exam ans created successfully",
        data: result,
    });
}));
const get_user_ans = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield exam_services_1.exam_services.get_user_ans(req.user.id, req.params.id);
    (0, send_response_1.send_response)(res, {
        success: true,
        status_code: http_status_1.default.OK,
        message: "user exam ans fetched successfully",
        data: result,
    });
}));
const get_user_taken_exams = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield exam_services_1.exam_services.get_user_taken_exams(req.user.id);
    (0, send_response_1.send_response)(res, {
        success: true,
        status_code: http_status_1.default.OK,
        message: "user taken fetched successfully",
        data: result,
    });
}));
exports.exam_controllers = {
    create_exam,
    update_exam,
    create_mcq,
    update_mcq,
    delete_mcq,
    create_bulk_mcqs,
    get_exam,
    get_exams,
    delete_exam,
    create_user_exam_ans,
    get_user_ans,
    get_user_taken_exams,
};
