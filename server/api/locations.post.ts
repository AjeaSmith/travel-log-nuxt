import type { DrizzleError } from "drizzle-orm";

import db from "~~/lib/db";
import { InsertLocation, location } from "~~/lib/db/schema/location";
import { and, eq } from "drizzle-orm";
import { customAlphabet } from "nanoid";
import slugify from "slug";

const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 5);
export default defineEventHandler(async (event) => {
  // ensure user is logged in before creating location
  if (!event.context.user) {
    return sendError(event, createError({ statusCode: 401, statusMessage: "Unauthorized" }));
  }

  // validate the incoming data
  const result = await readValidatedBody(event, InsertLocation.safeParse);

  // not good data?, return error
  if (!result.success) {
    const statusMessage = result.error.issues.map(issue => `${issue.path.join("")}: ${issue.message}`).join("; ");

    const data = result.error.issues.reduce((errors, issue) => {
      errors[issue.path.join("")] = issue.message;
      return errors;
    }, {} as Record<string, string>);

    return sendError(event, createError({ statusCode: 422, statusMessage, data }));
  }

  const duplicateLocationName = await db.query.location.findFirst({
    where: and(eq(location.name, result.data.name), eq(location.userId, event.context.user.id)),
  });

  if (duplicateLocationName) {
    return sendError(event, createError({ statusCode: 409, statusMessage: "A location with that name already exist." }));
  }

  let slug = slugify(result.data.name);
  // instead of returning data or null, !! turns the result to true or false
  let existingSlug = !!(await db.query.location.findFirst({
    where: eq(location.slug, slug),
  }));

  while (existingSlug) {
    // generate randon id and attach to slug
    const id = nanoid();
    const idSlug = `${slug}-${id}`;

    existingSlug = !!(await db.query.location.findFirst({
      where: eq(location.slug, idSlug),
    }));

    if (!existingSlug) {
      slug = idSlug;
    }
  }

  try {
    // good data? insert data(location) into db
    const [created] = await db.insert(location).values({
      ...result.data,
      userId: event.context.user.id,
      slug,
    }).returning();

    return created;
  }
  catch (e) {
    const error = e as DrizzleError;
    if (error.message === "SQLITE_CONSTRAINT: SQLite error: UNIQUE constraint failed: location.slug") {
      throw createError({
        statusCode: 409,
        statusMessage: "Slug must be unique (the location name is used to generate the slug).",
      });
    }
    throw error;
  }
});
