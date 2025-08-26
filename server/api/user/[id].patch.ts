import { eq } from "drizzle-orm";
import { EventHandlerRequest, H3Event } from "h3";
import { useValidatedBody, z } from "h3-zod";
import { tables, useDB } from "~~/server/utils/database";

export default eventHandler(async (event) => {
  return await patchUserData(event);
});

export async function patchUserData(event: H3Event<EventHandlerRequest>) {
  const { phone } = await useValidatedBody(event, {
    phone: z.number().min(10),
  });
  const { user } = await requireUserSession(event);

  const update = await useDB()
    .update(tables.usersTable)
    .set({
      phone: phone,
    })
    .where(eq(tables.usersTable.id, user.sub))
    .returning()
    .get();

  return update;
}
