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
exports.topic_controllers = void 0;
const catch_async_1 = __importDefault(require("../../utils/catch-async"));
const send_response_1 = require("../../utils/send-response");
const topic_services_1 = require("./topic.services");
const http_status_1 = __importDefault(require("http-status"));
const create_topic = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield topic_services_1.topic_services.create_topic(req.body);
    (0, send_response_1.send_response)(res, {
        success: true,
        status_code: http_status_1.default.OK,
        message: "topic created successfully",
        data: result,
    });
}));
const get_all_topics = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield topic_services_1.topic_services.get_all_topics();
    (0, send_response_1.send_response)(res, {
        success: true,
        status_code: http_status_1.default.OK,
        message: "topics fetched successfully",
        data: result,
    });
}));
exports.topic_controllers = {
    create_topic,
    get_all_topics,
};
