import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import config from "./config";

const sql = neon(config.database_url);
const db = drizzle({ client: sql });
