"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.note_routes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validate_request_1 = require("../../middlewares/validate-request");
const note_validators_1 = require("./note.validators");
const note_controllers_1 = require("./note.controllers");
const router = (0, express_1.Router)();
router.post("/create", (0, auth_1.default)(["admin", "super_admin"]), (0, validate_request_1.validate_request)(note_validators_1.note_validators.create_note), note_controllers_1.note_controllers.create_note);
router.get("/", (0, auth_1.default)(["admin", "super_admin", "student"]), note_controllers_1.note_controllers.get_notes);
router.delete("/:id", (0, auth_1.default)(["admin", "super_admin"]), note_controllers_1.note_controllers.delete_note);
exports.note_routes = router;
