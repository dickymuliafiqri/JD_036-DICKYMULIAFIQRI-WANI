import { eq } from "drizzle-orm";
import { EventHandlerRequest, H3Event } from "h3";
import { useValidatedBody, z } from "h3-zod";
import { tables, useDB } from "~~/server/utils/database";
import { getUserDataById } from "../../user/index.get";
import { getPaymentData, getPaymentDataById } from "../[id].get";

export default eventHandler(async (event) => {
  return await patchUserData(event);
});

export async function patchUserData(event: H3Event<EventHandlerRequest>) {
  const callbackToken = event.headers.get("X-CALLBACK-TOKEN");
  if (callbackToken != process.env.XENDIT_WEBHOOK_TOKEN) {
    throw createError({
      statusCode: 401,
    });
  }

  // TODO
  // Validate invoice ID
  const { id, external_id, amount, status, created } = await useValidatedBody(event, {
    id: z.string(),
    external_id: z.string(),
    amount: z.number().min(10000),
    status: z.string(),
    created: z.string(),
  });

  if (status === "PAID") {
    if ((await getPaymentDataById(id)).length > 0) {
      throw createError({
        statusCode: 500,
        statusMessage: "ID exists",
      });
    }

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

    await useDB()
      .insert(tables.paymentsTable)
      .values({
        id: id,
        invoiceId: external_id,
        amount: amount,
        createdAt: new Date(created),
        buyerId: userId,
      });

    return update;
  }
}
