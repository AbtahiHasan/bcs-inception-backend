"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const node_1 = require("better-auth/node");
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config"));
const not_found_1 = require("./app/middlewares/not-found");
const global_error_handler_1 = require("./app/middlewares/global-error-handler");
const routes_1 = __importDefault(require("./app/routes"));
const auth_1 = require("./app/lib/auth");
exports.app = (0, express_1.default)();
// cors
const origins = JSON.parse(JSON.stringify(config_1.default.origin)).split(",");
exports.app.use((0, cors_1.default)({
    origin: origins,
    methods: ["GET", "PATCH", "POST", "PUT", "DELETE"],
    credentials: true,
}));
exports.app.all("/api/auth/*splat", (0, node_1.toNodeHandler)(auth_1.auth));
//parsers
if (config_1.default.env === "development")
    exports.app.use((0, morgan_1.default)("dev"));
exports.app.use(express_1.default.json());
exports.app.use((0, cookie_parser_1.default)());
exports.app.use(body_parser_1.default.urlencoded({ extended: false }));
// parse application/json
exports.app.use(body_parser_1.default.json());
// application routes
exports.app.get("/health", (req, res) => {
    res.json({
        status: "health is good",
    });
});
exports.app.use(`/api/${config_1.default.api_version}`, routes_1.default);
exports.app.use(global_error_handler_1.global_error_handler);
//Not Found
exports.app.use(not_found_1.not_found);
