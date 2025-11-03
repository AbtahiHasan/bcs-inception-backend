"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.topic_routes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validate_request_1 = require("../../middlewares/validate-request");
const topic_controllers_1 = require("./topic.controllers");
const topic_validators_1 = require("./topic.validators");
const router = (0, express_1.Router)();
router.post("/create", (0, auth_1.default)(["admin", "super_admin"]), (0, validate_request_1.validate_request)(topic_validators_1.topic_validators.create_topic), topic_controllers_1.topic_controllers.create_topic);
router.get("/", (0, auth_1.default)(["student", "admin", "super_admin"]), topic_controllers_1.topic_controllers.get_all_topics);
exports.topic_routes = router;
