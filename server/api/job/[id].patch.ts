import { EventHandlerRequest, H3Event } from "h3";
import { useValidatedBody, z, useValidatedParams } from "h3-zod";
import { tables, useDB } from "~~/server/utils/database";
import { and, eq } from "drizzle-orm";
import { isForbidden } from "./utils";

export default eventHandler(async (event) => {
  return await patchJobData(event);
});

export async function patchJobData(event: H3Event<EventHandlerRequest>) {
  const { id } = await useValidatedParams(event, {
    id: z.uuidv4(),
  });
  const { title, desc, category, offers } = await useValidatedBody(event, {
    title: z.string().min(8),
    desc: z.string().min(16),
    category: z.string(),
    offers: z.number().min(10000),
  });

  if (await isForbidden(title, desc)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Pekerjaan mengandung unsur yang tidak diizinkan!",
    });
  }

  const { user } = await requireUserSession(event);

  const update = await useDB()
    .update(tables.jobsTable)
    .set({
      title: title,
      desc: desc,
      category: category,
      offers: offers,
    })
    .where(and(eq(tables.jobsTable.id, id), eq(tables.jobsTable.owner, user.sub)))
    .returning()
    .get();

  return update;
}
