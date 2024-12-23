import { type Config } from "drizzle-kit";
import { env } from "./env.mjs";

export default {
  schema: "./src/server/db/schema.ts",
  out: "./src/server/db/drizzle",
  driver: "pg",
  verbose: true,
  strict: true,
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
} satisfies Config;