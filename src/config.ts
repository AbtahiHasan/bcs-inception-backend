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
  jwt: {
    access_secret: process.env.JWT_ACCESS_SECRET!,
    refresh_secret: process.env.JWT_REFRESH_SECRET!,
    access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN!,
    refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN!,
  },

  //   reset_pass_ui_link: process.env.RESET_PASS_UI_LINK,
  //   smtp_host: process.env.SMTP_HOST,
  //   smtp_port: process.env.SMTP_PORT,
  //   smtp_mail: process.env.SMTP_MAIL,
  //   smtp_password: process.env.SMTP_PASSWORD,
  //   smtp_service: process.env.SMTP_SERVICE,
  //   mail_to: process.env.MAIL_TO,
};
