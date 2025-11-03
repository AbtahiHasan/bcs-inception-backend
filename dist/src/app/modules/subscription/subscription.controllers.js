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
exports.subscription_controllers = void 0;
const catch_async_1 = __importDefault(require("../../utils/catch-async"));
const send_response_1 = require("../../utils/send-response");
const subscription_services_1 = require("./subscription.services");
const http_status_1 = __importDefault(require("http-status"));
const create_subscription = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield subscription_services_1.subscription_services.create_subscription({
        user_id: req.user.id,
        phone_number: req.body.phone_number,
        transaction_id: req.body.transaction_id,
    });
    (0, send_response_1.send_response)(res, {
        success: true,
        status_code: http_status_1.default.OK,
        message: "subscription request sent successfully",
        data: result,
    });
}));
const get_my_subscriptions_history = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield subscription_services_1.subscription_services.get_my_subscriptions_history(req.user.id, req.query);
    (0, send_response_1.send_response)(res, {
        success: true,
        status_code: http_status_1.default.OK,
        message: "my subscription history successfully",
        data: result.data,
        meta: result.meta,
    });
}));
const get_subscriptions = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield subscription_services_1.subscription_services.get_subscriptions(req.query);
    (0, send_response_1.send_response)(res, {
        success: true,
        status_code: http_status_1.default.OK,
        message: "subscription fetched successfully",
        data: result.data,
        meta: result.meta,
    });
}));
const update_status = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield subscription_services_1.subscription_services.update_status(req.params.id, req.body.status);
    (0, send_response_1.send_response)(res, {
        success: true,
        status_code: http_status_1.default.OK,
        message: "subscription status updated successfully",
        data: result,
    });
}));
exports.subscription_controllers = {
    create_subscription,
    get_my_subscriptions_history,
    get_subscriptions,
    update_status,
};
