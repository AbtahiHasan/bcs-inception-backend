"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analytics_routes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const analytics_controllers_1 = require("./analytics.controllers");
const router = (0, express_1.Router)();
router.get("/", (0, auth_1.default)(["admin", "super_admin"]), analytics_controllers_1.analytics_controllers.get_analytics);
exports.analytics_routes = router;
