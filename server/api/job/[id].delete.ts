import { tables, useDB } from "~~/server/utils/database";
import { EventHandlerRequest, H3Event } from "h3";
import { eq } from "drizzle-orm";
import { useValidatedParams, zh } from "h3-zod";

export default eventHandler(async (event) => {
  return await deleteJobData(event);
});

export async function deleteJobData(event: H3Event<EventHandlerRequest>) {
  const { id } = await useValidatedParams(event, {
    id: zh.intAsString,
  });

  const data = await useDB().delete(tables.jobsTable).where(eq(tables.jobsTable.id, id)).returning().get();

  return data;
}
