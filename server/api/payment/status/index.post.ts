import { eq } from "drizzle-orm";
import { EventHandlerRequest, H3Event } from "h3";
import { useValidatedBody, z } from "h3-zod";
import { tables, useDB } from "~~/server/utils/database";
import { getUserDataById } from "../../user/index.get";

export default eventHandler(async (event) => {
  return await patchUserData(event);
});

// Example, need more research
export async function patchUserData(event: H3Event<EventHandlerRequest>) {
  // Todo
  // Validate request headers

  const { id, external_id, amount, status } = await useValidatedBody(event, {
    id: z.string(),
    external_id: z.string(),
    amount: z.number().min(10000),
    status: z.string(),
  });

  if (status === "PAID") {
    const userId = (external_id as string).split("_")[2];
    const userData = await getUserDataById(userId);

    const update = await useDB()
      .update(tables.usersTable)
      .set({
        credit: (userData[0].credit || 0) + amount,
      })
      .where(eq(tables.usersTable.id, userId))
      .returning()
      .get();

    return update;
  }
}
