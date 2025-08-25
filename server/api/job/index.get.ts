import { tables, useDB } from "~~/server/utils/database";
import { EventHandlerRequest, H3Event } from "h3";

export default eventHandler(async (event) => {
  return await getJobData(event);
});

export async function getJobData(event: H3Event<EventHandlerRequest>) {
  const data = await useDB().select().from(tables.jobsTable);

  return data;
}
