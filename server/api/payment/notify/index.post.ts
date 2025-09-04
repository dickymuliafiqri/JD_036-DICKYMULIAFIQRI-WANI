import { eq } from "drizzle-orm";
import { EventHandlerRequest, H3Event } from "h3";
import { useValidatedBody, z } from "h3-zod";
import { tables, useDB } from "~~/server/utils/database";
import { getUserDataById } from "../../user/index.get";
import { getPaymentDataById } from "../[id].get";
import { hmacSHA256 } from "~~/server/utils/cipher";
import { IPAYMU_API_KEY } from "~~/server/utils/constant";
import dayjs from "dayjs";

export default eventHandler(async (event) => {
  return await patchUserData(event);
});

export async function patchUserData(event: H3Event<EventHandlerRequest>) {
  const { status_code, sid, reference_id } = await useValidatedBody(event, {
    status_code: z.int(),
    sid: z.uuid(),
    reference_id: z.string(),
  });

  const [invoiceId, hmacId] = (reference_id as string).split(":");
  const signature = await hmacSHA256(IPAYMU_API_KEY, invoiceId);

  if (signature != hmacId) {
    throw createError({
      statusCode: 401,
    });
  }

  if (status_code == 1) {
    if ((await getPaymentDataById(sid)).length > 0) {
      throw createError({
        statusCode: 500,
        statusMessage: "ID exists",
      });
    }

    const [_, createdAt, userId, amount] = invoiceId.split("_");
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
        invoiceId: invoiceId,
        amount: parseInt(amount),
        createdAt: new Date(dayjs(parseInt(createdAt)).format()),
        buyerId: userId,
      });

    return update;
  }
}
