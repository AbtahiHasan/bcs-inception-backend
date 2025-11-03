"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth_routes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const auth_controllers_1 = require("./auth.controllers");
const router = (0, express_1.Router)();
router.get("/me", (0, auth_1.default)(["student", "admin", "super_admin"]), auth_controllers_1.auth_controllers.get_me);
exports.auth_routes = router;
