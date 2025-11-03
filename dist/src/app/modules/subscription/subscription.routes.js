"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscription_routes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validate_request_1 = require("../../middlewares/validate-request");
const subscription_controllers_1 = require("./subscription.controllers");
const subscription_validators_1 = require("./subscription.validators");
const router = (0, express_1.Router)();
router.post("/create", (0, auth_1.default)(["student"]), (0, validate_request_1.validate_request)(subscription_validators_1.subscription_validators.create_subscription), subscription_controllers_1.subscription_controllers.create_subscription);
router.get("/my", (0, auth_1.default)(["student", "admin", "super_admin"]), subscription_controllers_1.subscription_controllers.get_my_subscriptions_history);
router.get("/", (0, auth_1.default)(["admin", "super_admin"]), subscription_controllers_1.subscription_controllers.get_subscriptions);
router.put("/status/:id", (0, auth_1.default)(["admin", "super_admin"]), subscription_controllers_1.subscription_controllers.update_status);
exports.subscription_routes = router;
