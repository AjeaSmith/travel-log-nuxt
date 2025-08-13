// drizzle config for defining DB connection and schema location
import { defineConfig } from "drizzle-kit";

import env from "./lib/env";

export default defineConfig({
  schema: "./lib/db/schema/index.ts",
  out: "./lib/db/migrations",
  dialect: "turso",
  dbCredentials: {
    url: env.TURSO_CONNECTION_URL!,
    authToken: env.NODE_ENV === "development" ? undefined : env.TURSO_AUTH_TOKEN!,
  },
  casing: "snake_case",
});
