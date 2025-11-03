"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contact_routes = void 0;
const express_1 = require("express");
const validate_request_1 = require("../../middlewares/validate-request");
const contact_validators_1 = require("./contact.validators");
const contact_controllers_1 = require("./contact.controllers");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = (0, express_1.Router)();
router.post("/create", (0, validate_request_1.validate_request)(contact_validators_1.contact_validators.create_contact), contact_controllers_1.contact_controllers.create_contact);
router.get("/", (0, auth_1.default)(["admin", "super_admin"]), contact_controllers_1.contact_controllers.get_contacts);
exports.contact_routes = router;
