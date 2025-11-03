"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.send_response = void 0;
const send_response = (res, data) => {
    res.status(data === null || data === void 0 ? void 0 : data.status_code).json(Object.assign(Object.assign({ success: data.success, message: data.message }, ((data === null || data === void 0 ? void 0 : data.meta) && { meta: data.meta })), { data: data.data }));
};
exports.send_response = send_response;
