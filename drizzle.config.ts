import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import config from "./src/config";

export default defineConfig({
  out: "./drizzle/migrations",
  schema: "./drizzle/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: config.database_url,
  },
  strict: true,
  verbose: true,
});
