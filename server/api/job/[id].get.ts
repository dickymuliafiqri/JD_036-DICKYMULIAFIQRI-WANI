import { tables, useDB } from "~~/server/utils/database";
import { EventHandlerRequest, H3Event } from "h3";
import { eq, and } from "drizzle-orm";
import { useValidatedParams, z } from "h3-zod";

export default eventHandler(async (event) => {
  return await applyJobData(event);
});

export async function applyJobData(event: H3Event<EventHandlerRequest>) {
  const { user } = await requireUserSession(event);
  const { id } = await useValidatedParams(event, {
    id: z.uuid(),
  });

  const data = await useDB()
    .delete(tables.jobsTable)
    .where(and(eq(tables.jobsTable.id, id), eq(tables.jobsTable.owner, user.sub)))
    .returning()
    .get();

  return data;
}
