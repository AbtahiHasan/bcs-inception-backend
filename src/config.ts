import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  env: process.env.NODE_ENV!,
  port: process.env.PORT!,
  api_version: process.env.API_VERSION!,
  origin: process.env.ORIGIN!,
  database_url: process.env.DATABASE_URL!,
  bcrypt_salt_rounds: Number(process.env.BCRYPT_SALT_ROUNDS!),
  domain: process.env.DOMAIN!,
  backend_url: process.env.BACKEND_URL!,
  better_auth_url: process.env.BETTER_AUTH_URL!,
  smtp_host: process.env.SMTP_HOST!,
  smtp_port: process.env.SMTP_PORT!,
  smtp_mail: process.env.SMTP_USER!,
  smtp_secure: true,
  smtp_password: process.env.SMTP_PASSWORD!,
  smtp_service: process.env.SMTP_SERVICE!,
  // mail_to: process.env.MAIL_TO,
};
