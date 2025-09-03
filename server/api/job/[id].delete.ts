import { tables, useDB } from "~~/server/utils/database";
import { EventHandlerRequest, H3Event } from "h3";
import { and, eq, inArray } from "drizzle-orm";
import { useValidatedParams, z } from "h3-zod";

export default eventHandler(async (event) => {
  return await deleteJobData(event);
});

export async function deleteJobData(event: H3Event<EventHandlerRequest>) {
  const { user } = await requireUserSession(event);
  const { id } = await useValidatedParams(event, {
    id: z.uuidv4(),
  });

  return await deleteJobById(id, user.sub);
}

export async function deleteJobById(id: string, userId: string) {
  const data = await useDB()
    .delete(tables.jobsTable)
    .where(and(eq(tables.jobsTable.id, id), eq(tables.jobsTable.owner, userId)))
    .returning()
    .get();

  return data;
}

export async function deleteJobByIds(ids: string[]) {
  const data = await useDB().delete(tables.jobsTable).where(inArray(tables.jobsTable.id, ids)).returning().get();

  return data;
}
