import type { Config } from "drizzle-kit";
export default {
  schema: process.env.DB_SCHEMA_PATH,
  out: process.env.DB_OUT_PATH,

  breakpoints: true,
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_URL,
    ssl: false,
  },
  verbose: true,
  strict: false,
} satisfies Config;
