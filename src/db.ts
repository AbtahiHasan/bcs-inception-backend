import { drizzle } from "drizzle-orm/neon-serverless";
import config from "./config";

export const db = drizzle(config.database_url);
