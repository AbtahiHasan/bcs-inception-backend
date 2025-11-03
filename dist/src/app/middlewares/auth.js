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
const catch_async_1 = __importDefault(require("../utils/catch-async"));
const auth = (roles) => {
    return (0, catch_async_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // const session = await better_auth.api.getSession({
        //   headers: fromNodeHeaders(req.headers),
        // });
        // if (!session?.user) {
        //   throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
        // }
        // if (!roles.includes(session?.user?.role)) {
        //   throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
        // }
        // req.user = session?.user;
        next();
    }));
};
exports.default = auth;
