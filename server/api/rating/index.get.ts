import { tables, useDB } from "~~/server/utils/database";
import { EventHandlerRequest, H3Event } from "h3";
import { eq } from "drizzle-orm";

export default eventHandler(async (event) => {
  return await getRatingData(event);
});

export async function getRatingData(event: H3Event<EventHandlerRequest>) {
  const data = await useDB()
    .select()
    .from(tables.ratingsTable)
    .innerJoin(tables.usersTable, eq(tables.ratingsTable.raterId, tables.usersTable.id));

  return data;
}

export async function getSelfRatingData(event: H3Event<EventHandlerRequest>) {
  const { user } = await requireUserSession(event);

  const data = await useDB().select().from(tables.ratingsTable).where(eq(tables.ratingsTable.raterId, user.sub));

  return data;
}
