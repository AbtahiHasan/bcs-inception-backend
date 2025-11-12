import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { customSession } from "better-auth/plugins";
import * as schema from "../../../drizzle/schema";
import { Resend } from "resend";
import { db } from "../../db";
import config from "../../config";

const resend = new Resend(config.resend_api_key as string);

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
    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: "support@yourcompany.com",
        to: user.email,
        subject: "Reset Your Password - Action Required",
        html: `
  <!DOCTYPE html>
  <html lang="en" dir="ltr">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Reset Your Password</title>
      <style>
        body {
          background-color: #f3f4f6;
          font-family: Arial, Helvetica, sans-serif;
          padding: 40px;
          margin: 0;
        }
        .container {
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
          max-width: 600px;
          margin: 0 auto;
          padding: 40px;
        }
        .text-center { text-align: center; }
        .mb-32 { margin-bottom: 32px; }
        .heading {
          font-size: 28px;
          font-weight: bold;
          color: #111827;
          margin: 0 0 8px 0;
        }
        .subtext {
          font-size: 16px;
          color: #4b5563;
          margin: 0;
        }
        .text {
          font-size: 16px;
          color: #374151;
          line-height: 24px;
          margin: 0 0 16px 0;
        }
        .btn {
          background-color: #2563eb;
          color: #ffffff;
          padding: 16px 32px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          text-decoration: none;
          display: inline-block;
        }
        .link {
          color: #2563eb;
          font-size: 14px;
          word-break: break-all;
          text-decoration: none;
        }
        .security-box {
          background-color: #f9fafb;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 32px;
        }
        .security-title {
          font-size: 14px;
          color: #374151;
          font-weight: 600;
          margin: 0 0 8px 0;
        }
        .security-text {
          font-size: 14px;
          color: #4b5563;
          line-height: 20px;
          margin: 0 0 8px 0;
        }
        .footer {
          border-top: 1px solid #e5e7eb;
          padding-top: 24px;
        }
        .footer-text {
          font-size: 12px;
          color: #6b7280;
          line-height: 16px;
          margin: 0 0 8px 0;
        }
        .footer-link {
          color: #6b7280;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="text-center mb-32">
          <h1 class="heading">Reset Your Password</h1>
          <p class="subtext">We received a request to reset your password</p>
        </div>

        <div class="mb-32">
          <p class="text">Hello, <strong>${user.name}</strong></p>
          <p class="text">
            We received a password reset request for your account associated with
            <strong>${user.email}</strong>.
          </p>
          <p class="text">
            Click the button below to create a new password. This link will expire
            in 24 hours for security reasons.
          </p>
        </div>

        <div class="text-center mb-32">
          <a href="${url}" class="btn">Reset Password</a>
        </div>

        <div class="mb-32">
          <p class="security-text">
            If the button doesn’t work, copy and paste this link into your browser:
          </p>
          <a href="${url}" class="link">${url}</a>
        </div>

        <div class="security-box">
          <p class="security-title">Security Notice:</p>
          <p class="security-text">
            • If you didn’t request this password reset, please ignore this email.
          </p>
          <p class="security-text">• This link will expire in 24 hours.</p>
          <p class="security-text">
            • For security, never share this link with anyone.
          </p>
        </div>

        <div class="mb-32">
          <p class="security-text">
            Need help? Contact our support team at
            <a href="mailto:support@company.com" class="link">
              support@company.com
            </a>.
          </p>
        </div>

        
      </div>
    </body>
  </html>
  `,
      });
    },
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
