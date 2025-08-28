import { tables, useDB } from "~~/server/utils/database";
import { eq } from "drizzle-orm";
import { EventHandlerRequest, H3Event } from "h3";

export default eventHandler(async (event) => {
  return await getUserData(event);
});

export async function getUserData(event: H3Event<EventHandlerRequest>) {
  const { user } = await requireUserSession(event);

  const data = await useDB().select().from(tables.usersTable).where(eq(tables.usersTable.id, user.sub));

  return data;
}

export async function getUserDataById(id: string) {
  const data = await useDB().select().from(tables.usersTable).where(eq(tables.usersTable.id, id));

  return data;
}
