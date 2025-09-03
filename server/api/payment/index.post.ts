import { EventHandlerRequest, H3Event } from "h3";
import { useValidatedBody, z } from "h3-zod";
import { createPayment } from "~~/server/utils/ipaymu";

export default eventHandler(async (event) => {
  return await postInvoiceData(event);
});

export async function postInvoiceData(event: H3Event<EventHandlerRequest>) {
  const { amount } = await useValidatedBody(event, {
    amount: z.number().min(10000),
  });
  const { user } = await requireUserSession(event);

  const externalId = `invoice_${new Date().getTime()}_${user.sub}_${amount}`;
  const invoiceRes = await createPayment(externalId, amount);

  return invoiceRes;
}
