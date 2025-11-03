import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { customSession } from "better-auth/plugins";
import * as schema from "../../../drizzle/schema";

import { db } from "../../db";
export const auth = betterAuth({
  database: drizzleAdapter(db, {
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
      subscription_status: {
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
    customSession(async ({ user, session }) => {
      return {
        ...session,
        user: {
          ...user,
          phone_number: user.phone_number,
          role: user.role,
        },
      };
    }),
  ],
});
