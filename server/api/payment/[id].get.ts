import { tables, useDB } from "~~/server/utils/database";
import { eq } from "drizzle-orm";
import { EventHandlerRequest, H3Event } from "h3";
import { useValidatedParams, z } from "h3-zod";

export default eventHandler(async (event) => {
  return await getPaymentData(event);
});

export async function getPaymentData(event: H3Event<EventHandlerRequest>) {
  const { id } = await useValidatedParams(event, {
    id: z.string(),
  });

  return await getPaymentDataById(id);
}

export async function getPaymentDataById(id: string) {
  const data = await useDB().select().from(tables.paymentsTable).where(eq(tables.paymentsTable.id, id));

  return data;
}
