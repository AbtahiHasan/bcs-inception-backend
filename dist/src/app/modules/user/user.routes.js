"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_routes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_controllers_1 = require("./user.controllers");
const validate_request_1 = require("../../middlewares/validate-request");
const user_validators_1 = require("./user.validators");
const router = (0, express_1.Router)();
router.get("/", (0, auth_1.default)(["admin", "super_admin"]), user_controllers_1.user_controllers.get_users);
router.put("/update-role", (0, auth_1.default)(["super_admin"]), (0, validate_request_1.validate_request)(user_validators_1.user_validators.update_user_role), user_controllers_1.user_controllers.update_user_role);
exports.user_routes = router;
