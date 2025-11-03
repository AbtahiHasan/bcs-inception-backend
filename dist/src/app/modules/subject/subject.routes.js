"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subject_routes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validate_request_1 = require("../../middlewares/validate-request");
const subject_controllers_1 = require("./subject.controllers");
const subject_validators_1 = require("./subject.validators");
const router = (0, express_1.Router)();
router.post("/create", (0, auth_1.default)(["admin", "super_admin"]), (0, validate_request_1.validate_request)(subject_validators_1.subject_validators.create_subject), subject_controllers_1.subject_controllers.create_subject);
router.get("/", (0, auth_1.default)(["student", "admin", "super_admin"]), subject_controllers_1.subject_controllers.get_all_subjects);
exports.subject_routes = router;
