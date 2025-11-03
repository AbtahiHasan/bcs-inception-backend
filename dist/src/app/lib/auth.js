"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const better_auth_1 = require("better-auth");
const drizzle_1 = require("better-auth/adapters/drizzle");
const plugins_1 = require("better-auth/plugins");
const schema = __importStar(require("../../../drizzle/schema"));
const db_1 = require("../../db");
exports.auth = (0, better_auth_1.betterAuth)({
    database: (0, drizzle_1.drizzleAdapter)(db_1.db, {
        provider: "pg",
        schema: {
            users: schema.users,
            sessions: schema.sessions,
            accounts: schema.accounts,
            verification_tokens: schema.verification_tokens,
        },
        camelCase: false,
        usePlural: true,
    }),
    emailAndPassword: {
        enabled: true,
    },
    user: {
        fields: {
            name: "name",
            email: "email",
            emailVerified: "email_verified",
            image: "image",
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
        additionalFields: {
            phone_number: {
                type: "string",
                required: true,
                input: true, // Allows the user to set this field
            },
            role: {
                type: "string",
                required: false,
                input: false, // Allows the user to set this field
            },
        },
    },
    session: {
        fields: {
            id: "id",
            userId: "user_id",
            token: "token",
            expiresAt: "expires_at",
            ipAddress: "ip_address",
            userAgent: "user_agent",
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    },
    account: {
        fields: {
            id: "id",
            userId: "user_id",
            accountId: "account_id",
            providerId: "provider_id",
            accessToken: "access_token",
            refreshToken: "refresh_token",
            idToken: "id_token",
            accessTokenExpiresAt: "access_token_expires_at",
            refreshTokenExpiresAt: "refresh_token_expires_at",
            scope: "scope",
            password: "password",
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    },
    verification: {
        modelName: "verification_token",
        fields: {
            id: "id",
            identifier: "identifier",
            value: "value",
            expiresAt: "expires_at",
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    },
    plugins: [
        (0, plugins_1.customSession)((_a) => __awaiter(void 0, [_a], void 0, function* ({ user, session }) {
            return Object.assign(Object.assign({}, session), { user: Object.assign(Object.assign({}, user), { phone_number: user.phone_number, role: user.role }) });
        })),
    ],
});
