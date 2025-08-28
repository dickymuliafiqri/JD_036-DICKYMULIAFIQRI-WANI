import { eq } from "drizzle-orm";
import { EventHandlerRequest, H3Event } from "h3";
import { tables, useDB } from "~~/server/utils/database";

export default eventHandler(async (event) => {
  return await patchUserData(event);
});

// Example, need more research
export async function patchUserData(event: H3Event<EventHandlerRequest>) {
  // Todo
  // Validate request headers

  const update = await useDB()
    .update(tables.usersTable)
    .set({
      credit: 10000,
    })
    .where(eq(tables.usersTable.id, "112348079159911184255"))
    .returning()
    .get();

  return update;
}
