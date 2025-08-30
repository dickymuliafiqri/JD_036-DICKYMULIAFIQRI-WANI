import { tables, useDB } from "~~/server/utils/database";
import { EventHandlerRequest, H3Event } from "h3";
import { eq } from "drizzle-orm";

export default eventHandler(async (event) => {
  return await getJobData(event);
});

export async function getJobData(event: H3Event<EventHandlerRequest>) {
  const data = await useDB()
    .select()
    .from(tables.jobsTable)
    .innerJoin(tables.usersTable, eq(tables.jobsTable.owner, tables.usersTable.id));

  return data;
}

export async function getJobsDataByOwnerId(ownerId: string) {
  const data = await useDB().select().from(tables.jobsTable).where(eq(tables.jobsTable.owner, ownerId));

  return data;
}
