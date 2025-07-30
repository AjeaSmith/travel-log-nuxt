// Hooks up better-auth with db (with drizzle)
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import db from "./db/index";
import env from "./env";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
  }),
  socialProviders: { github: {
    clientId: env.CLIENT_ID as string,
    clientSecret: env.CLIENT_SECRET as string,
  } },
  advanced: {
    database: {
      generateId: false,
    },
  },
});
