import { eq } from "drizzle-orm";
import { EventHandlerRequest, H3Event } from "h3";
import { useValidatedBody, z } from "h3-zod";
import { tables, useDB } from "~~/server/utils/database";
import { getUserDataById } from "../../user/index.get";
import { getPaymentDataById } from "../[id].get";

export default eventHandler(async (event) => {
  return await patchUserData(event);
});

export async function patchUserData(event: H3Event<EventHandlerRequest>) {
  // const callbackToken = event.headers.get("X-CALLBACK-TOKEN");
  // if (callbackToken != process.env.XENDIT_WEBHOOK_TOKEN) {
  //   throw createError({
  //     statusCode: 401,
  //   });
  // }

  const { status_code, sid, reference_id } = await useValidatedBody(event, {
    status_code: z.number(),
    sid: z.uuid(),
    reference_id: z.string(),
  });

  if (status_code == 1) {
    if ((await getPaymentDataById(sid)).length > 0) {
      throw createError({
        statusCode: 500,
        statusMessage: "ID exists",
      });
    }

    const [_, createdAt, userId, amount] = (reference_id as string).split("_");
    const userData = await getUserDataById(userId);

    const update = await useDB()
      .update(tables.usersTable)
      .set({
        credit: (userData[0].credit > 0 ? userData[0].credit : 0) + parseInt(amount),
      })
      .where(eq(tables.usersTable.id, userId))
      .returning()
      .get();

    await useDB()
      .insert(tables.paymentsTable)
      .values({
        id: sid,
        invoiceId: reference_id,
        amount: parseInt(amount),
        createdAt: new Date(createdAt),
        buyerId: userId,
      });

    return update;
  }
}
